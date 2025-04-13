import React from "react";
import styles from "./DashBoard.module.css";
import { SideNav } from "../../components/Navigation/SideNav/SideNav";
import TopNav from "../../components/Navigation/TopNav/TopNav";
import { SocketProvider } from "../../context/SocketContext";
import { Route, Routes } from "react-router";
import { Overlay } from "../../layout/Overlay/Overlay";
import { Server } from "../server/server";
import ServerNotFound from "../../components/Error/ServerNotFound/ServerNotFound";
import FetchAccountProvider from "../../providers/FetchAccountProvider/FetchAccountProvider";
import { Channel } from "../server/channel/channel";
import { MediaControlsProvider } from "../../context/MediaControlsContext";
import ContextMenu from "../../layout/ContextMenu/ContextMenu";

import { ServerDashboard } from "../server/serverDashboard/ServerDashboard";

import { UserDashboard } from "./userDashboard/UserDashboard";

import useDeviceWatcher from "../../hooks/useDeviceWatcher";

import ConnectionStatusNotice from "../../components/ConnectionStatusNotice/ConnectionStatusNotice";

import AlertToast from "../../components/AlertToast/AlertToast";

import { useApplyTheme } from "../../hooks/useApplyTheme";

const Dashboard = () => {

  useDeviceWatcher();

  useApplyTheme();

  return (
    <ContextMenu>
      <FetchAccountProvider>
        <SocketProvider>
          <Overlay>
            <MediaControlsProvider>
              <div className={styles.layout}>
                <SideNav />
                <div className={styles.wrapper}>
                  <TopNav />
                  <Routes>
                    <Route path="/*" element={<UserDashboard />} >
                    </Route>
                    <Route path="/server/:serverID/*" element={<Server />} >
                      <Route path="" element={<ServerDashboard />} />
                      <Route path="channel/:channelID" element={<Channel />} />
                    </Route>
                    <Route path="/not-found" element={<ServerNotFound />} />
                  </Routes>
                </div>
              </div>
              </MediaControlsProvider>
          </Overlay>
        </SocketProvider>
        <AlertToast />
        <ConnectionStatusNotice />
      </FetchAccountProvider>
    </ContextMenu>
  );
};

export default Dashboard;
