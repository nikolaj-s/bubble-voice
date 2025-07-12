
import styles from './SectionDivider.module.css';

const SectionDivider = ({ label }) => (
  <div className={styles.divider}>
    {label && <span className={styles.label}>{label}</span>}
  </div>
);

export default SectionDivider

