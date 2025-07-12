import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthorizedUserSelector.module.css';
import TextInput from '../ui/Inputs/TextInput/TextInput';
import { Card } from '../ui/Wrappers/Card/Card';

export const AuthorizedUserSelector = ({ users, authorizedUsers, onChange }) => {

    const [filter, setFilter] = useState("");

    const handleToggle = (userId) => {
        const isAuthorized = !!authorizedUsers[userId];
        let newAuth;
        if (isAuthorized) {
        // Remove the key to revoke authorization
        const { [userId]: _, ...rest } = authorizedUsers;
        newAuth = rest;
        } else {
        // Add the key to grant authorization
        newAuth = { ...authorizedUsers, [userId]: true };
        }
        onChange(newAuth);
    };

    return (
        <Card>
        <TextInput placeholder='filter' onChange={setFilter} value={filter} />
        {Object.values(users).filter(u => u.display_name.toLowerCase().startsWith(filter.toLowerCase())).map((user) => (
            <label key={user.user_id} className={styles.userRow}>
                <img
                    src={user.user_image}
                    alt={user.username}
                    className={styles.avatar}
                />
                <span className={styles.name}>{user.display_name}</span>
                <input
                    type="checkbox"
                    checked={!!authorizedUsers[user.user_id]}
                    onChange={() => handleToggle(user.user_id)}
                />
            </label>
        ))}
        </Card>
    );
};