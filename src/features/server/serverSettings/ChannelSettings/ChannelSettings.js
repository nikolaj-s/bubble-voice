// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router';
import { Reorder } from 'framer-motion';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { reOrderChannels, selectServerChannels, selectUsersPermissions, setEditingChannelId, throwServerError } from '../../ServerSlice';
import { MoveButton } from '../../../../components/buttons/MoveButton/MoveButton';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { socket } from '../../ServerBar/ServerBar';

const Wrapper = () => {

    const dispatch = useDispatch();

    const [orderedChannels, setOrderedChannels] = React.useState([]);

    const [updated, toggleUpdated] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

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

    const reorderChannels = (value) => {
        
        setOrderedChannels(value);

        toggleUpdated(true);
    
    }

    const handleCancel = () => {
        setOrderedChannels(channels);

        toggleUpdated(false);
    }

    const handleSave = async () => {

        toggleUpdated(false);

        setLoading(true);

        const id_array = orderedChannels.map(c => c._id);

        await socket.request('reorganize channels', {new_order: id_array})
        .then(result => {
            setLoading(false);
           
            dispatch(reOrderChannels(result.new_order));
        })
        .catch(error => {
            dispatch(throwServerError({errorMessage: error.message}))

            setLoading(false);
        })

    }

    React.useEffect(() => {

        setOrderedChannels(channels);

    }, [channels])

    return (
        <>
        {permission?.user_can_manage_channels ?
        <>
        <SettingsHeader title={"Channel Management"} />
        <InputTitle title={"Select Channel To Edit"} />
        <Reorder.Group as='div' axis='y'  onReorder={reorderChannels} values={orderedChannels} >
            {orderedChannels.map((channel, key) => {
                return (
                <Reorder.Item as='div' dragMomentum={true} value={channel} key={`${channel._id}`} 
                style={{width: '100%', height: 'auto', display: 'flex'}}>
                    <MoveButton />
                    <TextButton action={() => {
                    navigateToChannel(channel.channel_name, channel._id) 
                    }} marginBottom="2%" textAlign='start' name={channel.channel_name} key={channel._id}  />
                </Reorder.Item>
                    
                )
            })}
        </Reorder.Group>
        {updated ? <ApplyCancelButton cancel={handleCancel} apply={handleSave} name='Save' /> : null}
        <TextButton textAlign='center' name={"Create Channel"} action={openCreateChannelMenu}  />
        <Loading loading={loading} />
        </> :
        <NotAuthorizedMessage />
        }
        </>
    )
}


export const ChannelSettings = () => useRoutes([
    { path: "channels", element: <Wrapper /> }
])

