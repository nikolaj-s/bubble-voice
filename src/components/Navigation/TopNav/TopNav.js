
import styles from "./TopNav.module.css";
import IconButton from "../../ui/Buttons/IconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../features/Overlay/overlaySlice";
import { selectServerName } from "../../../features/ServerDetails/serverDetailsSlice";

import { Bell, Pin, Settings2, UsersRound } from "lucide-react";
import { Route, Routes } from "react-router";
import { SearchButton } from "./SearchButton/SearchButton";
import ChannelHeader from "../../Headers/ChannelHeader/ChannelHeader";
import { setFilter, setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from "../../../features/Search/searchSlice";
import { globalSearch } from "../../../features/Search/Thunks/globalSearch";

const TopNav = () => {
  
  const dispatch = useDispatch();

  const serverName = useSelector(selectServerName);

  const isServerRoute = useSelector(state => state.serverDetailsSlice.server_id);

  const { hideUsers } = useSelector(state => state.appearanceSlice);

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        <h2>{serverName || "BUBBLE"}</h2>
        {isServerRoute ?
        <IconButton Icon={<Settings2 color={"var(--text-color)"} />} position="bottom" title={`${serverName} Settings`} onClick={() => {dispatch(setOverlay('serverSettings'))}} />
        : null}
      </div>
  
      {/* Dynamic Buttons */}
      <div className={styles.serverButtons}>
      {isServerRoute && (
        <Routes>
          <Route path="/server/:serverID/channel/:channelID" element={
            <>
            <ChannelHeader {...channelDetails} />
            {channelDetails?.channel_type === 'text' && 
            <IconButton 
            Icon={<Pin color="var(--text-color)" />}
            title={"Pinned Messages"}
            position="bottom"
            margin={"0 2px 0 0"}
            onClick={handleOpenPins}
            />
            }
            </>
          } />
        </Routes>
      )}
      </div>
      <div className={styles.buttonGroup}>
        <SearchButton onClick={handleOpenSearch} />
        <IconButton
          Icon={<Bell color="var(--text-color)" />}
          position="bottom"
          title={"Notifications"}
        />
        <IconButton
        Icon={<UsersRound color="var(--text-color)" />}
        position="bottom"
        title={"Hide Users"}
        />
        {/* Notifications Button */}
      </div>
    </nav>
  );
};

export default TopNav;
