// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// state
import { selectUsersPermissions } from '../../ServerSlice';

// components
import { NotAuthorizedMessage } from '../../../../components/NotAuthorizedMessage/NotAuthorizedMessage';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';


const Wrapper = () => {

    const dispatch = useDispatch();

    const permissions = useSelector(selectUsersPermissions);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Delete Server"));

        return () => {
            setHeaderTitle("");
        }
    // eslint-disable-next-line
    }, [])

    return (
        <>
            {permissions?.server_group_name === 'Owner' ?
            <>
            <SettingsHeader title={"Delete Server"} />
            <InputTitle title={"Enter Server Password To Delete Server *there is no reversing this action"} />
            <TextInput marginBottom='2%' placeholder={"Server Password"} />
            <TextButton name={"Delete Server"} />
            </> :
            <NotAuthorizedMessage />
            }
        </>
    )
}


export const DeleteServer = () => useRoutes([
    {path: "delete-server", element: <Wrapper />}
])
