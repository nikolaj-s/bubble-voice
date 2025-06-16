
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

export const ServerSecurityForm = ({permissions}) => {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <NotAuthorized permission={permissions?.user_can_manage_security_settings}>
            <LoadingErrorFormWrapper sliceName='serverSettingsSlice'>
                <Header text='Security' />
                <LineSpacer />
                <Label label='Make Invite Only' />
                <Description description={"This Bubble’s a little exclusive — no passwords, no secret handshakes. If you want in, you’ll need to send a request to join. The admins will give it a look and let you know if there’s room. 🫧"} />
                <ToggleSwitch />
                <LineSpacer />
                {permissions?.user_can_change_password &&
                <>
                <Label label='Change Bubble Password' />
                <TextInput value={currentPassword} onChange={setCurrentPassword} type='password' placeholder={'password'} />
                <PasswordRequirements newPassword={newPassword} />
                <TextInput value={newPassword} onChange={setNewPassword} placeholder='new password' />
                <TextInput value={confirmPassword} onChange={setConfirmPassword} placeholder='confirm new password' />
                </>
                }
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
