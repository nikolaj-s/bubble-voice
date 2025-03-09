import React from "react";
import styles from "./DashBoard.module.css";
import { SideNav } from "../../components/Navigation/SideNav/SideNav";
import TopNav from "../../components/Navigation/TopNav/TopNav";
import { SocketProvider } from "../../context/SocketContext";
import FetchAccountWrapper from "../../layout/FetchAccountWrapper/FetchAccountWrapper";
import { Route, Routes } from "react-router";
import { Notices } from "../../components/Notices/Notices";
import { Overlay } from "../../layout/Overlay/Overlay";
import { DashboardHome } from "../../components/DashboardHome/DashboardHome";
import { Server } from "../server/server";
import ServerNotFound from "../../components/Error/ServerNotFound/ServerNotFound";

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
                <Routes>
                  <Route path="/" element={<DashboardHome />} />
                  <Route path="/server/:serverID" element={<Server />} />
                  <Route path="/not-found" element={<ServerNotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </Overlay>
      </SocketProvider>
    </FetchAccountWrapper>
  );
};

export default Dashboard;
