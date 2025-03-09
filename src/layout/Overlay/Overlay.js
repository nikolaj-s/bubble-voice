import { AnimatePresence } from "framer-motion";

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectActiveOverlay, closeOverlay } from "../../features/Overlay/overlaySlice";

import { Search } from "../Search/Search";

import { CreateServer } from "../../pages/createServer/CreateServer";
import { ServerSettings } from "../../pages/serverSettings/ServerSettings";
import { Settings } from "../../pages/settings/settings";

const overlayComponents = {
  search: Search,
  createServer: CreateServer,
  serverSettings: ServerSettings,
  settings:Settings
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

