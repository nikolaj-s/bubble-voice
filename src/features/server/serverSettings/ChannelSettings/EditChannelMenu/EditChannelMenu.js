
// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput';
import { ToggleButton } from '../../../../../components/buttons/ToggleButton/ToggleButton';
import { ApplyCancelButton } from '../../../../../components/buttons/ApplyCancelButton/ApplyCancelButton'
import { SettingsHeader } from '../../../../../components/titles/SettingsHeader/SettingsHeader'

// state
import { setHeaderTitle } from '../../../../contentScreen/contentScreenSlice';
import { deleteChannel, selectChannelToEdit, selectUsersPermissions, throwServerError, updateChannel } from '../../../ServerSlice';
import { TextButton } from '../../../../../components/buttons/textButton/TextButton';
import { NotAuthorizedMessage } from '../../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';

// socket
import { socket } from '../../../ServerBar/ServerBar';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { playSoundEffect } from '../../../../settings/soundEffects/soundEffectsSlice';
import { ChannelBackgroundInput } from './ChannelBackgroundInput/ChannelBackgroundInput';
import { Range } from '../../../../../components/inputs/Range/Range';
import { InputPlaceHolder } from '../../../../../components/titles/InputPlaceHolder/InputPlaceHolder';

const Wrapper = () => {

    const dispatch = useDispatch();

    const [channelName, setChannelName] = React.useState("");

    const [persistChannelSocial, setPersistChannelSocial] = React.useState(false);

    const [edited, toggleEdited] = React.useState(false);

    const [widgets, setWidgets] = React.useState([]);

    const [loading, toggleLoading] = React.useState(false);

    const [channelBackground, setChannelBackground] = React.useState(false);

    const [backgroundBlur, setBackgroundBlur] = React.useState(1);

    const [clearedSocial, toggleClearedSocial] = React.useState(false);

    const [channelToEdit, setChannelToEdit] = React.useState({});

    const [disableStreams, toggleDisableStreams] = React.useState(false);

    const channel = useSelector(selectChannelToEdit);

    const permission = useSelector(selectUsersPermissions);

    React.useEffect(() => {
        try {
            dispatch(setHeaderTitle("Edit Channel / " + channelToEdit.channel_name));

            setChannelName(channelToEdit.channel_name);

            setPersistChannelSocial(channelToEdit.persist_social)
            
            if (channelToEdit.background_blur) {

                setBackgroundBlur(channelToEdit.background_blur);
            
            }

            if (channelToEdit.disable_streams) {
                toggleDisableStreams(true);
            }

            for (const w of channel.widgets) {
                if (w.delete) {
                    toggleEdited(true);
                    break;
                }
            }

            setWidgets(channelToEdit.widgets);
        
        } catch (error) {
            return;
        }

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [channelToEdit])

    React.useEffect(() => {

        setChannelToEdit(channel);

    // eslint-disable-next-line
    }, [channel.background_blur, channel.channel_background, channel.channel_name, channel.persist_social, channel.widgets])

    const handleCancel = () => {
        window.location.hash = window.location.hash.split(`/channels`)[0] + '/channels'
    }

    const openWidgetMenu = () => {
        window.location.hash = window.location.hash + '/add-widgets';
    }

    const updateWidgetOrder = (widgets) => {
        setWidgets(widgets);
        toggleEdited(true);
    }

    const handleUpdateChannelName = (value) => {
        setChannelName(value)

        if (value !== channelName) {
            toggleEdited(true);
        }
        
    }

    const handleTogglePersistSocial = () => {
        setPersistChannelSocial(!persistChannelSocial);
        toggleEdited(true);
    }

    const handleToggleLoading = (bool) => {
        if (bool) {
            document.getElementsByClassName('content-screen-inner-container')[0].scrollTo(0, 0)

            document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'hidden'

            toggleLoading(true);
        } else {
            document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'auto'

            toggleLoading(false);
        }
    }

    const handleUpdateChannel = async () => {

        if (channelBackground?.size > 950000) return dispatch(throwServerError({errorMessage: 'image cannot be larger than 1mb'}));

        handleToggleLoading(true);

        await socket.request('update channel', 
        {...channelToEdit, widgets: widgets, persist_social: persistChannelSocial, channel_name: channelName, file: channelBackground, background_blur: backgroundBlur, clear_social: clearedSocial, disable_streams: disableStreams})
        .then(response => {

            dispatch(updateChannel(response.channel))

            setWidgets(response.channel.widgets);

            toggleEdited(false);

            setChannelBackground(false);
        })
        .catch(error => {
            console.log(error);
            dispatch(throwServerError({errorMessage: error}))
        })

        handleToggleLoading(false);
    }

    const handleDeleteChannel = async () => {

        handleToggleLoading(true);

        await socket.request('delete channel', {channel_id: channelToEdit._id})
        .then(response => {

            setTimeout(() => {
                
                dispatch(playSoundEffect("channelDeleted"))
                
                dispatch(deleteChannel(response.channel_id));

                return true;
            }, 20)
                
        })
        .then(() => {

            window.location.hash = window.location.hash.split('/channels/')[0] + '/channels';

        })
        .catch(error => {
            console.log(error);
            dispatch(throwServerError({errorMessage: error}));
        })

        handleToggleLoading(false);
    }

    const handleSettingChannelBackground = (data) => {
        if (data.size > 950000) return dispatch(throwServerError({errorMessage: 'image cannot be larger than 1mb'}));
        
        setChannelBackground(data);

        toggleEdited(true);
    
    }

    const handleBlurChange = (value) => {

        setBackgroundBlur(value);

        toggleEdited(true);
    
    }

    const handleClearSocial = () => {
        toggleEdited(true);

        toggleClearedSocial(true);
    }

    const handleToggleDisableStreams = () => {
        toggleEdited(true);

        toggleDisableStreams(!disableStreams);
    }

    return (
        <>
        {permission?.user_can_manage_channels ?
            <>
            <SettingsHeader title={'General'} />
            <InputTitle title={"Edit Channel Name"} />
            <TextInput action={handleUpdateChannelName} inputValue={channelName} />
            <InputTitle title={"Toggle Persist Social Data *persists new data upon activation"} />
            <ToggleButton action={handleTogglePersistSocial} state={persistChannelSocial} />
            <SettingsHeader title={"Channel Background"} />
            <InputTitle title={"Image"} />
            <ChannelBackgroundInput blur={backgroundBlur} initialImage={channelToEdit.channel_background} getFile={handleSettingChannelBackground} />
            <InputTitle title={"Background Opacity"} />
            <Range action={handleBlurChange} value={backgroundBlur} min={0} max={1} step={0.05} />
            <SettingsHeader title={"Widgets"} />
            <TextButton action={openWidgetMenu} name={"Add Widget"} />
            <InputTitle title={`Widgets ${channelToEdit.widgets ? channelToEdit.widgets.length : 0} / 15`} />
            <WidgetPreview widgets={widgets} editing={true} reorder={updateWidgetOrder} />
            <SettingsHeader title={"Data"} />
            <InputTitle title={"Clear Social Data"} />
            {clearedSocial === false ?
            <TextButton action={handleClearSocial} name={"Clear Social Data"} />
            :
            <InputPlaceHolder value={"Hit Apply To Save Changes"} />
            }
            <SettingsHeader title={"Disable Video / Audio Streams"} />
            <InputTitle title={"Disable streams in this channel to allow for an inactive user channel"} />
            <ToggleButton action={handleToggleDisableStreams} state={disableStreams} />
            <InputTitle title={"Delete Channel"} />
            <TextButton action={handleDeleteChannel} name={"Delete Channel"} />
            <ApplyCancelButton toggled={edited === false ? true : null} apply={handleUpdateChannel} cancel={handleCancel} />
            <Loading loading={loading} />
            </>
        : 
        <NotAuthorizedMessage />
        }
        </>   
    )
}

export const EditChannelMenu = () => useRoutes([
    {path: "channels/:id/", element: <Wrapper /> }
])
