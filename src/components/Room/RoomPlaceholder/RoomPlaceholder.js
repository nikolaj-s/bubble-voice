
import styles from './RoomPlaceholder.module.css';// Adjust path if needed
import { MonitorX } from 'lucide-react';
import { Description } from '../../ui/Description/Description';

const RoomPlaceholder = ({ channelBackground }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <MonitorX color='var(--text-color)' size={60} />
        <h1 className={styles.title}> No Streams Here</h1>
        <Description description={'  This channel is currently off the air. No video, no audio — just vibes and maybe some awkward silence. '} />
      </div>
    </div>
  );
};

export default RoomPlaceholder;
