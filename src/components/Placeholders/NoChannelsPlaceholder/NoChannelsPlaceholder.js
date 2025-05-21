import React from 'react';
import styles from './NoChannelsPlaceholder.module.css';
import { PlusCircle } from 'lucide-react';
import TextButton from '../../ui/Buttons/TextButton/TextButton';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../features/Overlay/overlaySlice';

export const NoChannelsPlaceholder = () => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams(); 

    const openCreateChannels = () => {
        setSearchParams({section: 'createChannel'});

        dispatch(setOverlay('serverSettings'));
    }

    return (
        <div className={styles.wrapper}>
        <h3 className={styles.title}>No Channels</h3>
        <p className={styles.blurb}>
            Every quest begins with a first step... or in this case, a first channel. 🛠️
        </p>
        <TextButton action={openCreateChannels} icon={<PlusCircle size={18} color='var(--text-color)' />} title='Create' />
        </div>
    );
};
