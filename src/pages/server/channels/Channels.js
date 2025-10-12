
import styles from './Channels.module.css';
import { ChannelsProvider } from '../../../providers/ChannelsProvider/ChannelsProvider';
import { ReOrderChannels } from './ReOrderChannels/ReOrderChannels';

export const Channels = ({currentChannel}) => {

    return (
        <>
        <div 
        id='channel-list-container'
        className={styles.container}
        style={{
            maxHeight: currentChannel?.channel_type === 'voice' ? "calc(100vh - 242px)" : null
        }}
        >
             <div className={styles.wrapper}>
                
                <ChannelsProvider>
                    <ReOrderChannels />
                </ChannelsProvider>
            </div>
        </div>
        </>
    )
}
