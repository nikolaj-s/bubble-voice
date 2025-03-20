import React from 'react'

import styles from './UsersBar.module.css';
import { ServerUsersProvider } from '../../../providers/ServerUsersProvider/ServerUsersProvider';
import { useSelector } from 'react-redux';
import UserButton from '../../../components/Buttons/UserButton/UserButton';

export const UserBar = () => {
    try {
    const users = useSelector(state => state.serverUsersSlice.users);
  
    return (
        <div className={styles.container}>
            <ServerUsersProvider>
                {!users ?
                <></> :
                Object.values(users)?.map(user => {
                    return <UserButton {...user} key={user.user_id} />
                })}
            </ServerUsersProvider>
        </div>
    )
    } catch (error) {
        return <></>
    } 
}

