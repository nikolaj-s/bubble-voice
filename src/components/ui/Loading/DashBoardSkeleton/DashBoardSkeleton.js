import React from 'react';

import styles from './DashBoardSkeleton.module.css';

import { Logo } from '../../../Icons/Bubble/Logo';

const DashboardSkeleton = ({alt = false}) => {
  return (
    <>
    {alt ?
    <>
        <div className={styles.fixedSection}></div>
        <div className={styles.centerSection}></div>
        <div className={styles.fixedSection}></div>
    </>
    :
    <div className={styles.layout}>
      <div className={styles.sideNav}>
        {/* Circle Buttons */}
        <div className={styles.logo}>
            <Logo />
        </div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topNav}></div>
        <div className={styles.contentSection}>
          <div className={styles.fixedSection}></div>
          <div className={styles.centerSection}></div>
          <div className={styles.fixedSection}></div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default DashboardSkeleton;
