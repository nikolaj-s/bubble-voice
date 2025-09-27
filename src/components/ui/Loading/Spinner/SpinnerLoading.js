
import styles from './SpinnerLoading.module.css';

import { LoadingWheel } from '../LoadingWheel/LoadingWheel';

const SpinnerLoading = () => {
  return (
    <div className={styles.overlay}>
      <LoadingWheel />
    </div>
  );
};

export default SpinnerLoading;
