// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { ImageDropInput } from '../../../../components/inputs/ImageDropInput/ImageDropInput';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectProfileBanner, selectProfileImage, selectUserName } from './accountSettingsSlice';
import { ProfileImage } from './ProfileImage/ProfileImage';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setHeaderTitle("Account Settings"))
    }, [])

    // state selection
    const userName = useSelector(selectUserName);

    const profileImage = useSelector(selectProfileImage);

    const profileBanner = useSelector(selectProfileBanner);

    return (
        <>
        <InputTitle title={"Change Username"} />
        <TextInput inputValue={userName} placeholder={""} />
        <InputTitle title={"Change Password"} />
        <TextInput type='password' placeholder={"Current Password"} />
        <TextInput type='password' placeholder={"New Password"} />
        <TextInput type='password' placeholder={"Confirm New Password"} />
        <InputTitle title={"Change Banner / Profile Pic"} />
        <ProfileImage profileImage={profileImage} banner={profileBanner} />
        <ApplyCancelButton />
        </>
    )
}

export const AccountSettings = () => useRoutes([
    { path: "account", element: <Settings /> }
])
