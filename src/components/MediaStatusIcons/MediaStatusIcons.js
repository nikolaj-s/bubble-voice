// components/MediaStatusIcons.jsx

import {
  MicOff,
  Video,
  HeadphoneOff,
  VideoOff
} from 'lucide-react';
import styles from './MediaStatusIcons.module.css';

const MediaStatusIcons = ({
  isMicrophoneMuted,
  isAudioMuted,
  isWebcamOn,
  isScreenSharing,
  webcamDisabled
}) => {
  return (
    <div className={styles.statusRow}>
      {isMicrophoneMuted && !isAudioMuted ? <MicOff className={styles.icon} /> : null}
      {isAudioMuted ? <HeadphoneOff className={styles.icon} /> : null}
      {isWebcamOn && webcamDisabled ? <VideoOff className={styles.icon} color='var(--error-color)' /> : isWebcamOn ? <Video className={styles.icon} /> : null}
    </div>
  );
};

export default MediaStatusIcons;
