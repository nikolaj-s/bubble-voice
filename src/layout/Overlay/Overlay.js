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

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings,
  joinServer: JoinServer,
  expandImage: ExpandedImage,
  userQuickMenu: UserQuickMenu,
  settingsQuickMenu: SettingsQuickMenu,
  webcamOverlay: WebcamOverlay,
  createDrawing: CreateDrawing,
  serverRecommendations: ServerRecommendations
};

export const Overlay = ({ children }) => {

  const dispatch = useDispatch();

  const activeOverlay = useSelector(state => state.overlaySlice.currentOverlay);

  const ActiveComponent = overlayComponents[activeOverlay];

  useKeyupListener(() => {dispatch(closeOverlay())}, 27, false);

  useKeyupListener(() => {dispatch(setOverlay('search'))}, 191, true);

  return (
    <>
      <AnimatePresence>
        {ActiveComponent ? 
        <>
        <OverlayCloseButton action={() => {dispatch(closeOverlay())}} />
        <ActiveComponent close={() => dispatch(closeOverlay())} key={activeOverlay} /> 
        </>  
        : null}
      </AnimatePresence>
      {children}
    </>
  );
};

