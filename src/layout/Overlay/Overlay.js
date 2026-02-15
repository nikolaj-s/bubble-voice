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
import { MediaPlayerSaves } from "../Overlays/MediaPlayerSaves/MediaPlayerSaves";
import { Notifications } from "../Overlays/Notifications/Notifications";
import { LeaveServer } from "../Overlays/LeaveServer/LeaveServer";
import { MomentOverlay } from "../Overlays/MomentOverlay/MomentOverlay";
import { Conversations } from "../Overlays/Conversations/Conversations";
import { DownloadOverlay } from "../Overlays/DownloadOverlay/DownloadOverlay";
import { ScreenshotOverlay } from "../Overlays/ScreenshotOverlay/ScreenshotOverlay";
import { EditMessage } from "../Overlays/EditMessage/EditMessage";
import { MessagingTimeout } from "../Overlays/Moderation/MessagingTimeout/MessagingTimeout";
import { AddMedia } from "../Overlays/AddMedia/AddMedia";
import { MenuCloseHeader } from "../../components/Headers/MenuCloseHeader/MenuCloseHeader";

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings,
  joinServer: JoinServer,
  userQuickMenu: UserQuickMenu,
  settingsQuickMenu: SettingsQuickMenu,
  webcamOverlay: WebcamOverlay,
  createDrawing: CreateDrawing,
  serverRecommendations: ServerRecommendations,
  channelDescription: ChannelDescription,
  widgets: WidgetsOverlay,
  mediaPlayer: MediaPlayerOverlay,
  screenPicker: ScreenPickerOverlay,
  mediaPlayerHistory: MediaPlayerHistory,
  mediaPlayerSaves: MediaPlayerSaves,
  leaveServer: LeaveServer,
  moment: MomentOverlay,
  downloadApp: DownloadOverlay,
  editMessage: EditMessage,
  messagingTimeout: MessagingTimeout,
  AddMedia
};

const overlayTitles = {
  search: "Search",
  createServer: "Create Server",
  settings: "Settings",
  joinServer: "Join Server",
  webcamOverlay: "Preview Webcam",
  moment: "Moment",
  serverSettings: "Bubble Settings",
  widgets: "Widgets",
  serverRecommendations: "Bubble Recommendations",
  mediaPlayerHistory: "Media Player History",
  mediaPlayerSaves: "Media Player Saves",
  mediaPlayer: "Media Player",
  screenPicker: "Pick A Stream",
  leaveServer: "Leave Server",
  downloadApp: "Download The App",
  editMessage: "Edit Message",
  messagingTimeout: "Timeout Messaging",
  AddMedia: "Add Media",
  channelDescription: "Channel Details"
}

export const Overlay = ({ children }) => {

  const dispatch = useDispatch();

  const activeOverlay = useSelector(state => state.overlaySlice.currentOverlay);

  const ActiveComponent = overlayComponents[activeOverlay];

  const [currentY, setCurrentY] = React.useState(null);

  useKeyupListener(() => {dispatch(closeOverlay())}, 27, false);

  useKeyupListener(() => {dispatch(setOverlay('search'))}, 191, true);

  return (
    <>
        {ActiveComponent && activeOverlay ? 
        activeOverlay === 'userQuickMenu' ?
        <MobileSwipeToCloseWrapper onClose={() => {dispatch(closeOverlay())}}>
          <ActiveComponent close={() => {dispatch(closeOverlay())}} />
        </MobileSwipeToCloseWrapper>
        :
        <>
        {/* {(!image && !video) && <OverlayCloseButton action={() => {dispatch(closeOverlay())}} />} */}
        <FullScreenWrapper 
        maxContentWidth={activeOverlay === 'expandImage' ? '100%' : null} 
        key={activeOverlay} exitFromY={0} onClose={() => {dispatch(closeOverlay())}}>
          {/*<MobileSwipeToCloseWrapper onClose={(y) => {setCurrentY(y); dispatch(closeOverlay())}}> */}
            <div style={{
              display: 'grid',
              gridTemplateRows: '40px auto',
              backgroundColor: 'var(--primary-color)',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden'
            }}>
              <MenuCloseHeader title={overlayTitles[activeOverlay]} onClose={() => {dispatch(closeOverlay())}} />
              <ActiveComponent close={() => dispatch(closeOverlay())}  /> 
            </div>
        {/*  </MobileSwipeToCloseWrapper>  */}
        </FullScreenWrapper>
        </>
        : null}
      {children}
      <UserProfile />
      <ExpandedImage />
      <ExpandedVideo />
      <Notifications />
      <Conversations />
      <ScreenshotOverlay />
    </>
  );
};

