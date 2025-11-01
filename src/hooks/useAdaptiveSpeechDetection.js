// hooks/useAdaptiveSpeechDetection.js
import { useEffect, useRef } from 'react'
import { useAudioContext } from '../context/AudioContext'

/**
 * Robust adaptive speech detection hook.
 *
 * Exposed options are similar to your previous hook. It will call
 * onSpeechStart() and onSpeechEnd() when it detects voice activity.
 */
export function useAdaptiveSpeechDetection({
  enabled,
  isMicrophoneMuted,
  deviceId = null,
  echoCancellation = true,
  noiseSuppression = true,
  autoGainControl = false,
  // initial multiplier applied to noiseFloor to form start threshold
  initialFactor = 1,
  // smoothing for noiseFloor EMA (0..1). Closer to 1 => slower change.
  noiseSmoothing = 0.96,
  // minimum time energy must remain above startThreshold to consider "start"
  minActiveMs = 120,
  // time in ms to keep considered "speaking" after energy drops (hangover)
  endHoldMs = 500,
  // how often to adapt factor heuristically (in checks)
  adaptRate = 0.02,
  // bounds for adaptive factor
  minFactor = 1.05,
  maxFactor = 4.0,
  // variance threshold in RMS to detect modulation (speech)
  modulationVarianceThreshold = 0.00002,
  // callbacks
  onSpeechStart,
  onSpeechEnd
}) {
  const audioCtx = useAudioContext()

  // refs for nodes / state
  const mediaStreamRef = useRef(null)
  const sourceRef      = useRef(null)
  const analyserRef    = useRef(null)
  const timeDataRef    = useRef(null)
  const freqDataRef    = useRef(null)

  // energy / threshold state
  const noiseFloorRef  = useRef(0)        // EMA estimate of ambient RMS
  const factorRef      = useRef(initialFactor)
  const speakingRef    = useRef(false)
  const lastAboveAtRef = useRef(0)        // last timestamp energy was above threshold
  const rafRef         = useRef(null)
  const cancelledRef   = useRef(false)

  // modulation and history
  const rmsHistoryRef  = useRef([])
  const lastStartCandidateRef = useRef(0)

  // adapt counters
  const falsePositivesRef = useRef(0)
  const falseNegativesRef = useRef(0)
  const checksSinceAdaptRef = useRef(0)

  // stash callbacks
  const onStartRef = useRef(onSpeechStart)
  const onEndRef   = useRef(onSpeechEnd)
  useEffect(() => { onStartRef.current = onSpeechStart }, [onSpeechStart])
  useEffect(() => { onEndRef.current   = onSpeechEnd   }, [onSpeechEnd])

  useEffect(() => {
    if (!enabled || isMicrophoneMuted) return

    cancelledRef.current = false
    falsePositivesRef.current = 0
    falseNegativesRef.current = 0
    checksSinceAdaptRef.current = 0
    factorRef.current = initialFactor
    noiseFloorRef.current = 0
    speakingRef.current = false
    lastAboveAtRef.current = 0
    rmsHistoryRef.current = []

    // calibration settings
    const CALIBRATION_TIME_MS = 950
    const startTime = performance.now()

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            echoCancellation,
            noiseSuppression,
            autoGainControl
          }
        })

        if (cancelledRef.current) {
          stream.getTracks().forEach(t => t.stop())
          return
        }

        mediaStreamRef.current = stream

        // resume audio context if suspended (user gesture may be required)
        if (audioCtx && audioCtx.state === 'suspended') {
          try { await audioCtx.resume() } catch (e) { /* ignore */ }
        }

        sourceRef.current = audioCtx.createMediaStreamSource(stream)
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 2048 // gives a good balance of time & freq resolution
        sourceRef.current.connect(analyser)
        analyserRef.current = analyser

        timeDataRef.current = new Uint8Array(analyser.fftSize)
        freqDataRef.current = new Uint8Array(analyser.frequencyBinCount)

        // helper: compute RMS (normalized 0..1) from time-domain data
        const sampleRMS = () => {
          analyserRef.current.getByteTimeDomainData(timeDataRef.current)
          let sumSq = 0
          for (let i = 0; i < timeDataRef.current.length; i++) {
            const v = (timeDataRef.current[i] - 128) / 128 // -1..1
            sumSq += v * v
          }
          return Math.sqrt(sumSq / timeDataRef.current.length)
        }

        // helper: compute average energy in voice band (300..3000Hz)
        const sampleVoiceBand = () => {
          analyserRef.current.getByteFrequencyData(freqDataRef.current)
          // bin frequency resolution = sampleRate / fftSize
          const binFreq = audioCtx.sampleRate / analyserRef.current.fftSize
          const voiceLow = 300
          const voiceHigh = 3000
          const startBin = Math.max(0, Math.floor(voiceLow / binFreq))
          const endBin = Math.min(freqDataRef.current.length - 1, Math.floor(voiceHigh / binFreq))
          if (endBin <= startBin) return 0
          let sum = 0
          for (let i = startBin; i <= endBin; i++) sum += freqDataRef.current[i]
          return sum / (endBin - startBin + 1) / 255 // normalize 0..1
        }

        const nowMs = () => performance.now()

        const tick = () => {
          if (cancelledRef.current) return

          const now = nowMs()
          const rms = sampleRMS()
          const voiceBand = sampleVoiceBand() // 0..1

          // Combined energy (weights can be tuned)
          const combined = 0.72 * rms + 0.28 * voiceBand

          // initialize or smooth noise floor (EMA)
          if (noiseFloorRef.current === 0) {
            noiseFloorRef.current = combined
          } else {
            // ignore extremely large spikes during calibration to protect floor estimate
            const spikeThreshold = Math.max(0.02, noiseFloorRef.current * 3)
            const sampleForFloor = (now - startTime < CALIBRATION_TIME_MS && combined > spikeThreshold)
              ? noiseFloorRef.current // ignore this sample for calibration
              : combined

            noiseFloorRef.current =
              noiseSmoothing * noiseFloorRef.current + (1 - noiseSmoothing) * sampleForFloor
          }

          // during calibration, don't emit events; just warm noise floor
          if (now - startTime < CALIBRATION_TIME_MS) {
            rafRef.current = requestAnimationFrame(tick)
            return
          }

          // push into RMS history for modulation/variance checks (keep short window)
          const hist = rmsHistoryRef.current
          hist.push(rms)
          if (hist.length > 12) hist.shift()
          // compute simple variance in the window
          let mean = 0
          for (let v of hist) mean += v
          mean = mean / hist.length
          let variance = 0
          for (let v of hist) variance += (v - mean) * (v - mean)
          variance = variance / hist.length

          // Hysteresis thresholds (start > end)
          const startThreshold = noiseFloorRef.current * factorRef.current
          const endThreshold   = noiseFloorRef.current * Math.max(0.75, factorRef.current * 0.9)

          const isAboveStart = combined > startThreshold
          const isBelowEnd   = combined < endThreshold

          // Candidate start detection requires:
          //  - combined energy above startThreshold
          //  - modulation variance above threshold (to avoid rigid noise)
          //  - energy persists for at least minActiveMs
          if (!speakingRef.current) {
            if (isAboveStart && variance > modulationVarianceThreshold) {
              // mark last candidate time if not set
              if (!lastStartCandidateRef.current) lastStartCandidateRef.current = now
              // check duration above threshold
              if (now - lastStartCandidateRef.current >= minActiveMs) {
                speakingRef.current = true
                lastAboveAtRef.current = now
                lastStartCandidateRef.current = 0
                onStartRef.current?.('microphone')
              }
            } else {
              // reset candidate if conditions broken
              lastStartCandidateRef.current = 0

              // track false negative-ish patterns (sustained near-threshold energy)
              if (combined > noiseFloorRef.current * (factorRef.current * 0.92)) {
                falseNegativesRef.current++
              }
            }
          } else {
            // currently speaking: update lastAboveAt if energy is above a softer 'above' test
            if (combined > endThreshold) {
              lastAboveAtRef.current = now
            }
            // consider end if we've been below endThreshold for > endHoldMs
            if (now - lastAboveAtRef.current > endHoldMs && isBelowEnd) {
              speakingRef.current = false
              onEndRef.current?.('microphone')
            }

            // small heuristic: if we started and stopped very quickly, consider it a false positive candidate
            // (we can detect very short speech bursts and nudge factor upward later)
            if (isBelowEnd && now - lastAboveAtRef.current < 80) {
              falsePositivesRef.current++
            }
          }

          // periodic adaptive adjustments (cheap)
          checksSinceAdaptRef.current++
          if (checksSinceAdaptRef.current > 240) {
            if (falsePositivesRef.current > 8) {
              factorRef.current = Math.min(maxFactor, factorRef.current + adaptRate * (falsePositivesRef.current))
            } else if (falseNegativesRef.current > 8) {
              factorRef.current = Math.max(minFactor, factorRef.current - adaptRate * (falseNegativesRef.current))
            }
            falsePositivesRef.current = 0
            falseNegativesRef.current = 0
            checksSinceAdaptRef.current = 0
          }

          rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
      } catch (err) {
        // fail silently but log for debugging
        console.error('Adaptive speech init failed', err)
      }
    }

    init()

    return () => {
      cancelledRef.current = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      try { analyserRef.current?.disconnect() } catch (e) {}
      try { sourceRef.current?.disconnect() } catch (e) {}
      try { mediaStreamRef.current?.getTracks().forEach(t => t.stop()) } catch (e) {}

      mediaStreamRef.current = null
      sourceRef.current      = null
      analyserRef.current    = null
      timeDataRef.current    = null
      freqDataRef.current    = null
      noiseFloorRef.current  = 0
      factorRef.current      = initialFactor
      speakingRef.current    = false
      lastAboveAtRef.current = 0
      rafRef.current         = null
      cancelledRef.current   = true
    }
  }, [
    enabled,
    isMicrophoneMuted,
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    initialFactor,
    noiseSmoothing,
    minActiveMs,
    endHoldMs,
    adaptRate,
    minFactor,
    maxFactor,
    modulationVarianceThreshold,
    audioCtx
  ])
}
