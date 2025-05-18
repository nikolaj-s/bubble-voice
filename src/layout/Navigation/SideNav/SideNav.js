import React from 'react';

import styles from "./SideNav.module.css"

import { useSelector } from 'react-redux';

import { CloseMobileMenu } from '../../../components/CloseMobileMenu/CloseMobileMenu';
import { Servers } from './Servers/Servers';
import { SideNavButtons } from './SideNavButtons/SideNavButtons';
import { DashboardNavButton } from './DashboardNavButton/DashboardNavButton';
import { ServersProvider } from '../../../providers/ServersProvider/ServersProvider';

export const SideNav = () => {

    const {isServerMenuOpen} = useSelector(state => state.mobileSlice);

    return (
        <>
        <div 
        style={{
            height: window?.electron?.ipcRenderer ? 'calc(100svh - 45px)' : null
        }}
        className={`${styles.container} side-navigation-global ${isServerMenuOpen ? styles.sideNavVisible : ''}`}>
            <DashboardNavButton />
            <ServersProvider>
                <Servers />
            </ServersProvider>
            
            <SideNavButtons />
        </div>
        <CloseMobileMenu />
        </>

    )
}
