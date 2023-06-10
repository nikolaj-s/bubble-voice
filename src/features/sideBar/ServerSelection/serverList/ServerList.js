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
import { ExploreButton } from '../../../../components/buttons/ExploreButton/ExploreButton';
import { MessagesNavigation } from '../../../Messages/MessagesNavigation';

export const ServerList = ({selectServer, serverList = [], loading = false, animation, noresults = "No Joined Servers"}) => {

    const color = useSelector(selectTextColor);

    return (
        <motion.div animate={animation} className='server-list-container'>
            <BubbleLogo />
            {serverList.map(servers => {
                return <ServerButton action={selectServer} key={servers._id} {...servers} />
            })}
            <MessagesNavigation />
            <div style={{backgroundColor: color}} className="application-navigation-spacer"></div>
            <ProfileButton />
            <ExploreButton />
            <SavedMediaButton />
            <CreateServerButton />
            <Loading loading={loading} error={serverList.length === 0} />
            <div className='server-select-nav-bottom-spacer'></div>
        </motion.div>
    )
}
