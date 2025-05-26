import React from 'react';

import styles from './Server.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ServerButton } from '../../../../components/ui/Buttons/ServerButton/ServerButton';
import { useNavigate } from 'react-router';
import { toggleMobileMenu } from '../../../../features/Mobile/mobileSlice';

export const Servers = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {servers }= useSelector(state => state.serversSlice);

    const [history, setHistory] = React.useState({});

    const {server_id: currentServer} = useSelector(state => state.serverDetailsSlice);

    const {isServerMenuOpen} = useSelector(state => state.mobileSlice);

    const handleCloseMobileMenu = () => {
        if (isServerMenuOpen) {
            
            dispatch(toggleMobileMenu('isServerMenuOpen'));
            
        }
    }

    const handleSwitchServer = (server_id) => {
    
            if (currentServer) {
                setHistory(prev => ({
                    ...prev,
                    [currentServer]: window.location.pathname
                }))
    
                console.log(window.location.pathname)
            }
    
            handleCloseMobileMenu();
    
            if (history[server_id]) {
    
                navigate(history[server_id]);
    
            } else {
    
                navigate(`/dashboard/server/${server_id}`);
    
            }
    
    }

    return (
        <div 
        style={{
            top: window?.electron?.ipcRenderer ? 62 : null,
            height: window?.electron?.ipcRenderer ? 'calc(100% - 205px)' : null
        }}
        className={styles.serverButtons}>
            {servers.map(s => {
                return <ServerButton action={handleSwitchServer} key={s.server_id} {...s} />
            })}
        </div>
    )
}
