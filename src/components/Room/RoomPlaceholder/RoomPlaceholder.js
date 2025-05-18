
import styles from './RoomPlaceholder.module.css';
import {ChannelBackground} from '../../ChannelBackground/ChannelBackground'; // Adjust path if needed
import { MonitorX } from 'lucide-react';

const RoomPlaceholder = ({ channelBackground }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <MonitorX color='var(--text-color)' size={60} />
        <h1 className={styles.title}> No Streams Here</h1>
        <p className={styles.blurb}>
          This channel is currently off the air. No video, no audio — just vibes and maybe some awkward silence. 
        </p>
        <p className={styles.suggestion}>Try a different channel or enjoy the peace and quiet.</p>
      </div>
    </div>
  );
};

export default RoomPlaceholder;
