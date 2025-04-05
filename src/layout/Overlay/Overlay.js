import { AnimatePresence } from "framer-motion";

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectActiveOverlay, closeOverlay, setOverlay } from "../../features/Overlay/overlaySlice";

import { Search } from "../Overlays/Search/Search";

import { CreateServer } from "../../pages/createServer/CreateServer";
import { ServerSettings } from "../../pages/serverSettings/ServerSettings";
import { Settings } from "../../pages/settings/settings";
import { JoinServer } from "../../pages/joinServer/joinServer";
import { ExpandedImage } from "../Overlays/ExpandedImage/ExpandedImage";

import { OverlayCloseButton } from "../../components/ui/Buttons/OverlayCloseButton/OverlayCloseButton";
import { UserQuickMenu } from "../Overlays/UserQuickMenu/UserQuickMenu";

// hooks
import useKeyupListener from "../../hooks/useKeyupListener";

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings,
  joinServer: JoinServer,
  expandImage: ExpandedImage,
  userQuickMenu: UserQuickMenu
};

export const Overlay = ({ children }) => {

  const dispatch = useDispatch();

  const activeOverlay = useSelector(selectActiveOverlay);

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

