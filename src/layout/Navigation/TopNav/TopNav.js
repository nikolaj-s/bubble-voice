
import styles from "./TopNav.module.css";
import IconButton from "../../../components/ui/Buttons/IconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { selectServerName } from "../../../features/ServerDetails/serverDetailsSlice";

import { Ellipsis, LayoutDashboard, Menu, Settings2, X } from "lucide-react";
import { Route, Routes } from "react-router";
import { SearchButton } from "./SearchButton/SearchButton";
import ChannelHeader from "../../../components/Headers/ChannelHeader/ChannelHeader";
import { setFilter, setSelectedChannelToFilter} from "../../../features/Search/searchSlice";
import { toggleMobileMenu } from "../../../features/Mobile/mobileSlice";
import { Logo } from "../../../components/Icons/Bubble/Logo";
import { triggerContext } from "../../../lib/services/helperFunctions";
import MetaTags from "../../../components/MetaTags/MetaTags";
import { NotificationButton } from "./NotificationButton/NotificationButton";
import { useChannelMethods } from "../../../hooks/useChannelMethods";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const serverName = useSelector(selectServerName);

  const isServerRoute = useSelector(state => state.serverDetailsSlice.server_id);

  const {isUserMenuOpen, isChannelMenuOpen, isServerMenuOpen} = useSelector(state => state.mobileSlice);

  const {details} = useSelector(state => state.serverDetailsSlice);

  const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

  const {currentTextChannel} = useSelector(state => state.textChannelSlice);

  const channelDetails = useSelector(state => state.channelsSlice.channels[currentTextChannel || currentVoiceChannel]);

  const {viewChannelDescription, viewWidgets} = useChannelMethods();

  const handleOpenSearch = () => {

    if (channelDetails?.channel_type === 'text') {

      dispatch(setSelectedChannelToFilter(channelDetails));

      dispatch(setFilter({path: 'text-channel'}));
    
    }

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
    viewChannelDescription(channelDetails);
  }

  const openWidgets = () => {

    viewWidgets(currentTextChannel || currentVoiceChannel);

  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.buttonGroup}>
        <div className={styles.mobileButton}>
          <IconButton 
          width={40}
          height={40}
          Icon={isServerMenuOpen ? <X color="var(--text-color)" /> : <Logo />}
          onClick={() => {dispatch(toggleMobileMenu('isServerMenuOpen'))}}
          />
        </div>
        <div className={styles.mobileButton}>
        <IconButton
        width={40}
        height={40}
        Icon={isChannelMenuOpen ? <X color="var(--text-color)" /> : <Menu color="var(--text-color)" />}
        onClick={() => {dispatch(toggleMobileMenu("isChannelMenuOpen"))}}
        />
        </div>
        <div className={`${styles.header} ${styles.hideOnMobile}`}>
          <h2>{serverName || "Dashboard"}</h2>
          {isServerRoute ?
          <IconButton Icon={<Settings2 color={"var(--text-color)"} />} position="bottom" title={`Bubble Options`} onClick={() => {dispatch(setOverlay('serverSettings'))}} />
          : null}
        </div>
      </div>
      {/* Dynamic Buttons */}
      <div className={styles.serverButtons}>
      {currentVoiceChannel ?
      <ChannelHeader {...channelDetails} expandDescription={expandChannelDescription} /> :
      isServerRoute ? (
        <Routes>
          <Route path="/server/:serverID/channel/:channelID" element={
            <>
            <ChannelHeader {...channelDetails} expandDescription={expandChannelDescription} />
            
            </>
          } />
        </Routes>
      ): null}
      </div>
      <div id='application-sub-menu' data-context={JSON.stringify({type: "appSubmenu"})} className={`${styles.buttonGroup} ${styles.navButtons} ${styles.hideOnMobile}`}>
        {channelDetails && (
        <IconButton 
        Icon={<LayoutDashboard color="var(--text-color)" />}
        title={"Widgets"}
        position="bottom"
        onClick={openWidgets}
        />
        )}
        <NotificationButton />
        <SearchButton onClick={handleOpenSearch} />
        {/* Notifications Button */}
        <IconButton 
        Icon={<Ellipsis color="var(--text-color)" />}
        title={'More'}
        onClick={(e) => {triggerContext(e, 'application-sub-menu')}}
        position="bottom"
        />
      </div>
      <div id="mobile-ctx-menu" data-context={JSON.stringify({type: 'mobileMenu'})} className={styles.mobileMenuOptions}>
          <SearchButton onClick={handleOpenSearch} />
          <IconButton
          height={40}
          width={40} 
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
