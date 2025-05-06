import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import PasswordRequirements from '../../../../components/ui/PasswordRequirements/PasswordRequirements'
import { updatePassword } from '../../../../features/Settings/Security/Thunks/updatePassword'
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'

export const SecuritySettingsForm = () => {

    const dispatch = useDispatch();

    const [valid, setValid] = React.useState(false);

    const [currentPassword, setCurrentPassword] = React.useState("");

    const [newPassword, setNewPassword] = React.useState("");

    const [confirmPassword, setConfirmPassword] = React.useState("");

    const {loading} = useSelector(state => state.securitySlice);

    const handleUpdatePassword = () => {
        if (!valid || loading) return;

        dispatch(updatePassword({currentPassword, newPassword, confirmPassword}))
    }

    const clearChanges = () => {
        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");
    }

    const handleUpdate2FA = () => {
        
    }

    return (
        <LoadingErrorFormWrapper sliceName='securitySlice'>
            <Header text='Security' />
            <Label label='Change Your Password:' />
            <TextInput type='password' placeholder={"Enter Your Password"} onChange={setCurrentPassword} value={currentPassword} />
            <PasswordRequirements password={newPassword} isValid={setValid} />
            <TextInput type='password' placeholder={"New Password"} onChange={setNewPassword} value={newPassword} />
            <TextInput type='password' placeholder={"Confirm New Password"} onChange={setConfirmPassword} value={confirmPassword} />
            <Label label='Enable Email 2FA On Each Login:' />
            <ToggleSwitch />
            <ApplyChangesPopup 
            disabled={!valid}
            onApply={handleUpdatePassword}
            onClearChanges={clearChanges}
            />
        </LoadingErrorFormWrapper>
    )
}
