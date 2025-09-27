
import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper';

import { Profile } from '../../../components/Profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton';
import { Power } from 'lucide-react';
import StatusSwitcher from '../../../components/ui/StatusSwitcher/StatusSwitcher';
import { updateAccountStatus } from '../../../features/Account/Thunks/updateAccountStatus';
import Label from '../../../components/ui/Titles/Label/Label';
import { logout } from '../../../features/Auth/authSlice';
import NotificationMuteToggle from '../../../components/NotifcationMuteToggle/NotifcationMuteToggle';
import { toggleMuteNotifications } from '../../../features/Notifications/notificationsSlice';

export const UserQuickMenu = ({close}) => {

    const dispatch = useDispatch();

    const {account, updateLoading} = useSelector(state => state.accountSlice);

    const muteNotifications = useSelector(state => state.notificationsSlice.muteNotifications);

    const handleUpdateStatus = (status) => {
        if (updateLoading) return;

        dispatch(updateAccountStatus(status));
      
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <QuickMenuWrapper close={close}>
            <Profile account={account} options={true} />
            <Label label='Status:' margin={'5px 0px 0px 5px'} />
            <StatusSwitcher onChange={handleUpdateStatus} {...account} />
            
            <div style={{width: 'calc(100% - 20px)', margin: '5px auto', display: 'flex', flexDirection: 'column', paddingBottom: 10, gap: 'var(--gap)'}}>
                <LineSpacer />
                <NotificationMuteToggle value={muteNotifications} onChange={() => {dispatch(toggleMuteNotifications(!muteNotifications))}} />
                <TextButton action={handleLogout} title='Log Out' backgroundColor={'var(--error-color)'} icon={<Power size={15} strokeWidth={3} color='var(--text-color)' />} />
            </div>
            
        </QuickMenuWrapper>
    )
}
