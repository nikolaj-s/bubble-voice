
import { Subtitle } from "../Titles/Subtitle/Subtitle";
import styles from "./MiniStreamIndicator.module.css";
import { Play } from "lucide-react"; // Example placeholder icon

const MiniStreamIndicator = ({
  name = "Screen",
  thumbnail = null,
  icon = null,
  streamColor = 'var(--background-color)',
}) => {

  return (
    <div
      className={styles.card}
      tabIndex={0}
      role="button"
      title={name}
      style={{backgroundColor: streamColor}}
    >
      <div className={styles.thumbWrapper}>
        {thumbnail ? (
          <img src={thumbnail} alt={name} className={styles.thumbnail} />
        ) : (
          <div className={styles.placeholder}>
            {icon || <Play className={styles.placeholderIcon} />}
          </div>
        )}
        <div className={styles.liveIndicator}>LIVE</div>
      </div>
      <Subtitle width={'100%'} textAlign={'center'}>{name}</Subtitle>
    </div>
  );
};

export default MiniStreamIndicator;
