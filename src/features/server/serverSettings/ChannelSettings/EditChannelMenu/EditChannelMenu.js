
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
import { DownIcon } from '../../../../../components/Icons/DownIcon/DownIcon';
import { WidgetsIcon } from '../../../../../components/Icons/WidgetsIcon/WidgetsIcon'
import { TextArea } from '../../../../../components/inputs/TextArea/TextArea'

// state
import { setHeaderTitle } from '../../../../contentScreen/contentScreenSlice';
import { deleteChannel, selectChannelToEdit, selectServerMembers, selectServerOwner, selectUsersPermissions, throwServerError, updateChannel } from '../../../ServerSlice';
import { TextButton } from '../../../../../components/buttons/textButton/TextButton';
import { NotAuthorizedMessage } from '../../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { WidgetPreview } from '../../../../../components/widgets/WidgetPreview/WidgetPreview';
import { DeleteIcon } from '../../../../../components/Icons/DeleteIcon/DeleteIcon'
import { addActivityMessage } from '../../../ChannelRoom/ServerDashBoard/ServerDashBoardSlice';

// socket
import { socket } from '../../../ServerBar/ServerBar';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { playSoundEffect } from '../../../../settings/soundEffects/soundEffectsSlice';
import { ChannelBackgroundInput } from './ChannelBackgroundInput/ChannelBackgroundInput';

import { InputPlaceHolder } from '../../../../../components/titles/InputPlaceHolder/InputPlaceHolder';
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { ChannelIcon } from './ChannelIcon/ChannelIcon';
import { clearSocialById } from '../../../SocialSlice';
import { selectGlassColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { RadioButton } from '../../../../../components/buttons/RadioButton/RadioButton';

const Wrapper = () => {

    const dispatch = useDispatch();

    const [channelName, setChannelName] = React.useState("");

    const [channelGuideLines, setChannelGuideLines] = React.useState("");

    const [persistChannelSocial, setPersistChannelSocial] = React.useState(false);

    const [blockNsfwPosting, toggleBlockNsfwPosting] = React.useState(false);

    const [edited, toggleEdited] = React.useState(false);

    const [widgets, setWidgets] = React.useState([]);

    const [loading, toggleLoading] = React.useState(false);

    const [channelOwner, setChannelOwner] = React.useState('');

    const [channelBackground, setChannelBackground] = React.useState(false);

    const [backgroundBlur, setBackgroundBlur] = React.useState(1);

    const [clearedSocial, toggleClearedSocial] = React.useState(false);

    const [channelToEdit, setChannelToEdit] = React.useState({});

    const [disableStreams, toggleDisableStreams] = React.useState(false);

    const [lockedChannel, toggleLockedChannel] = React.useState(false);

    const [authUsers, setAuthUsers] = React.useState([]);

    const [icon, setChannelIcon] = React.useState(false)

    const [managingWidgets, toggleManagingWidgets] = React.useState(false);

    const [lockedMediaPlayer, toggleLockedMediaPlayer] = React.useState(false);

    const [authMediaUsers, setAuthMediaUsers] = React.useState([]);

    const [manageAuthUsers, toggleManageAuthUsers] = React.useState(false);

    const [manageMediaUsers, toggleManageMediaUsers] = React.useState(false);

    const [assigningChannelOwner, toggleAssigningChannelOwner] = React.useState(false);

    const [containBackground, toggleContainBackGround] = React.useState(false);

    const channel = useSelector(selectChannelToEdit);

    const members = useSelector(selectServerMembers);

    const permission = useSelector(selectUsersPermissions);

    const textColor = useSelector(selectTextColor);

    const username = useSelector(selectUsername);

    const serverOwner = useSelector(selectServerOwner);

    const glassColor = useSelector(selectGlassColor);

    React.useEffect(() => {
        try {
            dispatch(setHeaderTitle("Edit Channel / " + channelToEdit.channel_name));

            setChannelName(channelToEdit.channel_name);

            setPersistChannelSocial(channelToEdit.persist_social)

            if (channelToEdit.background_blur) {

                setBackgroundBlur(channelToEdit.background_blur);
            
            }

            if (channelToEdit.locked_channel) {
                toggleLockedChannel(true);
            }

            setAuthUsers(channelToEdit.auth_users);

            if (channelToEdit.disable_streams) {
                toggleDisableStreams(true);
            }

            if (channelToEdit.channel_owner) {
                setChannelOwner(channelToEdit.channel_owner);
            }

            if (channelToEdit.locked_media) {
                toggleLockedMediaPlayer(channelToEdit.locked_media);
            }

            if (channelToEdit.media_auth) {
                setAuthMediaUsers(channelToEdit.media_auth)
            }

            if (channelToEdit.contain_background) {
                toggleContainBackGround(true);
            }

            if (channelToEdit.block_nsfw_posting) {
                toggleBlockNsfwPosting(true);
            }

            if (channelToEdit.guidelines) {
                setChannelGuideLines(channelToEdit.guidelines);
            }

            for (const w of channel.widgets) {
                if (w.delete) {
                    toggleEdited(true);
                    break;
                }
            }

            console.log(channelToEdit)

            setWidgets(channelToEdit.widgets);
        console.log(channelGuideLines)
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
    }, [channel.background_blur, channel.channel_background, channel.channel_name, channel.persist_social, channel.widgets, channel.icon])

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

        if (value.includes('/')) return;

        setChannelName(value)

        if (value !== channelName) {
            toggleEdited(true);
        }
        
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

    const handleAssignChannelOwner = (value) => {
        setChannelOwner(value);

        toggleEdited(true);
    }

    const handleUpdateChannel = async () => {

        if (channelBackground?.size > 950000) return dispatch(throwServerError({errorMessage: 'image cannot be larger than 1mb'}));

        handleToggleLoading(true);

        document.getElementsByClassName('server-settings-route-wrapper')[0].scrollTop = 0;

        await socket.request('update channel', 
        {...channelToEdit, widgets: widgets, persist_social: persistChannelSocial, channel_name: channelName, file: channelBackground, background_blur: backgroundBlur, clear_social: clearedSocial, disable_streams: disableStreams, auth_users: authUsers, locked_channel: lockedChannel, icon_file: icon, channel_owner: channelOwner, lock_media_player: lockedMediaPlayer, authMediaUsers: authMediaUsers, contain_background: containBackground, block_nsfw_posting: blockNsfwPosting, guidelines: channelGuideLines})
        .then(response => {

            dispatch(updateChannel(response.channel));

            dispatch(addActivityMessage(response.status_msg));

            setWidgets(response.channel.widgets);

            setAuthUsers(response.channel.auth_users);

            toggleEdited(false);

            setChannelBackground(false);

            setChannelIcon(false);
            
            toggleClearedSocial(false);

            if (response.cleared_social) {
                dispatch(clearSocialById(response.channel._id));
            }

            return;
        })
        .catch(error => {
            console.log(error);
            dispatch(throwServerError({errorMessage: error}))
        })

        handleToggleLoading(false);
    }

    const handleDeleteChannel = async () => {

        document.getElementsByClassName('server-settings-route-wrapper')[0].scrollTop = 0;

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

    const handleClearSocial = () => {
        toggleEdited(true);

        toggleClearedSocial(true);
    }

    const handleToggleDisableStreams = () => {
        toggleEdited(true);

        toggleDisableStreams(!disableStreams);
    }

    const handleLockChannel = () => {

        toggleEdited(true);

        toggleLockedChannel(!lockedChannel);
    
    }

    const addAuthUser = (id) => {

        toggleEdited(true);

        let currentAuthUsers = [...authUsers];

        if (currentAuthUsers.findIndex(i => i === id) !== -1) {
            currentAuthUsers = currentAuthUsers.filter(u => u !== id);
        } else {
            currentAuthUsers.push(id);
        }

        setAuthUsers(currentAuthUsers);

    }

    const updateChannelIcon = (file) => {
        setChannelIcon(file);

        toggleEdited(true);
    }

    const handleToggleLockMedia = () => {

        toggleEdited(true);

        toggleLockedMediaPlayer(!lockedMediaPlayer);
    }

    const addAuthMediaUser = (username) => {
        toggleEdited(true);

        let current_auth_media = [...authMediaUsers];

        if (current_auth_media.findIndex(i => i === username) !== -1) {
            current_auth_media = current_auth_media.filter(u => u !== username)
        } else {
            current_auth_media.push(username);
        }

        setAuthMediaUsers(current_auth_media);
    }

    const toggleContainBackgroundState = () => {
        toggleEdited(true);

        toggleContainBackGround(!containBackground);
    }

    const handleBlockNsfwPosting = () => {
        toggleEdited(true);

        toggleBlockNsfwPosting(!blockNsfwPosting);
    }

    const handleUpdateGuideLines = (value) => {

        toggleEdited(true);

        setChannelGuideLines(value);
    }

    return (
        <>
        {(permission?.user_can_manage_channels && (channelToEdit.locked_channel ? channelToEdit.auth : true)) ?
            <>
            <SettingsHeader title={'General'} />
            <InputTitle title={"Edit Icon / Channel Name"} />
            <div style={{display: 'flex', alignItems: 'center', position: 'relative'}} >
           
            <ChannelIcon type={channelToEdit.type} initial={channelToEdit?.icon} locked={lockedChannel} textOnly={channelToEdit?.text_only} getFile={updateChannelIcon}  />
            {channelToEdit.type === 'subreddit' || channelToEdit.type === 'screenshots' || channelToEdit.type === 'mediahistory' ?
            <InputPlaceHolder value={channelName} />
            : 
            <>
            <TextInput action={handleUpdateChannelName} inputValue={channelName} />
            </>
            }
            </div>
            {channelToEdit.type !== 'subreddit' && channelToEdit.type !== 'screenshots' && channelToEdit.type !== 'mediahistory' ?
            <>
            <InputTitle title={"Channel Posting Guidelines"} />
            <div style={{minHeight: 150}}>
            <TextArea action={handleUpdateGuideLines} inputValue={channelGuideLines} />
            </div>
            </>
            : null}
            {channelToEdit.type === 'text' ?
            <>
            <InputTitle zIndex={2} title={"Channel Background"} />
            <ChannelBackgroundInput contain={containBackground} blur={backgroundBlur} initialImage={channelToEdit.channel_background} getFile={handleSettingChannelBackground} />
            </>
            : null}
            {channelToEdit.text_only ? null :
            <>
            <SettingsHeader title={"Channel Background"} />
            <InputTitle zIndex={2} title={"Image"} />
            <ChannelBackgroundInput contain={containBackground} blur={backgroundBlur} initialImage={channelToEdit.channel_background} getFile={handleSettingChannelBackground} />
            <InputTitle title={"Contain or Cover The Channel Background"} />
            <RadioButton action={toggleContainBackgroundState} state={containBackground === false} name={'Cover Background'} />
            <RadioButton action={toggleContainBackgroundState} state={containBackground} name={'Contain Background'} />
            <SettingsHeader title={"Widgets"} />
            <TextButton action={openWidgetMenu} name={"Add Widget"} icon={<WidgetsIcon color={textColor} />} />
            <InputTitle title={`Widgets ${channelToEdit.widgets ? channelToEdit.widgets.length : 0} / 15`} />
            
            <TextButton marginBottom={managingWidgets ? '5px' : null} name="Manage Widgets" action={() => {toggleManagingWidgets(!managingWidgets)}} icon={<DownIcon flip={managingWidgets} />} />
            {managingWidgets === false ? null 
            : <WidgetPreview widgets={widgets} editing={true} reorder={updateWidgetOrder} />}
            </>}
            {channelToEdit.type === 'subreddit' || channelToEdit.type === 'screenshots' || channel.type === 'mediahistory' ? null :
            <>
            <SettingsHeader title={"Data"} />
            <InputTitle title={"Block Posting of NSFW Content In This Channel"} />
            <ToggleButton action={handleBlockNsfwPosting} state={blockNsfwPosting} />
            <InputTitle title={"Clear Social Data"} />
            {clearedSocial === false ?
            <TextButton action={handleClearSocial} name={"Clear Social Data"} icon={<DeleteIcon />} />
            :
            <InputPlaceHolder value={"Hit Apply To Save Changes"} />
            }
            <SettingsHeader title={"Make Channel Private"} />
            <InputTitle title={"Lock Channel To Specific Users"} />
            <ToggleButton state={lockedChannel} action={handleLockChannel}  />
            {lockedChannel ?
            <>
            
            <InputTitle title={"Add Authorized Users"} />
            <TextButton marginBottom={manageAuthUsers ? '5px' : null} name={"Manage"} action={() => {toggleManageAuthUsers(!manageAuthUsers)}} icon={<DownIcon flip={manageAuthUsers} />} />
            {manageAuthUsers ?
            <div className='auth-users-container'>
                {members.filter(m => (m.username !== username && m.username !== serverOwner)).map((member, i) => {
                    return <RadioButton action={() => {addAuthUser(member._id)}} state={authUsers.findIndex(i => i === member._id) !== -1} name={member.display_name} />
                })}
            </div> : null}
            </>
            : null}
            {channelToEdit.text_only ? null : channelOwner === username || permission.server_group_name === 'Owner' ?
            <>
            <InputTitle title={"Lock Media Player To Certain Users"} />
            <ToggleButton action={handleToggleLockMedia} state={lockedMediaPlayer} />
            {lockedMediaPlayer ? 
            <>
            <InputTitle title={"Select Users That Can Use The Media Player"} />
            <TextButton marginBottom={manageMediaUsers ? '5px' : null} name={"Manage"} action={() => {toggleManageMediaUsers(!manageMediaUsers)}} icon={<DownIcon flip={manageMediaUsers} />} />
            {manageMediaUsers ?
            members.filter(m => (m.username !== channelOwner && m.username !== serverOwner)).map(m => {
                return <RadioButton action={() => {addAuthMediaUser(m.username)}} state={authMediaUsers.includes(m.username)} name={m.display_name} />
            }) : null}
            </>
            : null}
            </>
            : null}
            {channelToEdit.text_only ? null :
            <>
            <SettingsHeader title={"Disable Video / Audio Streams"} />
            <InputTitle title={"Disable streams in this channel to allow for an inactive user channel"} />
            <ToggleButton action={handleToggleDisableStreams} state={disableStreams} />
            </>
            }
            {permission.server_group_name === 'Owner' ?
            <>
            <InputTitle title={'Assign Channel Owner'} />
            <TextButton marginBottom={assigningChannelOwner ? '5px' : null} name={"Manage"} action={() => {toggleAssigningChannelOwner(!assigningChannelOwner)}} icon={<DownIcon flip={assigningChannelOwner} />} />
            {assigningChannelOwner ?
            members.map(m => {
                return <RadioButton action={() => {handleAssignChannelOwner(m.username)}} name={m.display_name} state={m.username === channelOwner} />
            }) : null}
            </>
            : null}
            </>}
            {channelToEdit.type === 'mediahistory' ?
            <>
            <InputTitle title={"Clear Media History"} />
            {clearedSocial === false ?
            <TextButton action={handleClearSocial} name={"Clear Media History Data"} icon={<DeleteIcon />} />
            :
            <InputPlaceHolder value={"Hit Apply To Save Changes"} />
            }
            </>
            : null}
            {permission?.user_can_delete_channels ?
            <>
            <InputTitle title={"Delete Channel"} />
            <TextButton marginBottom={'100px'} action={handleDeleteChannel} name={"Delete Channel"} icon={<DeleteIcon />} />
            </>
            : null}
            <div style={{flexShrink: 0, height: 100, width: '100%'}} />
            <ApplyCancelButton position={edited === false ? null : 'fixed'} right={20} toggled={edited === false ? true : null} apply={handleUpdateChannel} cancel={handleCancel} />
            <Loading backgroundColor={glassColor}  loading={loading} />
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
