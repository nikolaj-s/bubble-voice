// components/MediaStatusIcons.jsx
import React from 'react';

import {
  MicOff,
  VolumeX,
  Video,
  Monitor
} from 'lucide-react';
import styles from './MediaStatusIcons.module.css';

const MediaStatusIcons = ({
  isMicrophoneMuted,
  isAudioMuted,
  isWebcamOn,
  isScreenSharing
}) => {
  return (
    <div className={styles.statusRow}>
      {isMicrophoneMuted ? <MicOff className={styles.icon} /> : null}
      {isAudioMuted ? <VolumeX className={styles.icon} /> : null}
      {isWebcamOn ? <Video className={styles.icon} /> : null}
      {isScreenSharing ? <Monitor className={styles.icon} /> : null}
    </div>
  );
};

export default MediaStatusIcons;
