import React from 'react';

import Styles from './IconPlaceholder.module.css'

export const IconPlaceholder = ({icon: Icon}) => {
    return (
        <div className={Styles.iconWrapper}>
            <Icon className={Styles.icon} />
        </div>
    )
}
