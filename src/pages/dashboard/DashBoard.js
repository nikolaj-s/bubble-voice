import React from "react";
import styles from "./DashBoard.module.css";
import { SideNav } from "../../components/Navigation/SideNav/SideNav";
import TopNav from "../../components/Navigation/TopNav/TopNav";
import { SocketProvider } from "../../context/SocketContext";
import { Route, Routes } from "react-router";
import { Overlay } from "../../layout/Overlay/Overlay";
import { DashboardHome } from "../../components/DashboardHome/DashboardHome";
import { Server } from "../server/server";
import ServerNotFound from "../../components/Error/ServerNotFound/ServerNotFound";
import FetchAccountProvider from "../../providers/FetchAccountProvider/FetchAccountProvider";
import ContextMenuWrapper from "../../components/ui/Wrappers/ContextMenuWrapper/ContextMenuWrapper";
import { Channel } from "../server/channel/channel";

const Dashboard = () => {
  return (
    <ContextMenuWrapper>
      <FetchAccountProvider>
        <SocketProvider>
          <Overlay>
            <div className={styles.layout}>
              <SideNav />
              <div className={styles.wrapper}>
                <TopNav />
                <div className={styles.mainContent}>
                  <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/server/:serverID/*" element={<Server />} >
                      <Route path="channel/:channelID" element={<Channel />} />
                    </Route>
                    <Route path="/not-found" element={<ServerNotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </Overlay>
        </SocketProvider>
      </FetchAccountProvider>
    </ContextMenuWrapper>
  );
};

export default Dashboard;
