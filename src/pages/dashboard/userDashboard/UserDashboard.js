import React from 'react'
import { UserDashboardLayoutWrapper } from '../../../components/ui/Wrappers/UserDashboardLayoutWrapper/UserDashboardLayoutWrapper'
import { Route, Routes } from 'react-router'

import styles from './UserDashboard.module.css'
import { UserDashboardMenu } from './userDashboardMenu/UserDashboardMenu'
import { ControlBar } from '../../../components/ControlBar/ControlBar'
import { Banner } from '../../../components/Banner/Banner'
import { useSelector } from 'react-redux'
import { Notices } from '../../../components/Notices/Notices'
import { UserRecommendations } from './userRecommendations/UserRecommendations'

export const UserDashboard = () => {

    const {user_banner} = useSelector(state => state.accountSlice.account)

    return (
        <UserDashboardLayoutWrapper>
            <section className={styles.sectionOne}>
                <Banner image={user_banner} />
                <UserDashboardMenu />
                <ControlBar key={'control-bar'} inChannel={false} />
            </section>
            <section className={styles.sectionTwo}>
                <Routes>
                    <Route path="/" element={<Notices />} />
                    <Route path="/your-recommendations" element={<UserRecommendations />} />
                </Routes>
            </section>
        </UserDashboardLayoutWrapper>
    )
}
