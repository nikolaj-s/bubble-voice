import React from 'react'
import Header from '../../../../components/Titles/Header/Header'
import Label from '../../../../components/Titles/Label/Label'
import TextInput from '../../../../components/Inputs/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import TextButton from '../../../../components/Buttons/TextButton/TextButton'
import ToggleSwitch from '../../../../components/Inputs/ToggleSwitch/ToggleSwitch'

export const SecuritySettingsForm = () => {

    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = React.useState("");

    const [newPassword, setNewPassword] = React.useState("");

    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

    const [newPasswordError, setNewPasswordError] = React.useState(false);

    const [confirmNewPasswordError, setConfirmNewPasswordError] = React.useState(false);

    const {updateLoading} = useSelector(state => state.accountSlice);


    const handleUpdatePassword = () => {

    }

    const handleUpdate2FA = () => {
        
    }

    return (
        <>
        <Header text='Security' />
        <Label label='Change Your Password:' />
        <TextInput placeholder={"Enter Your Password"} />
        <TextInput placeholder={"New Password"} />
        <TextInput placeholder={"Confirm New Password"} />
        <TextButton title='Update Password' />
        <Label label='Enable Email 2FA On Each Login:' />
        <ToggleSwitch />
        </>
    )
}
