
import React from 'react';

import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper';

import { Profile } from '../../../components/Profile/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import TextButton from '../../../components/ui/Buttons/TextButton/TextButton';
import { UserPen } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import StatusSwitcher from '../../../components/ui/StatusSwitcher/StatusSwitcher';
import { updateAccountStatus } from '../../../features/Account/Thunks/updateAccountStatus';
import Label from '../../../components/ui/Titles/Label/Label';

export const UserQuickMenu = ({close}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const {account, updateLoading} = useSelector(state => state.accountSlice);

    const openAccountSettings = () => {
        setSearchParams({section: 'account'});

        dispatch(setOverlay('settings'));
    }

    const handleUpdateStatus = (status) => {
        if (updateLoading) return;

        dispatch(updateAccountStatus(status));
        console.log(status)
    }

    return (
        <QuickMenuWrapper close={close}>
            <Profile account={account} />
            <Label label='Status:' margin={'5px 0px 0px 5px'} />
            <StatusSwitcher onChange={handleUpdateStatus} {...account} />
            
            <div style={{width: 'calc(100% - 20px)', margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 10}}>
                <LineSpacer />
                <TextButton action={openAccountSettings} title='Edit Account' icon={<UserPen size={15} color='var(--text-color)' />} />
                <LineSpacer />
                <TextButton title='Log Out' backgroundColor={'var(--error-color)'} />
            </div>
            
        </QuickMenuWrapper>
    )
}
