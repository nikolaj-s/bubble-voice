
import { UserDashboardLayoutWrapper } from '../../../components/ui/Wrappers/UserDashboardLayoutWrapper/UserDashboardLayoutWrapper'
import { Route, Routes } from 'react-router'

import styles from './UserDashboard.module.css'
import { UserDashboardMenu } from './userDashboardMenu/UserDashboardMenu'
import { ControlBar } from '../../../components/ControlBar/ControlBar'
import { Banner } from '../../../components/Banner/Banner'
import { useSelector } from 'react-redux'
import { Notices } from '../../../components/Notices/Notices'
import { UserRecommendations } from './userRecommendations/UserRecommendations'
import { CloseMobileMenu } from '../../../components/CloseMobileMenu/CloseMobileMenu'

export const UserDashboard = () => {

    const {user_banner} = useSelector(state => state.accountSlice.account)

    const {isChannelMenuOpen} = useSelector(state => state.mobileSlice)

    return (
        <UserDashboardLayoutWrapper>
            <CloseMobileMenu />
            <section 
            style={{height: window?.electron?.ipcRenderer ? 'calc(100svh - 70px)' : null}}
            className={`${styles.sectionOne} ${isChannelMenuOpen ? styles.sectionOneMobile : ''}`}>
                <Banner padding={5} image={user_banner} />
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
