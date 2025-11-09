
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import Header from '../../../../components/ui/Titles/Header/Header'
import Label from '../../../../components/ui/Titles/Label/Label'
import { Description } from '../../../../components/ui/Description/Description'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import ToggleSwitch from '../../../../components/ui/Inputs/ToggleSwitch/ToggleSwitch'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'
import PasswordRequirements from '../../../../components/ui/PasswordRequirements/PasswordRequirements'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { triggerAlert } from '../../../../features/Alerts/alertsSlice'
import { ApplyChangesPopup } from '../../../../components/ApplyChangesPopup/ApplyChangesPopup'
import { resetServerPassword } from '../../../../features/ServerSecurity/thunks/resetServerPassword'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import Portal from '../../../../components/Portal/Portal'
import FullScreenWrapper from '../../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { Card } from '../../../../components/ui/Wrappers/Card/Card'
import { ToolBar } from '../../../../components/ui/Wrappers/ToolBar/ToolBar'
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton'
import { X } from 'lucide-react'

export const ServerSecurityForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [showResetPasswordForm, toggleShowResetPasswordForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isValid, setIsValid] = useState(false);

    const handleResetPassword = async () => {

        if (!isValid) return dispatch(triggerAlert("New password is invalid", 'error'));

        if (newPassword !== confirmPassword) return dispatch(triggerAlert("New password and password confirmation do not match", 'error'));

        if (newPassword === currentPassword) return dispatch(triggerAlert("New password cannot be the same as the current password", 'error'))

        await dispatch(resetServerPassword({newPassword, currentPassword, confirmPassword})).unwrap().catch(() => true).finally((data) => {
            console.log(data);


            // setCurrentPassword("");

            // setNewPassword("");

            // setConfirmPassword("");

            // dispatch(triggerAlert("Password Updated", 'success'));
        })

    }

    return (
        <NotAuthorized permission={permissions?.user_can_manage_security_settings}>
            <LoadingErrorFormWrapper sliceName='serverSecuritySlice'>
                <Header text='Security' />
                <LineSpacer />
                <Label label='Make Invite Only' />
                <Description description={"This Bubble’s a little exclusive — no passwords, no secret handshakes. If you want in, you’ll need to send a request to join. The admins will give it a look and let you know if there’s room. 🫧"} />
                <ToggleSwitch />
                <LineSpacer />
                {permissions?.user_can_change_password &&
                    <>
                    <Label label='Change Bubble Password' />
                    <TextButton title='Reset Password' action={() => {toggleShowResetPasswordForm(true)}} />
                    {showResetPasswordForm &&
                    (
                    <Portal>
                        <FullScreenWrapper onClose={() => {toggleShowResetPasswordForm(false)}} maxContentWidth={500}>
                        <Card>
                            <ToolBar style={{alignItems: 'center', justifyContent: 'space-between', background: 'transparent'}} >
                                <Header level={4} text='Change Password' />
                                <IconButton 
                                Icon={X}
                                title={'Close'}
                                onClick={() => {
                                    toggleShowResetPasswordForm(false)
                                }}
                                />
                            </ToolBar>
                            <TextInput value={currentPassword} onChange={setCurrentPassword} type='password' placeholder={'current password'} />
                            <PasswordRequirements password={newPassword} isValid={setIsValid} />
                            <TextInput type='password' value={newPassword} onChange={setNewPassword} placeholder='new password' />
                        
                            <TextInput type='password' value={confirmPassword} onChange={setConfirmPassword} placeholder='confirm new password' />
                            <ApplyChangesPopup 
                            disabled={!currentPassword || !isValid || (newPassword !== confirmPassword)}
                            onApply={handleResetPassword} onClearChanges={() => {
                                setNewPassword("")
                                setConfirmPassword("")
                            }} />
                        </Card>
                        </FullScreenWrapper>
                    </Portal>
                    )}
                    </>
                }
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
