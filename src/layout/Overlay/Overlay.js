import { AnimatePresence } from "framer-motion";

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectActiveOverlay, closeOverlay } from "../../features/Overlay/overlaySlice";

import { Search } from "../Overlays/Search/Search";

import { CreateServer } from "../../pages/createServer/CreateServer";
import { ServerSettings } from "../../pages/serverSettings/ServerSettings";
import { Settings } from "../../pages/settings/settings";
import { JoinServer } from "../../pages/joinServer/joinServer";
import { ExpandedImage } from "../Overlays/ExpandedImage/ExpandedImage";

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings,
  joinServer: JoinServer,
  expandImage: ExpandedImage
};

export const Overlay = ({ children }) => {

  const dispatch = useDispatch();

  const activeOverlay = useSelector(selectActiveOverlay);

  const ActiveComponent = overlayComponents[activeOverlay];

  return (
    <>
      <AnimatePresence>
        {ActiveComponent ? <ActiveComponent close={() => dispatch(closeOverlay())} key={activeOverlay} /> : null}
      </AnimatePresence>
      {children}
    </>
  );
};

