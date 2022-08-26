import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectUsersPermissions } from '../../ServerSlice';

const Wrapper = () => {

    const dispatch = useDispatch();

    const permission = useSelector(selectUsersPermissions);

    React.useEffect(() => {
        dispatch(setHeaderTitle('Ban List'));

        return () => {
            dispatch(setHeaderTitle(""));
        }
    // eslint-disable-next-line
    }, [])

    return (
        <>
        {permission.user_can_ban_user ?
        <></>

        :
        <NotAuthorizedMessage />
        }
        </>
    )
}

export const BanList = () => useRoutes([
    {path: 'ban-list', element: <Wrapper /> }
])
