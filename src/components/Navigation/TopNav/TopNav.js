import { useLocation } from "react-router-dom";

import styles from "./TopNav.module.css";
import IconButton from "../../Buttons/IconButton/IconButton";

import { SearchIcon } from "../../Icons/Search/SearchIcon";
import { NotificationBellIcon } from "../../Icons/NotificationBell/NotificationBellIcon";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { selectServerDetailsID, selectServerName } from "../../../features/ServerDetails/serverDetailsSlice";

import { Settings2 } from "lucide-react";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const location = useLocation();

  const serverName = useSelector(selectServerName);

  const isServerRoute = useSelector(selectServerDetailsID);

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
      {isServerRoute && <></>}
      </div>
      <div className={styles.buttonGroup}>
        
        <IconButton onClick={() => {dispatch(setOverlay('search'))}} Icon={<SearchIcon />} position="bottom" title={"Search"} />
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
