import React from 'react';
import styles from './DashBoard.module.css';
import { SideNav } from '../../components/Navigation/SideNav/SideNav';
import { TopNav } from '../../components/Navigation/TopNav/TopNav';
import { SocketProvider } from '../../context/SocketContext';
import FetchAccountWrapper from '../../layout/FetchAccountWrapper/FetchAccountWrapper';

const Dashboard = () => {
  return (
    <FetchAccountWrapper>
      <SocketProvider>
        <div className={styles.layout}>
          <SideNav />
          <div className={styles.wrapper}>
            <TopNav />
            <div className={styles.mainContent}>
                
            </div>
          </div>
        </div>
      </SocketProvider>
    </FetchAccountWrapper>
  );
};

export default Dashboard;
