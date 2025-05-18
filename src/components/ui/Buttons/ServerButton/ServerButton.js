// Libraries
import React from 'react';

// Styles
import styles from './ServerButton.module.css';
import { ImageComponent } from '../../../ui/Image/Image';
import IconButton from '../IconButton/IconButton';
import { useSelector } from 'react-redux';

export const ServerButton = ({ action, server_banner, server_name, server_id }) => {
    
    const [isActive, setIsActive] = React.useState(false);

    const currentServer = useSelector(state => state.serverDetailsSlice.server_id);

    React.useEffect(() => {

        setIsActive(currentServer === server_id);

    }, [currentServer, server_id]);

    const handleAction = () => {
        action(server_id);
    }

    return (
        <IconButton 
        backgroundColor={isActive ? 'var(--accent-color)' : 'var(--background-color)'}
        onClick={handleAction}
        width={45}
        height={45}
        padding={5}
        position='right'
        title={
            <p style={{
                padding: 5,
                margin: 0,
                fontSize: '14px'
            }}>
                {server_name}
            </p>
        }
        Icon={
        <div
        className={`${styles['server-button-image-container']}`}
        >
            <ImageComponent src={server_banner} />
        </div>
        }
        />
       
    );
};


