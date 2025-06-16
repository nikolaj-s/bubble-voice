// Libraries
import React from 'react';

// Styles
import styles from './ServerButton.module.css';
import { ImageComponent } from '../../../ui/Image/Image';
import IconButton from '../IconButton/IconButton';
import { useSelector } from 'react-redux';
import { AlertIndicator } from '../../AlertIndicator/AlertIndicator';
import ServerActivityIndicator from '../../ServerActivityIndicator/ServerActivityIndicator';
import { ServerPreview } from './ServerPreview/ServerPreview';

export const ServerButton = ({ action, server_banner, server_name, server_id, active_users = [], unread_message}) => {
    
    const [isActive, setIsActive] = React.useState(false);

    const currentServer = useSelector(state => state.serverDetailsSlice.server_id);

    React.useEffect(() => {

        setIsActive(currentServer === server_id);

    }, [currentServer, server_id]);

    const handleAction = () => {
        action(server_id);
    }

    return (
        <div style={{position: 'relative'}}>
            <AlertIndicator active={unread_message} />
            <IconButton 
            backgroundColor={isActive ? 'var(--accent-color)' : 'var(--background-color)'}
            onClick={handleAction}
            width={50}
            height={50}
            padding={2}
            position='right'
            title={
                <ServerPreview server_banner={server_banner} server_name={server_name} active_users={active_users} />
            }
            Icon={
            <div 
            className={`${styles['server-button-image-container']}`}
            >
                <ImageComponent src={server_banner} />
                {active_users.length > 0 && (
                <ServerActivityIndicator />)}
            </div>
            }
            />
            
        </div>
       
    );
};


