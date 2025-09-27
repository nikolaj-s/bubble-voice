
import styles from './SideNavButtons.module.css'
import { useDispatch } from 'react-redux';
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton';
import {  Plus, Settings, Download } from 'lucide-react';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';
import { PillSpacer } from '../../../../components/ui/Spacers/PillSpacer/PillSpacer';
import { ConversationsButton } from './ConversationsButton/ConversationsButton';

export const SideNavButtons = () => {

    const dispatch = useDispatch();

    return (
        <div className={styles.navButtons}>
            {!window?.electron && (
            <>
            <IconButton 
            Icon={Download}
            width={50}
            height={50}
            padding={15}
            position='right'
            title={<p style={{
            padding: 5,
            margin: 0,
            fontSize: '14px'
            }}>
                Download The Bubble App
            </p>}
            onClick={() => {dispatch(setOverlay('downloadApp'))}}
            />
            <PillSpacer />
            </>)}
            <ConversationsButton />
            <IconButton 
            onClick={() => {dispatch(setOverlay('createServer'))}}
            Icon={<Plus color='var(--text-color)' />}
            width={50}
            height={50}
            padding={15}
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
            width={50}
            height={50}
            padding={15}
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
