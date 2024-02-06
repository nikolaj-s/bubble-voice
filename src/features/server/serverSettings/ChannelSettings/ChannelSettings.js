// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';
import { Reorder } from 'framer-motion';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { reOrderChannels, selectServerChannels, selectUsersPermissions, setEditingChannelId, throwServerError, toggleCreateChannelMenu } from '../../ServerSlice';
import { MoveButton } from '../../../../components/buttons/MoveButton/MoveButton';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { socket } from '../../ServerBar/ServerBar';
import { EditIcon } from '../../../../components/Icons/EditIcon/EditIcon';

const Wrapper = () => {

    const dispatch = useDispatch();

    const [orderedChannels, setOrderedChannels] = React.useState([]);

    const [updated, toggleUpdated] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const channels = useSelector(selectServerChannels);

    const permission = useSelector(selectUsersPermissions);

    React.useEffect(() => {

        if (channels.length !== orderedChannels.length) {

            setOrderedChannels(channels)
        
        }

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [channels])

    const navigateToChannel = (channelName, channelId) => {
        window.location.hash = window.location.hash + `/${channelName}`

        dispatch(setEditingChannelId(channelId));
    }

    const openCreateChannelMenu = () => {

        if (window.location.hash.includes('appsettings')) {
                
            window.location.hash = window.location.hash.split('/appsettings')[0];
        
        } else if (window.location.hash.includes('server-settings')) {

            window.location.hash = window.location.hash.split('/server-settings')[0];
        
        }
        
        dispatch(toggleCreateChannelMenu(true))

    }

    const reorderChannels = (value) => {
        
        setOrderedChannels(value);

        toggleUpdated(true);
    
    }

    const handleCancel = () => {
        setOrderedChannels(channels);

        toggleUpdated(false);
    }

    return (
        <>
        {permission?.user_can_manage_channels ?
        <>
        <SettingsHeader title={"Channel Management"} />
        <InputTitle title={"Select Channel To Edit"} />
        {orderedChannels.map((channel, key) => {
            return (
            
                
            <TextButton 
            icon={<EditIcon />}
            action={() => {
            navigateToChannel(channel.channel_name, channel._id) 
            }} marginBottom="4px" textAlign='start' name={channel.channel_name} key={channel._id}  />
        
                
            )
        })}
        <TextButton textAlign='center' name={"Create Channel"} action={openCreateChannelMenu}  />
        <Loading loading={loading} />
        </> :
        <NotAuthorizedMessage />
        }
        <SettingsSpacer />
        </>
    )
}


export const ChannelSettings = () => useRoutes([
    { path: "channels", element: <Wrapper /> }
])

