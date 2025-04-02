import React from "react";
import { motion } from "framer-motion";
import styles from "./ChannelButton.module.css";
import { Ellipsis, Hash, TextQuote, Volume1 } from "lucide-react";
import { ImageComponent } from "../../../ui/Image/Image";
import { useNavigate, useParams } from "react-router";
import { ChannelUserButton } from "../ChannelUserButton/ChannelUserButton";
import IconButton from "../IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTextChannel } from "../../../../features/TextChannel/textChannelSlice";
import { triggerContext } from "../../../../lib/services/helperFunctions";

const ChannelButton = ({ users = [], channel_name, channel_icon, channel_id, channel_type, server_id, channel}) => {

    const dispatch = useDispatch();

    const [active, toggleActive] = React.useState(false);

    const [hover, toggleHover] = React.useState(false);

    const {currentChannel} = useSelector(state => state.channelsSlice);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice)

    const navigate = useNavigate();

    const { channelID } = useParams();

    const openChannel = () => {

        if (currentChannel?.channel_type === 'voice' && channel_type === 'text') {

            if (channel_id === currentTextChannel) {
                dispatch(setCurrentTextChannel(null))
            } else {
                dispatch(setCurrentTextChannel(channel_id))
            }
        
        } else {
            if (active) {

                if (channel_type === 'text') {
                    navigate(`/dashboard/server/${server_id}`);
                }
    
            } else {
                navigate(`/dashboard/server/${server_id}/channel/${channel_id}`);
            }
        }

       
        
    }

    React.useEffect(() => {

        if (channelID === channel_id || channel_id === currentTextChannel) {
            toggleActive(true);
        } else {
            toggleActive(false);
        }

    }, [channelID, channel_id, currentTextChannel])

    const openContext = (e) => {
        
        triggerContext(e, channel_id);

    }

    return (
        <div 
        data-context={JSON.stringify({...channel, type: 'channel', active})}
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
                position="left"
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
