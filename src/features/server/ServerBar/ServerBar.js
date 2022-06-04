// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';

// style's
import "./ServerBar.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchServerDetails, selectLoadingServerDetailsState, selectServer, selectServerName } from '../ServerSlice';
import { ServerBanner } from '../../../components/serverBanner/ServerBanner';
import { LoadingSpinner } from '../../../components/LoadingComponents/LoadingSpinner/LoadingSpinner';
import { setHeaderTitle } from '../../contentScreen/contentScreenSlice';
import { setSideBarHeader } from '../../sideBar/sideBarSlice';
import { ChannelList } from './ChannelList/ChannelList';


export const ServerBar = () => {

    const dispatch = useDispatch();

    const animation = useAnimation();

    const serverName = useSelector(selectServerName);

    const server = useSelector(selectServer);

    const loading = useSelector(selectLoadingServerDetailsState);

    React.useEffect(() => {
        animation.start({
            left: '0%',
            opacity: 1
        })

        dispatch(setHeaderTitle('Select Channel'));
        dispatch(setSideBarHeader(""))
        dispatch(fetchServerDetails());

    }, [])

    return (
        <motion.div initial={{left: "100%", opacity: 0}} animate={animation} className='server-bar-container'>
            {loading ? <LoadingSpinner /> :
            <>
            <ServerBanner serverImage={server.server_banner_image} serverName={serverName} />
            <ChannelList />
            </>
            }
        </motion.div>
    )
}
