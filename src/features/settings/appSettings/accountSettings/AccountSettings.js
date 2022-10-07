// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useRoutes } from 'react-router'
import { AnimatePresence } from 'framer-motion';

// state
import { selectUserBanner, selectUserImage, selectDisplayName, selectAccountSettingsLoading, selectAccountSettingsErrorState, selectAccountSettingsErrorMessage, updateAccount, updateAccountInputState, selectAccountSettingsPassword, selectAccountSettingsNewPassword, selectAccountSettingsConfirmNewPassword, accountSettingsCloseError, selectAccountSettingsStateChanged } from './accountSettingsSlice';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

// components
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { ProfileImage } from './ProfileImage/ProfileImage';
import { Error } from '../../../../components/Error/Error';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

const Settings = () => {

    // 
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // local state
    const [newUserImage, setNewUserImage] = React.useState({});

    const [newUserBanner, setNewUserBanner] = React.useState({});
    // account slice state
    const displayName = useSelector(selectDisplayName);

    const loading = useSelector(selectAccountSettingsLoading);

    const error = useSelector(selectAccountSettingsErrorState);

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const password = useSelector(selectAccountSettingsPassword);

    const newPassword = useSelector(selectAccountSettingsNewPassword);

    const confirmNewPassword = useSelector(selectAccountSettingsConfirmNewPassword);

    const errorMessage = useSelector(selectAccountSettingsErrorMessage);

    const stateChanged = useSelector(selectAccountSettingsStateChanged);

    React.useEffect(() => {
        dispatch(setHeaderTitle("Account Settings"))
    // eslint-disable-next-line
    }, [])

    // handle actions
    const handleCancel = () => {
        navigate(window.location.hash.split('#')[1].split('/appsettings')[0])
    }
    
    const handleApply = () => {
        dispatch(updateAccount({userImage: newUserImage, userBanner: newUserBanner}));
        setNewUserBanner({});
        setNewUserImage({});
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

    return (
        <>
            <div className='settings-wrapper'>
                <SettingsHeader title={"User Display"} />
                <InputTitle title={"Change Display Name"} />
                <TextInput stateSelector='display_name' action={handleInput} inputValue={displayName} placeholder={""} />
                <InputTitle title={"Change Banner / Profile Picture"} />
                <ProfileImage getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} />
                <InputTitle title={"*Reconnect To Server To See Changes"} />
                <SettingsHeader title={"Privacy"} />
                <InputTitle title={"Change Password"} />
                <TextInput stateSelector='password' action={handleInput}  marginBottom='2%' type='password' placeholder={"Current Password"} inputValue={password} />
                <TextInput action={handleInput} stateSelector='newPassword' marginBottom='2%' type='password' placeholder={"New Password"} inputValue={newPassword} />
                <TextInput action={handleInput} inputValue={confirmNewPassword} stateSelector="confirmNewPassword" type='password' placeholder={"Confirm New Password"} />
                {stateChanged ? <ApplyCancelButton apply={handleApply} cancel={handleCancel} /> : null}
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
