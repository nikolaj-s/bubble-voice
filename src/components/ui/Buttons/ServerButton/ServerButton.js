// Libraries
import React from 'react';

// Styles
import styles from './ServerButton.module.css';
import { ImageComponent } from '../../../ui/Image/Image';
import IconButton from '../IconButton/IconButton';
import { useSelector } from 'react-redux';
import { Volume2 } from 'lucide-react';
import { MiniUserPreview } from '../../MiniUserPreview/MiniUserPreview';

export const ServerButton = ({ action, server_banner, server_name, server_id, active_users = [] }) => {
    
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
            <IconButton 
            backgroundColor={isActive ? 'var(--accent-color)' : 'var(--background-color)'}
            onClick={handleAction}
            width={50}
            height={50}
            padding={2}
            position='right'
            title={
                <>
                <p style={{
                    padding: 5,
                    margin: 0,
                    fontSize: '14px'
                }}>
                    {server_name}
                </p>
                {active_users && (<MiniUserPreview users={active_users} />)}
                </>
            }
            Icon={
            <div 
            className={`${styles['server-button-image-container']}`}
            >
                <ImageComponent src={server_banner} />
                {active_users.length > 0 && (
                <div className={styles.activeUsersIndicator} >
                    <Volume2 color='var(--text-color)' />
                </div>)}
            </div>
            }
            />
            
        </div>
       
    );
};


