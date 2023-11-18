// library's
import React from 'react';
import { Reorder, motion } from 'framer-motion';

// component's
import { ServerButton } from '../../../../components/buttons/ServerButton/ServerButton';

import { BubbleLogo } from '../../../../components/Icons/bubbleLogo/BubbleLogo'
// style's
import "./ServerList.css";
import { CreateServerButton } from '../../../createServer/createServerButton/CreateServerButton';
import { SavedMediaButton } from '../../../../components/buttons/SavedMediaButton/SavedMediaButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ProfileButton } from '../../../../components/buttons/ProfileButton/ProfileButton';
import { MessagesNavigation } from '../../../Messages/MessagesNavigation';
import { selectCurrentChannelId } from '../../../server/ServerSlice';
import { reOrderServers } from '../../sideBarSlice';

export const ServerList = ({selectServer, serverList = [], loading = false, animation, noresults = "No Joined Servers"}) => {

    const dispatch = useDispatch();

    const [localServerList, setLocalServerList] = React.useState([])

    React.useEffect(() => {
        setLocalServerList(serverList);
    }, [serverList])

    const color = useSelector(selectTextColor);

    const channel = useSelector(selectCurrentChannelId);

    let timeout;

    const handleReorder = (value) => {
        clearTimeout(timeout);

        const sortOrder = value.map(s => s._id);

        let servers = [...localServerList];

        servers.sort((a, b) => {
            return sortOrder.indexOf(a._id) - sortOrder.indexOf(b._id);
        })

        setLocalServerList(servers)
    }

    const confirmOrder = () => {
        dispatch(reOrderServers({newOrder: localServerList}));
    }

    return (
        <motion.div style={{maxHeight: channel ? 'calc(100% - 175px)' : 'calc(100% - 72px)'}} animate={animation} className='server-list-container'>
            <BubbleLogo />
            <Reorder.Group style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }} as='div'  onReorder={handleReorder} axis='y' values={localServerList}>
                
            {localServerList.map(servers => {
                return (
                <Reorder.Item 
                style={{flexShrink: 0}}
                onDragEnd={confirmOrder} as='div' dragMomentum={false} transition={{duration: 0.2}} value={servers} key={servers._id} >
                <ServerButton action={selectServer} key={servers._id} {...servers} />
                </Reorder.Item>
                )
            })}
            
            </Reorder.Group>
            <MessagesNavigation />
            <div style={{backgroundColor: color}} className="application-navigation-spacer"></div>
            <ProfileButton />
            <SavedMediaButton />
            <CreateServerButton />
            <div className='server-select-nav-bottom-spacer'></div>
        </motion.div>
    )
}
