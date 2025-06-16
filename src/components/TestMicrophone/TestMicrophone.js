import React, { useState, useEffect, useRef } from 'react';
import TextButton from '../ui/Buttons/TextButton/TextButton';
import VUMeter from '../Misc/VUMeter/VUMeter';
import useTestMicrophone from '../../hooks/useTestMicrophone';
import Label from '../ui/Titles/Label/Label';
import VolumeSlider from '../ui/Inputs/VolumeSlider/VolumeSlider';
import styles from './TestMicrophone.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMicrophone } from '../../features/Channel/MediaControl/mediaControlSlice';

// This child only exists while testing === true, so the hook
// only activates when you’re in “Start” mode.
const ListenToMicrophone = ({ voiceThreshold, toggleIsSpeaking, deviceId, onChange }) => {

  const dispatch = useDispatch();

  const wasMuted = useRef(false);

  const {noiseSuppression, echoCancellation, autoGainControl, isMicrophoneMuted} = useSelector(state => state.mediaControlSlice);

  const {selectedMicrophone} = useSelector(state => state.deviceSlice);

  const { volume, isSpeaking } = useTestMicrophone(voiceThreshold, selectedMicrophone?.deviceId, echoCancellation, noiseSuppression, autoGainControl);

  useEffect(() => {

    wasMuted.current = isMicrophoneMuted;

    if (isMicrophoneMuted) return;

    dispatch(toggleMicrophone());

    return () => {
      if (wasMuted.current) return;
      dispatch(toggleMicrophone());
    }
  //eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {

    toggleIsSpeaking(isSpeaking);

  }, [isSpeaking, toggleIsSpeaking])

  useEffect(() => {
    onChange(volume);
  }, [volume, onChange]);

  return null;
};

export const TestMicrophone = ({
  voiceThreshold = 0,
  setVoiceThreshold = () => {},
  usingPushToTalk = false,
  deviceId = null,
}) => {
  const [testing, setTesting] = useState(false);
  const [volume, setVolume]   = useState(0);
  const [isSpeaking, toggleIsSpeaking] = useState(false);

  return (
    <div className={styles.container}>
      {/* VU-Meter always visible, shows 0 when not testing */}
      <VUMeter
        volume={volume}
        voiceThreshold={usingPushToTalk ? null : voiceThreshold}
        isSpeaking={isSpeaking}
      />

      {/* Slider to tweak the activation point */}
      {!usingPushToTalk && (
        <>
          <Label label="Adjust Voice Activation Threshold" />
          <VolumeSlider
            min={0}
            max={100}
            step={1}
            value={voiceThreshold}
            onChange={(v) => setVoiceThreshold(Number(v))}
          />
        </>
      )}

      {/* Start / Stop testing */}
      <TextButton
        backgroundColor={testing ? 'var(--error-color)' : null}
        action={() => {
          setTesting((t) => !t);
          setVolume(0);
        }}
        title={testing ? 'Stop Testing' : 'Start Testing'}
        maxWidth={120}
      />

      {/* When testing, mount the listener which drives volume state */}
      {testing && (
        <ListenToMicrophone
          deviceId={deviceId}
          voiceThreshold={voiceThreshold}
          onChange={setVolume}
          toggleIsSpeaking={toggleIsSpeaking}
        />
      )}
    </div>
  );
};

export default TestMicrophone;
