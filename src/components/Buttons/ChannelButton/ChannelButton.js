import React from "react";
import { motion } from "framer-motion";
import styles from "./ChannelButton.module.css";
import { Ellipsis, Hash, TextQuote, Volume1 } from "lucide-react";
import { ImageComponent } from "../../Image/Image";
import { useNavigate, useParams } from "react-router";
import { ChannelUserButton } from "../ChannelUserButton/ChannelUserButton";
import IconButton from "../IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";

const ChannelButton = ({ users = [], channel_name, channel_icon, channel_id, channel_type, server_id}) => {

    const dispatch = useDispatch();

    const [active, toggleActive] = React.useState(false);

    const [hover, toggleHover] = React.useState(false);

    const {currentChannel} = useSelector(state => state.channelsSlice);

    const navigate = useNavigate();

    const { channelID } = useParams();

    const openChannel = () => {

        if (currentChannel?.channel_type === 'voice' && channel_type === 'text') {

            
        
        }

        if (active) {

            if (channel_type === 'text') {
                navigate(`/dashboard/server/${server_id}`);
            }

        } else {
            navigate(`/dashboard/server/${server_id}/channel/${channel_id}`);
        }
        
    }

    React.useEffect(() => {

        if (channelID === channel_id) {
            toggleActive(true);
        } else {
            toggleActive(false);
        }

    }, [channelID, channel_id])

    const openContext = (e) => {
       const element = document.getElementById(channel_id);

       const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: e.clientX, // Set X position
        clientY: e.clientY, // Set Y position
      });
      
      element.dispatchEvent(event);

    }

    return (
        <div 
        data-context={JSON.stringify({channel_name, channel_icon, channel_id, channel_type, server_id, type: 'channel', active})}
        id={channel_id} 
        style={{
            backgroundColor: users.length > 0 ? 'var(--card-background-color)' : 'transparent'
        }}
        className={styles.channelContainer}>
            <div 
                onClick={openChannel}
                className={`${styles.channelButton} ${active ? styles.active : ''}`} 
            onMouseEnter={() => {toggleHover(true)}}
            onMouseLeave={() => {toggleHover(false)}}
            >
                <span className={styles.icon}>
                    {channel_icon ?
                    <ImageComponent src={channel_icon} />
                    : channel_type === 'text' ?
                    <Hash color="var(--text-color)" style={{marginLeft: '-5px'}} width={'100%'} height={'100%'} />
                    : channel_type === 'thread' ?
                    <TextQuote />
                    :
                    <Volume1 width={'100%'} height={'100%'} />}
                </span>
                <span className={styles.channelName}>{channel_name}</span>
                {hover ?
                <div className={styles.subButtonWrapper}>
                <IconButton 
                onClick={openContext}
                Icon={<Ellipsis color="var(--text-color)"/>}
                title={"more"}
                position="top"
                width={25}
                height={25}
                backgroundHover="var(--background-color)"
                />
                </div>
                : null}
            </div>

            {users.length > 0 && (
                <motion.div 
                    className={styles.userList} 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                >
                    {users.map((user) => (
                       <ChannelUserButton active={active} key={user} user_id={user} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default ChannelButton;
