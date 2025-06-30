import React from 'react'
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar'
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton'
import { Ellipsis, Home, Newspaper } from 'lucide-react'
import { triggerContext } from '../../../lib/services/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toggleMobileMenu } from '../../../features/Mobile/mobileSlice'
import { setVoiceChannelFocused } from '../../../features/Channel/VoiceChannel/voiceChannelSlice'

export const ServerNav = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const {focused} = useSelector(state => state.voiceChannelSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const basePath = `/dashboard/server/${server_id}`;

    const normalizePath = (path) => path.replace(/\/+$/, '');

    const currentPath = normalizePath(location.pathname);

    const handleNavigate = (path) => {
        dispatch(toggleMobileMenu());

        dispatch(setVoiceChannelFocused(false));

        navigate(`${basePath}${path}`);
    }

    return (
        <ToolBar style={{flexWrap: 'nowrap', maxWidth: '100%'}}>
            <IconButton
            Icon={Home}
            title={'Dashboard'}
            onClick={() => {handleNavigate('/')}}
            backgroundColor={currentPath === `${basePath}` && !focused ? 'var(--button-hover)' : null}
            />
            <IconButton 
            Icon={Newspaper}
            title={'Activity'}
            onClick={() => {handleNavigate('/activity')}}
            backgroundColor={currentPath === `${basePath}/activity` && !focused ? 'var(--button-hover)' : null}
            />
            <div style={{width: '100%'}} />
            <IconButton 
            Icon={Ellipsis}
            title={'More'}
            onClick={(e) => {triggerContext(e, 'channel-list-container')}}
            />
        </ToolBar>
    )
}
