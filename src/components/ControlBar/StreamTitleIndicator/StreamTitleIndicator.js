import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './StreamTitleIndicator.module.css'
import { ImageComponent } from '../../ui/Image/Image';
import { Text } from '../../ui/Text/Text';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { MonitorX } from 'lucide-react';
import { stopSharingScreen } from '../../../features/Channel/MediaControl/mediaControlSlice';

export const StreamTitleIndicator = () => {

    const dispatch = useDispatch();

    const {isSharing, streamIcon, streamDetails} = useSelector(state => state.screenShareSlice);

    if (!isSharing) return null;

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <ImageComponent objectFit='contain' src={streamIcon} />
            </div>
            <Text className={styles.text}>{streamDetails?.name}</Text>
            <IconButton 
            title={'Stop Streaming'}
            Icon={<MonitorX color='var(--text-color)' opacity={0.75} />}
            onClick={() => {dispatch(stopSharingScreen())}}
            />
        </div>
    )
}
