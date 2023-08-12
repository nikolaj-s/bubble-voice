// library's
import React from 'react';
import { motion } from 'framer-motion';

// component's
import { ServerButton } from '../../../../components/buttons/ServerButton/ServerButton';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { BubbleLogo } from '../../../../components/Icons/bubbleLogo/BubbleLogo'
// style's
import "./ServerList.css";
import { CreateServerButton } from '../../../createServer/createServerButton/CreateServerButton';
import { SavedMediaButton } from '../../../../components/buttons/SavedMediaButton/SavedMediaButton';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ProfileButton } from '../../../../components/buttons/ProfileButton/ProfileButton';
import { MessagesNavigation } from '../../../Messages/MessagesNavigation';
import { selectCurrentChannelId } from '../../../server/ServerSlice';

export const ServerList = ({selectServer, serverList = [], loading = false, animation, noresults = "No Joined Servers"}) => {

    const color = useSelector(selectTextColor);

    const channel = useSelector(selectCurrentChannelId);

    return (
        <motion.div style={{maxHeight: channel ? 'calc(100% - 222px)' : 'calc(100% - 130px)'}} animate={animation} className='server-list-container'>
            <BubbleLogo />
            {serverList.map(servers => {
                return <ServerButton action={selectServer} key={servers._id} {...servers} />
            })}
            <MessagesNavigation />
            <div style={{backgroundColor: color}} className="application-navigation-spacer"></div>
            <ProfileButton />
            <SavedMediaButton />
            <CreateServerButton />
            <div className='server-select-nav-bottom-spacer'></div>
        </motion.div>
    )
}
