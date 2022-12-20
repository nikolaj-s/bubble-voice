import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectBanList, selectBanLoadingState, selectUsersPermissions, unBanMember } from '../../ServerSlice';
import { BanCard } from './BanCard/BanCard';
import { NoBansNotice } from './NoBansNotice/NoBansNotice';

const Wrapper = () => {

    const dispatch = useDispatch();

    const permission = useSelector(selectUsersPermissions);

    const BanList = useSelector(selectBanList);

    const loading = useSelector(selectBanLoadingState);

    React.useEffect(() => {
        dispatch(setHeaderTitle('Ban List'));

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [])

    const handleUnBanMember = (id) => {
        dispatch(unBanMember(id));
    }

    console.log(BanList)

    return (
        <>
        {permission?.user_can_ban_user ?
        <>
        <SettingsHeader title={"Server Ban List"} />
        {BanList.length === 0 ?
        <NoBansNotice />
        : BanList.map(ban => {
            return <BanCard action={() => {handleUnBanMember(ban._id)}} username={ban.username} key={ban._id} date={ban.date_banned} />
        })}
        <Loading loading={loading} />
        </>
        :
        <NotAuthorizedMessage />
        }
        </>
    )
}

export const BanList = () => useRoutes([
    {path: 'ban-list', element: <Wrapper /> }
])
