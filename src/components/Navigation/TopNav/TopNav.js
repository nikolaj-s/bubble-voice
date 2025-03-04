import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./TopNav.module.css";
import IconButton from "../../Buttons/IconButton/IconButton";

import { SearchIcon } from "../../Icons/Search/SearchIcon";
import { NotificationBellIcon } from "../../Icons/NotificationBell/NotificationBellIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchOpen, toggleOpenSearch } from "../../../features/Search/searchSlice";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const globalSearchOpen = useSelector(selectSearchOpen);

  const location = useLocation();

  const isServerRoute = /^\/server\/[^/]+$/.test(location.pathname);

  return (
    <nav className={styles.navbar}>
      {/* Search Input */}
      <h2>{isServerRoute ? "" : "BUBBLE"}</h2>
      {/* Dynamic Buttons */}
      <div className={styles.buttonGroup}>
        {isServerRoute && <></>}
        <IconButton onClick={() => {dispatch(toggleOpenSearch(true))}} Icon={<SearchIcon />} position="bottom" title={"Search"} />
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
