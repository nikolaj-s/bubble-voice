import React from 'react'
import { PillSpacer } from '../../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { AudioLines } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useMediaPlayer } from '../../../../hooks/useMediaPlayer';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const MediaPlayerControls = () => {

    const dispatch = useDispatch();

    const {enabled } = useMediaPlayer();

    if (!enabled) return null;

    return (
        <>
        <PillSpacer verticle={true} />
        <IconButton 
        padding={15}
        width={50}
        height={50}
        borderRadius={'50%'}
        title={'Media Player'}
        Icon={<AudioLines color='var(--text-color)' />}
        onClick={() => {dispatch(setOverlay('mediaPlayer'))}}
        />
        </>
    )
}
