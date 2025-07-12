import React from "react";
import { motion } from "framer-motion";
import styles from "./ChannelButton.module.css";
import { Ellipsis, Hash, Lock, TextQuote, Volume1, VolumeX } from "lucide-react";
import { ImageComponent } from "../../../ui/Image/Image";
import { useNavigate } from "react-router";
import { ChannelUserButton } from "../ChannelUserButton/ChannelUserButton";
import IconButton from "../IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { triggerContext } from "../../../../lib/services/helperFunctions";

import { toggleMobileMenu } from "../../../../features/Mobile/mobileSlice";

import { setUserProfile } from "../../../../features/UserProfile/userProfileSlice";

import { setOverlay } from "../../../../features/Overlay/overlaySlice";

import { ChannelStatus } from "./ChannelStatus/ChannelStatus";

import { setCurrentVoiceChannel, setVoiceChannelFocused } from "../../../../features/Channel/VoiceChannel/voiceChannelSlice";

import { NavButton } from "../NavButton/NavButton";

const ChannelButton = ({ users = [], channel_name, channel_icon, channel_id, channel_type, server_id, channel }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
  
    const { currentVoiceChannel } = useSelector(state => state.voiceChannelSlice);

    const { currentTextChannel } = useSelector(state => state.textChannelSlice);

    const { isChannelMenuOpen } = useSelector(state => state.mobileSlice);

    const { hideCustomChannelIcons } = useSelector(state => state.appearanceSlice);
  
    const [active, toggleActive] = React.useState(false);
  
    const openChannel = () => {

      if (isChannelMenuOpen) dispatch(toggleMobileMenu('isChannelMenuOpen'));
      
      dispatch(setVoiceChannelFocused((channel_id === currentVoiceChannel)));

      if (active && channel_type === 'text') {

      //  navigate(`/dashboard/server/${server_id}`);

        if (currentVoiceChannel) dispatch(setVoiceChannelFocused(true));

      } else if (channel_type === 'voice') {
        
          if (currentVoiceChannel !== channel_id) dispatch(setCurrentVoiceChannel(null));

          if (active) {

            navigate(`/dashboard/server/${server_id}`);

          } else {

            if (!currentTextChannel) dispatch(setVoiceChannelFocused(true));

            dispatch(setCurrentVoiceChannel(channel_id));
          }
      } else {
        navigate(`/dashboard/server/${server_id}/channel/${channel_id}`);
      }
      
    };

    React.useEffect(() => {

      toggleActive(currentVoiceChannel === channel_id || currentTextChannel === channel_id);
      
    }, [channel_id, currentTextChannel, currentVoiceChannel]);
  
    const openContext = (e) => {
      e.stopPropagation();
      triggerContext(e, channel_id);
    };

    const viewUserProfile = (user) => {
      dispatch(setUserProfile(user));

      dispatch(setOverlay('userProfile'));
    }
  
    return (
      <div
        data-context={JSON.stringify({ ...channel, type: 'channel', active })}
        id={channel_id}
        style={{ backgroundColor: users.length > 0 ? 'var(--card-background-color)' : 'transparent' }}
        className={`${styles.channelContainer} ${active ? styles.active : ''}`}
      >
      {channel.locked_channel && (<Lock style={{position: 'absolute', top: 5, left: 5}} color="var(--text-color)" size={12} strokeWidth={3} />)}
       <NavButton 
       icon=
        {channel_icon && !hideCustomChannelIcons ? (
              <ImageComponent src={channel_icon} draggable={false} />
            ) : channel_type === 'text' ? (
              <Hash color="var(--text-color)" style={{ marginLeft: '-5px' }} width="100%" height="100%" draggable={false} />
            ) : channel_type === 'thread' ? (
              <TextQuote />
            ) : channel?.disable_streams ?
            (
              <VolumeX color="var(--text-color)" />
            )
            : (
              <Volume1 color="var(--text-color)" width="100%" height="100%" draggable={false} />
          )}
          name={channel_name}
          action={openChannel}
          active={active}
       />
        <div className={styles.subButtonWrapper}>
          <IconButton
            onClick={openContext}
            Icon={<Ellipsis color="var(--text-color)"/>}
            title="Channel Options"
            position="top"
            width={25}
            height={25}
            backgroundHover="var(--background-color)"
          />
        </div>
        
        {users.length > 0 && (
          <motion.div
            className={styles.userList}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ChannelStatus channel={channel} active={active} />
            {users.map((user) => (
              <ChannelUserButton action={viewUserProfile} active={active} key={user} user_id={user} />
            ))}
          </motion.div>
        )}
      </div>
    );
  };
  
  export default ChannelButton