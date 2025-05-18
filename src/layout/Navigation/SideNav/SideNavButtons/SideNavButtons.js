import React from 'react';

import styles from './SideNavButtons.module.css'
import { useDispatch } from 'react-redux';
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton';
import { Plus, Settings } from 'lucide-react';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const SideNavButtons = () => {

    const dispatch = useDispatch();

    return (
        <div className={styles.navButtons}>
            <IconButton 
            onClick={() => {dispatch(setOverlay('createServer'))}}
            Icon={<Plus color='var(--text-color)' />}
            width={45}
            height={45}
            padding={10}
            position='right'
            title={<p style={{
            padding: 5,
            margin: 0,
            fontSize: '14px'
            }}>
                Create
            </p>}
            />
            <IconButton 
            Icon={<Settings color='var(--text-color)' />}
            width={45}
            height={45}
            padding={10}
            position='right'
            onClick={() => {dispatch(setOverlay("settings"))}}
            title={<p style={{
            padding: 5,
            margin: 0,
            fontSize: '14px'
            }}>
                Settings
            </p>}
            />
        </div>
    )
}
