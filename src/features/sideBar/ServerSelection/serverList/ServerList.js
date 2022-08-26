// library's
import React from 'react';
import { motion } from 'framer-motion';

// component's
import { ServerButton } from '../../../../components/buttons/ServerButton/ServerButton';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';

// style's
import "./ServerList.css";
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';


export const ServerList = ({selectServer, serverList = [], loading = false, animation, noresults = "No Joined Servers"}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <motion.div animate={animation} className='server-list-container'>
            {
            serverList.length === 0 ?
            <p 
            style={{color: textColor}}
            className='no-joined-servers'>{noresults}</p>
            : serverList.map(servers => {
                return <ServerButton action={selectServer} key={servers._id} {...servers} />
            })
            }
            <Loading loading={loading} />
        </motion.div>
    )
}
