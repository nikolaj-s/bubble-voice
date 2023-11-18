// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useRoutes } from 'react-router'
import { AnimatePresence } from 'framer-motion';

// state
import { selectUserBanner, selectUserImage, selectDisplayName, selectAccountSettingsLoading, selectAccountSettingsErrorState, selectAccountSettingsErrorMessage, updateAccount, updateAccountInputState, selectAccountSettingsPassword, selectAccountSettingsNewPassword, selectAccountSettingsConfirmNewPassword, accountSettingsCloseError, selectAccountSettingsStateChanged, selectProfilePictureShape, selectProfileBio, handleUpdateBio, selectProfileColor, selectShowCaseScreenShotsState, selectUsersScreenShots, toggleShowCaseScreenShots } from './accountSettingsSlice';
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

    const navigate = useNavigate();

    // local state
    const [newUserImage, setNewUserImage] = React.useState({});

    const [newUserBanner, setNewUserBanner] = React.useState({});

    const [color, setColor] = React.useState("");

    const [newShape, setNewShape] = React.useState("");

    const [previewBio, togglePreviewBio] = React.useState(false);

    const [newBio, setNewBio] = React.useState("");

    const [newDisplayName, setNewDisplayName] = React.useState("");

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

    React.useEffect(() => {
        dispatch(setHeaderTitle("Account Settings"));

        setNewShape(profilePictureShape);

        setColor(profileColor || primaryColor);

        setNewDisplayName(displayName);

        setNewBio(profileBio);

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

        setNewUserBanner({});

        setNewUserImage({});

        setNewDisplayName(displayName);

        setNewBio(profileBio);

        dispatch(updateAccountInputState({state: 'change', value: false}));
        
    }

    console.log(newUserBanner)
    
    const handleApply = () => {
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner, newShape: newShape, color: color, bio: newBio, displayName: newDisplayName}));
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

    return (
        <>
            <div className='settings-wrapper'>
                <SettingsHeader title={"Account Settings"} />
                <InputTitle title={"Edit User Panel"} />
                <EditMemberPanel newBanner={newUserBanner} newImage={newUserImage} handleNewDisplayName={handleNewDisplayName} screenShots={screenShots} toggleShowCaseScreenShots={handleToggleShowScreenShots} showCaseScreenShots={showCaseScreenShots} color={color || secondaryColor} updateColor={updateColor} newShape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} changeProfileShape={changeProfileShape} handleInput={handleInput} displayName={newDisplayName} previewBio={previewBio} togglePreviewBio={togglePreviewBio} profileBio={newBio} changeProfileBio={changeProfileBio} />
                <SettingsHeader title={"Security"} />
                <InputTitle title={"Change Password"} />
                <TextInput stateSelector='password' action={handleInput}  marginBottom='2%' type='password' placeholder={"Current Password"} inputValue={password} />
                <TextInput action={handleInput} stateSelector='newPassword' marginBottom='2%' type='password' placeholder={"New Password"} inputValue={newPassword} />
                <TextInput action={handleInput} inputValue={confirmNewPassword} stateSelector="confirmNewPassword" type='password' placeholder={"Confirm New Password"} />
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
