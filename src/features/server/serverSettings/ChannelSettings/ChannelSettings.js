// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectServerChannels, selectUsersPermissions, setEditingChannelId } from '../../ServerSlice';

const Wrapper = () => {

    const dispatch = useDispatch();

    const channels = useSelector(selectServerChannels);

    const permission = useSelector(selectUsersPermissions);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Edit Channel"));

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [])

    const navigateToChannel = (channelName, channelId) => {
        window.location.hash = window.location.hash + `/${channelName}`

        dispatch(setEditingChannelId(channelId));
    }

    const openCreateChannelMenu = () => {
        const location = window.location.hash;

        if (location.includes('/create-channel-menu')) {
            window.location.hash = location.split('/server-settings')[0]
        } else {
            window.location.hash = location.split('/server-settings')[0] + '/create-channel-menu'
        }
    }

    return (
        <>
        {permission?.user_can_manage_channels ?
        <>
        <InputTitle title={"Select Channel To Edit"} />
        {channels.map(channel => {
            return <TextButton action={() => {
               navigateToChannel(channel.channel_name, channel._id) 
            }} marginBottom="2%" textAlign='start' name={channel.channel_name} key={channel._id}  />
        })}
        <TextButton textAlign='center' name={"Create Channel"} action={openCreateChannelMenu}  />
        </> :
        <NotAuthorizedMessage />
        }
        </>
    )
}


export const ChannelSettings = () => useRoutes([
    { path: "channels", element: <Wrapper /> }
])

