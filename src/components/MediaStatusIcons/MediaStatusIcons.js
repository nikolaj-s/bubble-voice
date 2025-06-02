// components/MediaStatusIcons.jsx
import React from 'react';

import {
  MicOff,
  Video,
  HeadphoneOff
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
      {isMicrophoneMuted && !isAudioMuted ? <MicOff className={styles.icon} /> : null}
      {isAudioMuted ? <HeadphoneOff className={styles.icon} /> : null}
      {isWebcamOn ? <Video className={styles.icon} /> : null}
    </div>
  );
};

export default MediaStatusIcons;
