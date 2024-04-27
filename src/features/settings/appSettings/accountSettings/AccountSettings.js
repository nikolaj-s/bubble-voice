// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { AnimatePresence } from 'framer-motion';

// state
import { selectUserBanner, selectUserImage, selectDisplayName, selectAccountSettingsLoading, selectAccountSettingsErrorState, selectAccountSettingsErrorMessage, updateAccount, updateAccountInputState, selectAccountSettingsPassword, selectAccountSettingsNewPassword, selectAccountSettingsConfirmNewPassword, accountSettingsCloseError, selectAccountSettingsStateChanged, selectProfilePictureShape, selectProfileBio, selectProfileColor, selectShowCaseScreenShotsState, selectUsersScreenShots, toggleShowCaseScreenShots, selectUsername, selectCurrentDecoration } from './accountSettingsSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

// components
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';

import { Error } from '../../../../components/Error/Error';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

import { EditMemberPanel } from './EditMemberPanel/EditMemberPanel';
import { selectPrimaryColor, selectSecondaryColor } from '../appearanceSettings/appearanceSettingsSlice';

const Settings = () => {

    // 
    const dispatch = useDispatch();

    // local state
    const [newUserImage, setNewUserImage] = React.useState({});

    const [newUserBanner, setNewUserBanner] = React.useState({});

    const [userImageGifFrame, setUserImageGifFrame] = React.useState({});

    const [userBannerGifFrame, setUserBannerGifFrame] = React.useState({});

    const [color, setColor] = React.useState("");

    const [newShape, setNewShape] = React.useState("");

    const [previewBio, togglePreviewBio] = React.useState(false);

    const [newBio, setNewBio] = React.useState("");

    const [newDisplayName, setNewDisplayName] = React.useState("");

    const [newDecoration, setNewDecoration] = React.useState("");
    
    // account slice state
    const displayName = useSelector(selectDisplayName);

    const profilePictureShape = useSelector(selectProfilePictureShape);

    const profileColor = useSelector(selectProfileColor);

    const profileBio = useSelector(selectProfileBio);

    const loading = useSelector(selectAccountSettingsLoading);

    const error = useSelector(selectAccountSettingsErrorState);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const password = useSelector(selectAccountSettingsPassword);

    const newPassword = useSelector(selectAccountSettingsNewPassword);

    const confirmNewPassword = useSelector(selectAccountSettingsConfirmNewPassword);

    const errorMessage = useSelector(selectAccountSettingsErrorMessage);

    const stateChanged = useSelector(selectAccountSettingsStateChanged);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const showCaseScreenShots = useSelector(selectShowCaseScreenShotsState);;

    const screenShots = useSelector(selectUsersScreenShots);

    const currentDecoration = useSelector(selectCurrentDecoration);

    const username = useSelector(selectUsername);

    React.useEffect(() => {
        dispatch(setHeaderTitle("Account Settings"));

        setNewShape(profilePictureShape);

        setColor(profileColor || primaryColor);

        setNewDisplayName(displayName);

        setNewBio(profileBio);

        setNewDecoration(currentDecoration);

        return () => {
            
            URL.revokeObjectURL(newUserBanner.preview);

            URL.revokeObjectURL(newUserImage.preview);

            setNewUserBanner({});
            setNewUserImage({});
        }

    // eslint-disable-next-line
    }, [])

    // handle actions
    const handleCancel = () => {
       
        
        setNewShape(profilePictureShape);

        setColor(profileColor || primaryColor);

        URL.revokeObjectURL(newUserBanner.preview);

        URL.revokeObjectURL(newUserImage.preview);

        URL.revokeObjectURL(userImageGifFrame.preview);

        URL.revokeObjectURL(userBannerGifFrame.preview);

        setNewUserBanner({});

        setNewUserImage({});

        setUserBannerGifFrame({});

        setUserImageGifFrame({});

        setNewDisplayName(displayName);

        setNewBio(profileBio);

        setNewDecoration(currentDecoration);

        dispatch(updateAccountInputState({state: 'change', value: false}));
        
    }
    
    const handleApply = () => {
        console.log(userImageGifFrame)
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner, newShape: newShape, color: color, bio: newBio, displayName: newDisplayName, decoration: newDecoration, userImageGifFrame: userImageGifFrame, userBannerGifFrame: userBannerGifFrame}));
    
        URL.revokeObjectURL(newUserBanner.preview);

        URL.revokeObjectURL(newUserImage.preview);

        URL.revokeObjectURL(userImageGifFrame.preview);

        URL.revokeObjectURL(userBannerGifFrame.preview);

    }

    const getNewUserImage = (image) => {
        setNewUserImage(image);
        dispatch(updateAccountInputState({state: "change", value: true}))
    }

    const getNewUserBanner = (image) => {
        setNewUserBanner(image);
        dispatch(updateAccountInputState({state: "change", value: true}))
    }

    const handleInput = (value, state) => {
        dispatch(updateAccountInputState({value: value, state: state}));
    }

    const closeError = () => {
        dispatch(accountSettingsCloseError());
    }

    const changeProfileShape = (shape) => {
        dispatch(updateAccountInputState({state: 'change', value: true}))
        setNewShape(shape)
    }

    const updateColor = (color) => {
        dispatch(updateAccountInputState({state: 'change', value: true}))
        setColor(color);
       
    }

    const changeProfileBio = (value) => {
        if (value.length > 1024) return;
        dispatch(updateAccountInputState({state: 'change', value: true}))
        setNewBio(value);
    }

    const handleToggleShowScreenShots = () => {
        dispatch(toggleShowCaseScreenShots());
    }

    const handleNewDisplayName = (value) => {
        if (value.length > 15) return;
        dispatch(updateAccountInputState({state: 'change', value: true}))
        setNewDisplayName(value);

    }

    const handleChangeDecoration = (value) => {
        dispatch(updateAccountInputState({state: "change", value: true}));
        setNewDecoration(value);
    }

    return (
        <>
            <div className='settings-wrapper'>
                <SettingsHeader title={"Account Settings"} />
                <EditMemberPanel setImageGifFrame={setUserImageGifFrame} setBannerGifFrame={setUserBannerGifFrame} setDecoration={handleChangeDecoration} currentDecoration={newDecoration} username={username} newBanner={newUserBanner} newImage={newUserImage} handleNewDisplayName={handleNewDisplayName} screenShots={screenShots} toggleShowCaseScreenShots={handleToggleShowScreenShots} showCaseScreenShots={showCaseScreenShots} color={color || secondaryColor} updateColor={updateColor} newShape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} changeProfileShape={changeProfileShape} handleInput={handleInput} displayName={newDisplayName} previewBio={previewBio} togglePreviewBio={togglePreviewBio} profileBio={newBio} changeProfileBio={changeProfileBio} />
                <SettingsHeader title={"Security"} />
                <InputTitle title={"Change Password"} />
                <div style={{maxWidth: 400}}>
                <TextInput stateSelector='password' action={handleInput}  marginBottom='2%' type='password' placeholder={"Current Password"} inputValue={password} />
                <TextInput action={handleInput} stateSelector='newPassword' marginBottom='2%' type='password' placeholder={"New Password"} inputValue={newPassword} />
                <TextInput action={handleInput} inputValue={confirmNewPassword} stateSelector="confirmNewPassword" type='password' placeholder={"Confirm New Password"} />
                </div>
               {stateChanged ? <ApplyCancelButton apply={handleApply} cancel={handleCancel} position={'fixed'} right={20} /> : null}
                <SettingsSpacer />
            </div>
            <AnimatePresence>
                {error ? <Error action={closeError} errorMessage={errorMessage} buttonLabel={"Ok"}  /> : null}
            </AnimatePresence>
            <Loading loading={loading} error={error} />
        </>
    )
}

export const AccountSettings = () => useRoutes([
    { path: "account", element: <Settings /> }
])
