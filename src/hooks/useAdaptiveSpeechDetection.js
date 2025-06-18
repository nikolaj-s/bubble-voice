// hooks/useAdaptiveSpeechDetection.js
import { useEffect, useRef } from 'react'
import { useAudioContext } from '../context/AudioContext'

export function useAdaptiveSpeechDetection({
  enabled,
  isMicrophoneMuted,
  deviceId = null,
  echoCancellation = true,
  noiseSuppression = true,
  autoGainControl = false,
  factor = 1.5,
  smoothing = 0.9,
  interval = 100,
  onSpeechStart,
  onSpeechEnd
}) {
  const audioCtx = useAudioContext()

  // refs for cleanup
  const mediaStreamRef = useRef(null)
  const sourceRef      = useRef(null)
  const analyserRef    = useRef(null)
  const dataRef        = useRef(null)
  const noiseFloorRef  = useRef(0)
  const speakingRef    = useRef(false)
  const timerRef       = useRef(null)

  // stash callbacks in refs so effect deps can omit them
  const onStartRef = useRef(onSpeechStart)
  const onEndRef   = useRef(onSpeechEnd)
  useEffect(() => { onStartRef.current = onSpeechStart }, [onSpeechStart])
  useEffect(() => { onEndRef.current   = onSpeechEnd   }, [onSpeechEnd])

  useEffect(() => {
    if (!enabled || isMicrophoneMuted) return

    let cancelled = false

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
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop())
          return
        }

        mediaStreamRef.current = stream
        sourceRef.current      = audioCtx.createMediaStreamSource(stream)

        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 512
        sourceRef.current.connect(analyser)
        analyserRef.current = analyser

        dataRef.current = new Uint8Array(analyser.frequencyBinCount)

        const tick = () => {
          if (cancelled) return

          analyser.getByteFrequencyData(dataRef.current)
          let sum = 0
          for (let v of dataRef.current) sum += v
          const avg = sum / dataRef.current.length

          noiseFloorRef.current =
            smoothing * noiseFloorRef.current + (1 - smoothing) * avg

          const threshold   = noiseFloorRef.current * factor
          const isSpeaking  = avg > threshold

          if (isSpeaking && !speakingRef.current) {
            speakingRef.current = true
            onStartRef.current?.()
          } else if (!isSpeaking && speakingRef.current) {
            speakingRef.current = false
            onEndRef.current?.()
          }

          timerRef.current = window.setTimeout(tick, interval)
        }

        tick()
      } catch (err) {
        console.error('Adaptive speech init failed', err)
      }
    }

    init()

    return () => {
      cancelled = true
      if (timerRef.current) window.clearTimeout(timerRef.current)
      analyserRef.current?.disconnect()
      sourceRef.current?.disconnect()
      mediaStreamRef.current?.getTracks().forEach(t => t.stop())

      mediaStreamRef.current = null
      sourceRef.current      = null
      analyserRef.current    = null
      dataRef.current        = null
      noiseFloorRef.current  = 0
      speakingRef.current    = false
      timerRef.current       = null
    }
  }, [
    enabled,
    isMicrophoneMuted,
    deviceId,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    factor,
    smoothing,
    interval,
    audioCtx
  ])
}
