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
import { clearSearchData, selectInactiveChannel, selectInactiveChannels, selectServerBanner, selectServerId, selectServerName, selectUsersPermissions, setServerName, throwServerError, updateInactiveChannel, updateServerBanner } from '../../ServerSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { socket } from '../../ServerBar/ServerBar';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { uploadImage } from '../../../../util/UploadRoute';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { DropDownList } from '../../../../components/DropDownList/DropDownList';
import { updateServer } from '../../../sideBar/sideBarSlice';


const Wrapper = () => {

    const dispatch = useDispatch();

    // local state
    const [newBanner, setNewBanner] = React.useState();

    const [newServerName, setNewServerName] = React.useState("");

    const [serverPassword, setServerPassword] = React.useState("");

    const [newServerPassword, setNewServerPassword] = React.useState("");

    const [confirmNewServerPassword, setConfirmNewServerPassword] = React.useState("");

    const [inactiveChannel, setInactiveChannel] = React.useState({label: "No Inactive Channel", id: ""});

    const [update, setUpdate] = React.useState(false);

    const [loading, toggleLoading] = React.useState(false);

    const serverName = useSelector(selectServerName);

    const serverBanner = useSelector(selectServerBanner);

    const permissions = useSelector(selectUsersPermissions);

    const inactiveChannels = useSelector(selectInactiveChannels);

    const currentInactiveChannel = useSelector(selectInactiveChannel);

    const serverId = useSelector(selectServerId);

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

            if (newBanner) {

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
                inactive_channel: inactiveChannel
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

                if (data.data.inactive_channel) {
                    dispatch(updateInactiveChannel(data.data.inactive_channel));
                }
                dispatch(updateServer({server_id: serverId, server_banner: data.data.server_banner, server_name: data.data.server_name}))

                setServerPassword("");

                setNewServerPassword("");

                setConfirmNewServerPassword("");
                
            })
            .catch(error => {
                toggleLoading(false);
                dispatch(throwServerError({errorMessage: error}));
            })

        } catch (error) {
            toggleLoading(false);
            dispatch(throwServerError({errorMessage: "Unexpected error has occurred while updating the server"}))
        }
    }

    const clearImageSearchData = async () => {
        try {

            toggleLoading(true);

            await socket.request('clear image search data')
            .then(res => {
                toggleLoading(false);

                dispatch(clearSearchData());
            })
            .catch(err => {
                toggleLoading(false);
                dispatch(throwServerError({errorMessage: err.errorMessage}));
            })

        } catch (error) {   
            toggleLoading(false);
            dispatch(throwServerError({errorMessage: error.message}))
        }
    }

    React.useEffect(() => {

        dispatch(setHeaderTitle("Overview"))

        setNewServerName(serverName);

        setInactiveChannel(currentInactiveChannel);

        return () => {
            dispatch(setHeaderTitle("Select Channel"))
        }
    // eslint-disable-next-line
    }, [])

    const handleCancel = () => {
        setUpdate(false)
        setNewServerName(serverName)
        setNewBanner(null);
    }
    
    const changeInactiveChannel = (_, channel) => {
        setInactiveChannel(channel);
        setUpdate(true);
    }

    return (
        <>
        <SettingsHeader title={"Banner"} />
        {permissions?.user_can_edit_server_name ?
        <>
        <InputTitle title={"Update Server Name"} />
        <TextInput action={handleServerNameChange} inputValue={newServerName} />
        </>
        : 
        <>
        <InputTitle title={"Server Name"} />
        <InputPlaceHolder value={serverName} /> 
        </>
        }
        
            {permissions?.user_can_edit_server_banner ?
            <>
            <InputTitle zIndex={2} title={"Update Server Banner"} />
            <div style={{
                position: 'relative',
                height: 300,
                minHeight: 300,
                maxWidth: 500
            }}>
                <ImageInput getFile={handleBannerChange} initalImage={serverBanner} />
            </div>
            </>
            : 
            <>
            <InputTitle title={"Server Banner"} />
            <div
            style={{
                width: '100%',
                height: '500px',
                maxHeight: '500px',
                borderRadius: '15px',
                overflow: 'hidden',
                minHeight: 500,
                flexShrink: 0
            }}
            >
                <Image image={serverBanner} /> 
            </div>
            </>
            }
        {permissions?.user_can_edit_server_banner && permissions?.user_can_edit_server_name ?
        <>
        <SettingsHeader zIndex={2} title={"Data"} />
        <InputTitle title={"Clear Image Search Recommendation Data"} />
        <TextButton name={"Clear"} action={clearImageSearchData} />
        <SettingsHeader title={"Set Inactive User Channel"} />
        <InputTitle title={"Users who go inactive will automatically be moved to this channel"} />
        <DropDownList action={changeInactiveChannel} selectedItem={inactiveChannel.label} list={inactiveChannels}  />
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
        </>
    )
}

export const OverView = () => useRoutes([
    {path: "overview", element: <Wrapper />},
])
