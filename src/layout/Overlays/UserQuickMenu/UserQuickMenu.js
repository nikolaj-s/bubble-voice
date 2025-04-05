
import React from 'react';

import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper';

import { Profile } from '../../../components/Profile/Profile';

import { useSelector } from 'react-redux';

export const UserQuickMenu = ({close}) => {

    const {account} = useSelector(state => state.accountSlice);

    return (
        <QuickMenuWrapper close={close}>
            <Profile account={account} />
        </QuickMenuWrapper>
    )
}
