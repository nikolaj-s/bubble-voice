import React from 'react'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import { useDispatch, useSelector } from 'react-redux'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { updatePassword } from '../../../../features/Settings/Security/Thunks/updatePassword'
import { triggerAlert } from '../../../../features/Alerts/alertsSlice'
import { PasswordResetMenu } from '../../../../components/PasswordResetMenu/PasswordResetMenu'

export const SecuritySettingsForm = () => {

    const dispatch = useDispatch();

    const [valid, setValid] = React.useState(false);

    const [currentPassword, setCurrentPassword] = React.useState("");

    const [newPassword, setNewPassword] = React.useState("");

    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [showPasswordResetMenu, setShowPasswordResetMenu] = React.useState("");

    const {loading} = useSelector(state => state.securitySlice);

    const handleUpdatePassword = () => {
        if (!valid || loading) return dispatch(triggerAlert("Invalid Input", "error"));

        dispatch(updatePassword({currentPassword, newPassword, confirmPassword})).unwrap().catch(() => true)
        .then(() => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowPasswordResetMenu(false);
        })
    }

    return (
        <LoadingErrorFormWrapper sliceName='securitySlice'>
            <Header text='Security' />
            <Label label='Change Your Password' />
            <TextButton title='Update Password' action={() => {setShowPasswordResetMenu(true)}} />
            <PasswordResetMenu active={showPasswordResetMenu}
            currentPassword={currentPassword}
            onCurrentPasswordChange={setCurrentPassword}
            newPassword={newPassword} onNewPasswordChange={setNewPassword}
            confirmPassword={confirmPassword} onConfirmPasswordChange={setConfirmPassword}
            onClose={() => {setShowPasswordResetMenu(false)}}
            confirm={handleUpdatePassword} isValid={valid} setIsValid={setValid}
            />
          
            {/* <Label label='Enable Email 2FA On Each Login:' />
            <ToggleSwitch /> */}
        </LoadingErrorFormWrapper>
    )
}
