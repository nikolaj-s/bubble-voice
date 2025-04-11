import React from 'react';

import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';
import { Calendar, Home, Newspaper } from 'lucide-react';
import { useSelector } from 'react-redux';
import { SubNav } from '../../../components/Navigation/SubNav/SubNav';

export const Channels = ({currentChannel}) => {

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const basePath = `/dashboard/server/${server_id}`

    const options = [
        {
          label: 'Dashboard',
          // Dashboard route: "/dashboard/Sub/:SubID/"
          path: `${basePath}/`,
          icon: <Home className={styles.icon} size={20} />
        },
        {
          label: 'Events',
          // Events route: "/dashboard/Sub/:SubID/events"
          path: `${basePath}/events`,
          icon: <Calendar className={styles.icon} size={20}/>
        },
        {
          label: 'Activity',
          // Activity route: "/dashboard/Sub/:SubID/activity"
          path: `${basePath}/activity`,
          icon: <Newspaper className={styles.icon} size={20} />
        }
      ];
    

    return (
        <div 
        data-context={JSON.stringify({createChannel: true, createCategory: true, type: "channelList"})} 
        className={styles.container}
        style={{
            maxHeight: currentChannel?.channel_type === 'voice' ? "calc(100vh - 242px)" : null
        }}
        >
             <div className={styles.wrapper}>
                <SubNav 
                options={options}
                basePath={basePath}
                />
                <ChannelsProvider>
                    <ReOrderChannels />
                </ChannelsProvider>
            </div>
        </div>
    )
}
