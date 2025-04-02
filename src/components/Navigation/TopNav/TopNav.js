
import styles from "./TopNav.module.css";
import IconButton from "../../ui/Buttons/IconButton/IconButton";

import { SearchIcon } from "../../Icons/Search/SearchIcon";
import { NotificationBellIcon } from "../../Icons/NotificationBell/NotificationBellIcon";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { selectServerName } from "../../../features/ServerDetails/serverDetailsSlice";

import { Settings2 } from "lucide-react";
import { Routes } from "react-router";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const serverName = useSelector(selectServerName);

  const isServerRoute = useSelector(state => state.serverDetailsSlice.server_id);

  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-color')
    .trim();

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        <h2>{serverName || "BUBBLE"}</h2>
        {isServerRoute ?
        <IconButton Icon={<Settings2 color={textColor} />} position="bottom" title={`${serverName} Settings`} onClick={() => {dispatch(setOverlay('serverSettings'))}} />
        : null}
      </div>
  
      {/* Dynamic Buttons */}
      <div className={styles.serverButtons}>
      {isServerRoute && (
        <Routes>
          
        </Routes>
      )}
      </div>
      <div className={styles.buttonGroup}>
        
        <IconButton width={60} onClick={() => {dispatch(setOverlay('search'))}} Icon={<SearchIcon />} position="bottom" title={"Search"} />
        <IconButton
          Icon={<NotificationBellIcon />}
          position="bottom"
          title={"Notifications"}
        />
        {/* Notifications Button */}
      </div>
    </nav>
  );
};

export default TopNav;
