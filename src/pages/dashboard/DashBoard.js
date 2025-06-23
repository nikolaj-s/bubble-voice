
import styles from "./DashBoard.module.css";

import { SideNav } from "../../layout/Navigation/SideNav/SideNav";

import TopNav from "../../layout/Navigation/TopNav/TopNav";

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

import { NotificationProvider } from "../../providers/NotificationProvider/NotificationProvider";
import { GlobalVolumeProvider } from "../../context/GlobalVolumeContext";
import NativeFullScreenWrapper from "../../components/ui/Wrappers/NativeFullScreenWrapper/NativeFullScreenWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDevices } from "../../features/Settings/Devices/deviceSlice";
import { ServerActivityFeed } from "../server/serverActivityFeed/ServerActivityFeed";
import SoundEffectPlayer from "../../components/SoundEffectPlayer/SoundEffectPlayer";

const Dashboard = () => {

  const dispatch = useDispatch();

  useDeviceWatcher();

  useApplyTheme();

  useEffect(() => {

    dispatch(fetchDevices());

  }, [dispatch])

  return (
   
      <FetchAccountProvider>
        <SocketProvider>
          <NotificationProvider>
            <GlobalVolumeProvider>
              <NativeFullScreenWrapper>
                <ContextMenu>
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
                              <Route path="activity" element={<ServerActivityFeed />} />
                              <Route path="channel/:channelID" element={<Channel />} />
                            </Route>
                            <Route path="/not-found" element={<ServerNotFound />} />
                          </Routes>
                        </div>
                      </div>
                    
                    </MediaControlsProvider>
                    <SoundEffectPlayer />
                  </Overlay>
                </ContextMenu>
                <AlertToast />
                </NativeFullScreenWrapper>
             </GlobalVolumeProvider>
            </NotificationProvider>
          </SocketProvider>
          
        <ConnectionStatusNotice />
      </FetchAccountProvider>
  
  );
};

export default Dashboard;
