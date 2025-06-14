
import styles from './ServerDisplay.module.css';

export const ServerDisplay = ({ server_banner, server_name, welcome_message }) => (
  <div className={styles.container}>
    {server_banner && (
      <div className={styles.bannerWrapper}>
        <img src={server_banner} alt={`${server_name} banner`} className={styles.banner} />
      </div>
    )}
    <div className={styles.info}>
      <h2 className={styles.name}>{server_name}</h2>
      {welcome_message && (
        <p className={styles.description}>{welcome_message}</p>
      )}
    </div>
  </div>
);
