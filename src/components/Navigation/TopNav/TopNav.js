
import styles from "./TopNav.module.css";
import IconButton from "../../ui/Buttons/IconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { selectServerName } from "../../../features/ServerDetails/serverDetailsSlice";

import { Bell, Ellipsis, LayoutDashboard, Menu, Settings2, UsersRound, UserX, X } from "lucide-react";
import { Route, Routes } from "react-router";
import { SearchButton } from "./SearchButton/SearchButton";
import ChannelHeader from "../../Headers/ChannelHeader/ChannelHeader";
import { setFilter, setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from "../../../features/Search/searchSlice";
import { globalSearch } from "../../../features/Search/Thunks/globalSearch";
import { toggleMobileMenu } from "../../../features/Mobile/mobileSlice";
import { Logo } from "../../Icons/Bubble/Logo";
import { triggerContext } from "../../../lib/services/helperFunctions";
import { toggleAppearanceSetting } from "../../../features/Settings/Appearance/appearanceSlice";
import MetaTags from "../../MetaTags/MetaTags";
import { setChannelDescription } from "../../../features/Channel/ChannelDescription/channelDescriptionSlice";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const serverName = useSelector(selectServerName);

  const isServerRoute = useSelector(state => state.serverDetailsSlice.server_id);

  const {isUserMenuOpen, isChannelMenuOpen, isServerMenuOpen} = useSelector(state => state.mobileSlice);

  const {details} = useSelector(state => state.serverDetailsSlice);

  const hideUsers = useSelector(state => state.appearanceSlice.hideUsers);

  const {currentChannel} = useSelector(state => state.channelsSlice);

  const {currentTextChannel} = useSelector(state => state.textChannelSlice);

  const channelDetails = useSelector(state => state.channelsSlice.channels.find(channel => channel?.channel_id === (currentTextChannel || currentChannel?.channel_id)));

  const handleOpenSearch = () => {

    if (channelDetails?.channel_type === 'text') {

      dispatch(setSelectedChannelToFilter(channelDetails));

      dispatch(setFilter({path: 'text-channel'}));
    
    }

    dispatch(setOverlay('search'));
  }

  const handleOpenPins = () => {

    dispatch(setSelectedChannelToFilter(channelDetails));

    dispatch(setFilter({path: 'text-channel'}));

    dispatch(setTextChannelFilter({isPinned: true, hasImage: false, hasVideo: false, hasLink: false}));

    dispatch(setFromDate(null));

    dispatch(globalSearch());

    dispatch(setOverlay('search'));
  }

  const openMobileMenu = (e) => {
    if (isUserMenuOpen) {
      dispatch(toggleMobileMenu('isUserMenuOpen'))
    } else {
      triggerContext(e, 'mobile-ctx-menu');
    }

  }

  const expandChannelDescription = () => {
    if (channelDetails) {

      dispatch(setChannelDescription(channelDetails));

      dispatch(setOverlay('channelDescription'));
    }
  }

  const openWidgets = () => {
    dispatch(setOverlay('widgets'));
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.buttonGroup}>
        <div className={styles.mobileButton}>
          <IconButton 
          Icon={isServerMenuOpen ? <X color="var(--text-color)" /> : <Logo />}
          onClick={() => {dispatch(toggleMobileMenu('isServerMenuOpen'))}}
          />
        </div>
        <div className={styles.mobileButton}>
        <IconButton
        Icon={isChannelMenuOpen ? <X color="var(--text-color)" /> : <Menu color="var(--text-color)" />}
        onClick={() => {dispatch(toggleMobileMenu("isChannelMenuOpen"))}}
        />
        </div>
        <div className={`${styles.header} ${styles.hideOnMobile}`}>
          <h2>{serverName}</h2>
          {isServerRoute ?
          <IconButton Icon={<Settings2 color={"var(--text-color)"} />} position="bottom" title={`Settings`} onClick={() => {dispatch(setOverlay('serverSettings'))}} />
          : null}
        </div>
      </div>
      {/* Dynamic Buttons */}
      <div className={styles.serverButtons}>
      {isServerRoute && (
        <Routes>
          <Route path="/server/:serverID/channel/:channelID" element={
            <>
            <ChannelHeader {...channelDetails} expandDescription={expandChannelDescription} />
            
            </>
          } />
        </Routes>
      )}
      </div>
      <div className={`${styles.buttonGroup} ${styles.navButtons} ${styles.hideOnMobile}`}>
        {channelDetails && (
        <IconButton 
        Icon={<LayoutDashboard color="var(--text-color)" />}
        title={"Widgets"}
        position="bottom"
        onClick={openWidgets}
        />
        )}
        <IconButton
          Icon={<Bell color="var(--text-color)" />}
          position="bottom"
          title={"Notifications"}
        />
        <IconButton
        Icon={hideUsers ? <UserX color="var(--text-color)" /> : <UsersRound color="var(--text-color)" />}
        position="bottom"
        title={hideUsers ? "Show Users" : "Hide Users"}
        className={styles.desktopUserButton}
        onClick={() => {dispatch(toggleAppearanceSetting('hideUsers'))}}
        />
        <SearchButton onClick={handleOpenSearch} />
        {/* Notifications Button */}
      </div>
      <div id="mobile-ctx-menu" data-context={JSON.stringify({type: 'mobileMenu'})} className={styles.mobileMenuOptions}>
          <SearchButton onClick={handleOpenSearch} />
          <IconButton 
          Icon={isUserMenuOpen ? <X color="var(--text-color)" /> : <Ellipsis color="var(--text-color)" />}
          onClick={openMobileMenu}
          />
      </div>
      <MetaTags 
      title={`${channelDetails?.channel_name ? "#" + channelDetails?.channel_name + " | " + details.server_name : details.server_name ? details.server_name : "Bubble"}` || 'Bubble'} 
      description={channelDetails?.channel_description || details.welcome_message}  
      image={channelDetails?.channel_background || details.server_banner}
      />
    </nav>
  );
};

export default TopNav;
