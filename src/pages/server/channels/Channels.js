import React from 'react';

import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';
import { Calendar, Home, Newspaper } from 'lucide-react';
import { useSelector } from 'react-redux';
import { SubNav } from '../../../layout/Navigation/SubNav/SubNav';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { useNavigate } from 'react-router';
import { ServerNav } from '../../../layout/Navigation/ServerNav/ServerNav';

export const Channels = ({currentChannel}) => {

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    return (
        <div 
        id='channel-list-container'
        data-context={JSON.stringify({createChannel: true, createCategory: true, type: "channelList"})} 
        className={styles.container}
        style={{
            maxHeight: currentChannel?.channel_type === 'voice' ? "calc(100vh - 242px)" : null
        }}
        >
             <div className={styles.wrapper}>
                <ServerNav />
                <ChannelsProvider>
                    <ReOrderChannels />
                </ChannelsProvider>
            </div>
        </div>
    )
}
