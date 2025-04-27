import { Images, Megaphone, User } from 'lucide-react'
import React from 'react'
import { SubNav } from '../../../../components/Navigation/SubNav/SubNav'

import styles from './UserDashboardMenu.module.css'

export const UserDashboardMenu = () => {

    const basePath = '/dashboard'

    const navOptions = [
        
        {
            label: "Notices",
            path: `${basePath}/`,
            icon: <Megaphone color='var(--text-color)' />
        },
        {
            label: "Your Account",
            path: `${basePath}/account`,
            icon: <User color='var(--text-color)' />
        },
        {
            label: "Your Recommendations",
            path: `${basePath}/your-recommendations`,
            icon: <Images color='var(--text-color)' />
        },
        
    ]

    return (
        <div className={styles.container}>
        <SubNav 
        options={navOptions}
        basePath={basePath}
        />
        </div>
    )
}
