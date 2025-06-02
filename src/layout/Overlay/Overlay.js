import { AnimatePresence } from "framer-motion";

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { closeOverlay, setOverlay } from "../../features/Overlay/overlaySlice";

import { Search } from "../Overlays/Search/Search";

import { CreateServer } from "../Overlays/createServer/CreateServer";

import { ServerSettings } from "../../pages/serverSettings/ServerSettings";

import { Settings } from "../../pages/settings/settings";

import { JoinServer } from "../../pages/joinServer/joinServer";

import { ExpandedImage } from "../Overlays/ExpandedImage/ExpandedImage";

import { OverlayCloseButton } from "../../components/ui/Buttons/OverlayCloseButton/OverlayCloseButton";

import { UserQuickMenu } from "../Overlays/UserQuickMenu/UserQuickMenu";

// hooks
import useKeyupListener from "../../hooks/useKeyupListener";
import { SettingsQuickMenu } from "../Overlays/SettingsQuickMenu/SettingsQuickMenu";
import { WebcamOverlay } from "../Overlays/WebcamOverlay/WebcamOverlay";
import { CreateDrawing } from "../Overlays/CreateDrawing/CreateDrawing";
import { ServerRecommendations } from "../Overlays/ServerRecommendations/ServerRecommendations";
import { ChannelDescription } from "../Overlays/ChannelDescription/ChannelDescription";
import { UserProfile } from "../Overlays/UserProfile/UserProfile";
import { ExpandedVideo } from "../Overlays/ExpandedVideo/ExpandedVideo";
import { WidgetsOverlay } from "../Overlays/Widgets/WidgetsOverlay";
import { MediaPlayerOverlay } from "../Overlays/MediaPlayerOverlay/MediaPlayerOverlay";
import { ScreenPickerOverlay } from "../Overlays/ScreenPickerOverlay/ScreenPickerOverlay";
import MobileSwipeToCloseWrapper from "../../components/ui/Wrappers/MobileSwipeToCloseWrapper/MobileSwipteToCloseWrapper";
import FullScreenWrapper from "../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper";
import { MediaPlayerHistory } from "../Overlays/MediaPlayerHistory/MediaPlayerHistory";

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings,
  joinServer: JoinServer,
  expandImage: ExpandedImage,
  expandVideo: ExpandedVideo,
  userQuickMenu: UserQuickMenu,
  settingsQuickMenu: SettingsQuickMenu,
  webcamOverlay: WebcamOverlay,
  createDrawing: CreateDrawing,
  serverRecommendations: ServerRecommendations,
  channelDescription: ChannelDescription,
  widgets: WidgetsOverlay,
  mediaPlayer: MediaPlayerOverlay,
  screenPicker: ScreenPickerOverlay,
  mediaPlayerHistory: MediaPlayerHistory
};

export const Overlay = ({ children }) => {

  const dispatch = useDispatch();

  const activeOverlay = useSelector(state => state.overlaySlice.currentOverlay);

  const ActiveComponent = overlayComponents[activeOverlay];

  const [currentY, setCurrentY] = React.useState(null);

  useKeyupListener(() => {dispatch(closeOverlay())}, 27, false);

  useKeyupListener(() => {dispatch(setOverlay('search'))}, 191, true);

  return (
    <>
      <AnimatePresence>
        {ActiveComponent ? 
        activeOverlay === 'userQuickMenu' ?
        <MobileSwipeToCloseWrapper onClose={() => {dispatch(closeOverlay())}}>
          <ActiveComponent close={() => {dispatch(closeOverlay())}} />
        </MobileSwipeToCloseWrapper>
        :
        <>
        <OverlayCloseButton action={() => {dispatch(closeOverlay())}} />
        <FullScreenWrapper maxContentWidth={activeOverlay === 'expandImage' ? '100%' : null} key={activeOverlay} exitFromY={currentY} onClose={() => {dispatch(closeOverlay())}}>
          <MobileSwipeToCloseWrapper onClose={(y) => {setCurrentY(y); dispatch(closeOverlay())}}>
            <ActiveComponent close={() => dispatch(closeOverlay())}  /> 
          </MobileSwipeToCloseWrapper>  
        </FullScreenWrapper>
        </>
        : null}
      </AnimatePresence>
      {children}
      <UserProfile />
    </>
  );
};

