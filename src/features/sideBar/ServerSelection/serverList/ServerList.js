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

export const ServerList = ({selectServer, serverList = [], loading = false, animation, noresults = "No Joined Servers"}) => {

    return (
        <motion.div animate={animation} className='server-list-container'>
            <BubbleLogo />
            {serverList.map(servers => {
                return <ServerButton action={selectServer} key={servers._id} {...servers} />
            })}
            <CreateServerButton />
            <Loading loading={loading} error={serverList.length === 0} />
        </motion.div>
    )
}
