// library's
import React from 'react'
import { useRoutes } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';

// components
import { InputTitle } from "../../../../components/titles/inputTitle/InputTitle";
import { TextInput } from "../../../../components/inputs/TextInput/TextInput";
import { ImageInput } from "../../../../components/inputs/ImageInput/ImageInput"
import { SettingsSpacer } from "../../../../components/Spacers/SettingsSpacer/SettingsSpacer";
import { InputPlaceHolder } from '../../../../components/titles/InputPlaceHolder/InputPlaceHolder';
import { Image } from '../../../../components/Image/Image';
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

// state
import { clearSearchData, handleDisableSafeSearch, selectBannedKeywords, selectDisableSafeSearch, selectInactiveChannel, selectInactiveChannels, selectServerBanner, selectServerId, selectServerName, selectServerWelcomeMessage, selectUsersPermissions, setServerName, setWelcomeMessage, throwServerError, updateBannedKeywords, updateInactiveChannel, updateServerBanner } from '../../ServerSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { socket } from '../../ServerBar/ServerBar';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { uploadImage } from '../../../../util/UploadRoute';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { DropDownList } from '../../../../components/DropDownList/DropDownList';
import { updateServer } from '../../../sideBar/sideBarSlice';
import { selectAccentColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ImageSearchKeywordFilter } from './ImageSearchKeywordFilter/ImageSearchKeyWordFilter'
import { selectPinnedSubreddits, setActivityFeed, setPinnedSubReddits } from '../../ChannelRoom/ServerDashBoard/ServerDashBoardSlice';
import { AddSubRedditMenu } from './AddSubRedditMenu/AddSubRedditMenu';
import { PinnedSubRedditWrapper } from '../../../../components/PinnedSubReddit/PinnedSubRedditWrapper';
import { setVideos } from '../../ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { ConfirmClearMenu } from './ConfirmClearMenu/ConfirmClearMenu';

const Wrapper = () => {

    const dispatch = useDispatch();

    // local state
    const [newBanner, setNewBanner] = React.useState({});

    const [newServerName, setNewServerName] = React.useState("");

    const [serverPassword, setServerPassword] = React.useState("");

    const [newServerPassword, setNewServerPassword] = React.useState("");

    const [newServerWelcomeMessage, setNewServerWelcomeMessage] = React.useState("");

    const [confirmNewServerPassword, setConfirmNewServerPassword] = React.useState("");

    const [inactiveChannel, setInactiveChannel] = React.useState({label: "No Inactive Channel", id: ""});

    const [update, setUpdate] = React.useState(false);

    const [loading, toggleLoading] = React.useState(false);

    const [newKeywords, setKeywords] = React.useState([]);

    const [clearActivity, toggleClearActivity] = React.useState(false);

    const [pinnedSubReddits, setLocalPinnedSubReddits] = React.useState([]);

    const [localDisableSafeSearch, toggleLocalDisableSafeSearch] = React.useState(false);

    const [confirmMediaClearScreen, toggleConfirmMediaClearScreen] = React.useState(false);

    const serverName = useSelector(selectServerName);

    const serverBanner = useSelector(selectServerBanner);

    const permissions = useSelector(selectUsersPermissions);

    const inactiveChannels = useSelector(selectInactiveChannels);

    const accentColor = useSelector(selectAccentColor);

    const currentInactiveChannel = useSelector(selectInactiveChannel);

    const serverId = useSelector(selectServerId);

    const welcomeMessage = useSelector(selectServerWelcomeMessage);

    const bannedKeywords = useSelector(selectBannedKeywords);

    const l_pinnedSubreddits = useSelector(selectPinnedSubreddits);

    const disableSafeSearch = useSelector(selectDisableSafeSearch);

    // handle local state changes
    const handleBannerChange = (image) => {
        
        if (!image) return;

        if (image.size > 2000000) return dispatch(throwServerError({errorMessage: 'image cannot be larger than 2mb'}))

        setNewBanner(image)
        
        setUpdate(true)
    }

    const handleServerNameChange = (value) => {
        setNewServerName(value)
        if (serverName === newServerName) {
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    React.useEffect(() => {

        if (serverPassword.length > 1 && newServerPassword.length > 1) {
            setUpdate(true);
        }

    }, [serverPassword, newServerPassword])

    const submitChange = async () => {
        try {
            toggleLoading(true);

            let image;

            if (newBanner?.preview) {

                const upload_stat = await uploadImage(newBanner);

                if (upload_stat.error) {
                    return dispatch(throwServerError({errorMessage: image.error}));
                }

                image = upload_stat.url;

            }
            
            const data = {
                server_name: newServerName === serverName ? null : newServerName,
                server_banner: image,
                server_password: serverPassword,
                new_server_password: newServerPassword,
                confirm_new_server_password: confirmNewServerPassword,
                inactive_channel: inactiveChannel,
                welcome_message: newServerWelcomeMessage,
                banned_keywords: newKeywords,
                clearActivity: clearActivity,
                pinned_sub_reddits: pinnedSubReddits,
                disable_safe_search: localDisableSafeSearch
            }

            await socket.request('update server', data)
            .then(data => {
                
                toggleLoading(false);

                setUpdate(false);

                if (data.data.server_name) {
                    dispatch(setServerName(data.data.server_name))
                }
                
                if (data.data.server_banner) {
                    dispatch(updateServerBanner(data.data.server_banner));
                }

                if (data.data.welcome_message) {
                    dispatch(setWelcomeMessage(data.data.welcome_message))
                }

                if (data.data.banned_keywords) {
                    dispatch(updateBannedKeywords(data.data.banned_keywords));
                }

                if (data.data.pinned_sub_reddits) {
                    dispatch(setPinnedSubReddits(data.data.pinned_sub_reddits));
                }
                
                dispatch(handleDisableSafeSearch(data.data.disable_safe_search));
                
                dispatch(setActivityFeed(data.data.activity_feed));

                dispatch(updateInactiveChannel(data.data.inactive_channel));
                
                dispatch(updateServer({server_id: serverId, server_banner: data.data.server_banner, server_name: data.data.server_name}))

                setServerPassword("");

                setNewServerPassword("");

                setConfirmNewServerPassword("");

                toggleClearActivity(false);
                
            })
            .catch(error => {
                toggleLoading(false);
                dispatch(throwServerError({errorMessage: error}));
            })

        } catch (error) {
            console.log(error)
            toggleLoading(false);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    const clearImageSearchData = async () => {
        try {

            toggleConfirmMediaClearScreen(false);

            toggleLoading(true);

            await socket.request('clear image search data')
            .then(res => {
                toggleLoading(false);

                dispatch(clearSearchData());

                dispatch(setVideos([]));
            })
            .catch(err => {
                toggleLoading(false);
                dispatch(throwServerError({errorMessage: err}));
            })

        } catch (error) {   
            toggleLoading(false);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    const handleClearActivityFeed = async () => {
        toggleClearActivity(true);

        setUpdate(true);
    }

    React.useEffect(() => {

        dispatch(setHeaderTitle("Overview"))

        setNewServerName(serverName);

        setInactiveChannel(currentInactiveChannel);

        setNewServerWelcomeMessage(welcomeMessage);
      
        setKeywords(bannedKeywords);

        setLocalPinnedSubReddits(l_pinnedSubreddits);

        toggleLocalDisableSafeSearch(disableSafeSearch);

        return () => {
            dispatch(setHeaderTitle("Select Channel"))
        }
    // eslint-disable-next-line
    }, [serverName, bannedKeywords, welcomeMessage, l_pinnedSubreddits, disableSafeSearch])

    const handleCancel = () => {
        setUpdate(false)
        setNewServerName(serverName)
        setNewBanner({});
        setInactiveChannel(currentInactiveChannel);
        setNewServerWelcomeMessage(welcomeMessage);
        setKeywords(bannedKeywords);
        toggleClearActivity(false);
        toggleLocalDisableSafeSearch(disableSafeSearch);
    }
    
    const changeInactiveChannel = (_, channel) => {
        setInactiveChannel(channel);
        setUpdate(true);
    }

    const handleUpdateServerWelcomeMessage = (value) => {
        setUpdate(true);

        if (value.length > 128) return;

        setNewServerWelcomeMessage(value);
    }

    const handleAddKeyword = (value) => {
        
        if (newKeywords.includes(value)) return;
       
        setKeywords([value, ...newKeywords]);

        setUpdate(true);
    }

    const removeKeyWord = value => {
        setUpdate(true);

        setKeywords(newKeywords.filter(w => w !== value));
    }

    const addPinnedSubReddit = (data) => {
        for (const d of pinnedSubReddits) {
            if (d.url === data.url) return;
        }

        setLocalPinnedSubReddits([data, ...pinnedSubReddits]);

        setUpdate(true);
    }

    const removePinnedSubReddit = (url) => {

        setUpdate(true);

        setLocalPinnedSubReddits(pinnedSubReddits.filter(s => s.url !== url));
        
    }

    const handleToggleDisableSafeSearch = () => {
        setUpdate(true);

        toggleLocalDisableSafeSearch(!localDisableSafeSearch);
    }

    return (
        <>
        <SettingsHeader title={"Banner"} />
        {permissions?.user_can_edit_server_name ?
        <>
        <InputTitle title={"Update Bubble Name"} />
        <TextInput action={handleServerNameChange} inputValue={newServerName} />
        </>
        : 
        <>
        <InputTitle title={"Bubble Name"} />
        <InputPlaceHolder value={serverName} /> 
        </>
        }
        
            {permissions?.user_can_edit_server_banner ?
            <>
            <InputTitle zIndex={2} title={"Update Bubble Banner"} />
            <div style={{
                position: 'relative',
                height: 200,
                minHeight: 200,
                maxWidth: 400
            }}>
                <ImageInput listenToClears={true} imageCleared={newBanner} getFile={handleBannerChange} backgroundColor={accentColor} initalImage={serverBanner} />
            </div>
            </>
            : 
            <>
            <InputTitle title={"Server Banner"} />
            <div
            style={{
                width: '300px',
                height: '150px',
                maxHeight: '500px',
                borderRadius: '15px',
                overflow: 'hidden',
                minHeight: 150,
                flexShrink: 0
            }}
            >
                <Image image={serverBanner} /> 
            </div>
            </>
            }
        {permissions?.user_can_edit_server_banner && permissions?.user_can_edit_server_name ?
        <>
        <SettingsHeader title="Dashboard" />
        <InputTitle title={`Pin a Subreddit to show top posts for the day - ${pinnedSubReddits.length} / 6`} />
        <PinnedSubRedditWrapper handleRemove={removePinnedSubReddit} editing={true} subreddits={pinnedSubReddits} />
        <AddSubRedditMenu add={addPinnedSubReddit} toggleLoading={toggleLoading} />
        <InputTitle title={"Edit Server Welcome Message"} />
        <TextInput inputValue={newServerWelcomeMessage} action={handleUpdateServerWelcomeMessage} />
        <SettingsHeader zIndex={2} title={"Data"} />
        <ImageSearchKeywordFilter keywords={newKeywords} removeKeyword={removeKeyWord} addKeyword={handleAddKeyword} />
        <InputTitle title={"Clear Media Search Recommendation Data"} />
        <TextButton name={"Clear"} action={() => {toggleConfirmMediaClearScreen(true)}} />
        <InputTitle title={"Clear Activity Feed"} />
        <TextButton action={handleClearActivityFeed} name={clearActivity ? "Hit Apply To Save Changes" : "Clear"} toggled={clearActivity} />
        <SettingsHeader title={"Set Inactive User Channel"} />
        <InputTitle title={"Users who go inactive will automatically be moved to this channel"} />
        <DropDownList action={changeInactiveChannel} selectedItem={inactiveChannel.label} list={inactiveChannels}  />
        </>
        : null}
        {permissions?.user_can_manage_server_safe_search ?
        <>
        <SettingsHeader title={"Media"} />
        <InputTitle title={"Disable Safe Search Within Media"} />
        <ToggleButton state={localDisableSafeSearch} action={handleToggleDisableSafeSearch} />
        </>
        : null}
        {permissions?.user_can_edit_server_password ?
        <>
        <SettingsHeader title={"Security"} />
        <InputTitle title={"Update Server Password"} />
        <TextInput action={(data) => {setServerPassword(data)}} value={serverPassword} marginBottom='2%' placeholder={"Current Password"} type="password" />
        <TextInput action={(data) => {setNewServerPassword(data)}} value={newServerPassword} marginBottom='2%' placeholder={"New Password"} type="password" />
        <TextInput action={(data) => {setConfirmNewServerPassword(data)}} value={confirmNewServerPassword} placeholder={"Confirm New Password"} type="password" />
        </>
        : null}
        {update ? <ApplyCancelButton cancel={handleCancel} apply={submitChange} /> : null}
        <Loading loading={loading} />
        <SettingsSpacer />
        {confirmMediaClearScreen ? <ConfirmClearMenu cancel={() => {toggleConfirmMediaClearScreen(false)}} clear={clearImageSearchData} /> : null}
        </>
    )
}

export const OverView = () => useRoutes([
    {path: "overview", element: <Wrapper />},
])
