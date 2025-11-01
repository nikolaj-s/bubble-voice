import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './StreamTitleIndicator.module.css'
import { ImageComponent } from '../../ui/Image/Image';
import { Text } from '../../ui/Text/Text';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { Monitor, MonitorX } from 'lucide-react';
import { stopSharingScreen } from '../../../features/Channel/MediaControl/mediaControlSlice';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';

export const StreamTitleIndicator = () => {

    const dispatch = useDispatch();

    const {isSharing, streamIcon, streamDetails} = useSelector(state => state.screenShareSlice);

    const streamColor = useSelector(state => state.streamPreviewSlice.color);

    if (!isSharing) return null;

    return (
        <div style={{backgroundColor: streamColor}} className={styles.container}>
            <div className={styles.icon}>
                {streamIcon ?
                <ImageComponent objectFit='contain' src={streamIcon} />
                :
                <Monitor color='var(--success-color)' />
                }
            </div>
            <div className={styles.textWrapper}>
                <Subtitle>Sharing</Subtitle>
                <Text className={styles.text}>{streamDetails?.name}</Text>
            </div>
            <IconButton 
            title={'Stop Streaming'}
            Icon={<MonitorX color='var(--text-color)' opacity={0.75} />}
            onClick={() => {dispatch(stopSharingScreen())}}
            />
        </div>
    )
}
