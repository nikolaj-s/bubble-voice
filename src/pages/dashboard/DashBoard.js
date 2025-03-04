import React from "react";
import styles from "./DashBoard.module.css";
import { SideNav } from "../../components/Navigation/SideNav/SideNav";
import TopNav from "../../components/Navigation/TopNav/TopNav";
import { SocketProvider } from "../../context/SocketContext";
import FetchAccountWrapper from "../../layout/FetchAccountWrapper/FetchAccountWrapper";
import { Route, Routes } from "react-router";
import { Notices } from "../../components/Notices/Notices";
import { Overlay } from "../../layout/Overlay/Overlay";

const Dashboard = () => {
  return (
    <FetchAccountWrapper>
      <SocketProvider>
        <Overlay>
          <div className={styles.layout}>
            <SideNav />
            <div className={styles.wrapper}>
              <TopNav />
              <div className={styles.mainContent}>
                <section></section>
                <section className={styles["middle-content"]}>
                  <Routes>
                    <Route path="/" element={<Notices />} />
                  </Routes>
                </section>
                <section></section>
              </div>
            </div>
          </div>
        </Overlay>
      </SocketProvider>
    </FetchAccountWrapper>
  );
};

export default Dashboard;
