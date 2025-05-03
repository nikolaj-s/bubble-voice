import React from 'react'
import { useMediaPlayer } from '../../../../context/MediaPlayerContext'
import { PillSpacer } from '../../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { AudioLines } from 'lucide-react';
import { AbsoluteContentWrapper } from '../../../ui/Wrappers/AbsoluteContentWrapper/AbsoluteContentWrapper';
import { MediaPlayer } from '../../../MediaPlayer/MediaPlayer';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../../features/Search/searchSlice';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const MediaPlayerControls = () => {

    const dispatch = useDispatch();

    const [overlay, toggleOverlay] = React.useState(false);

    const {enabled, isPlaying, currentlyPlaying, queue, loading, next, togglePlaying} = useMediaPlayer();

    const handleOpenSearchMedia = () => {
        
        dispatch(setFilter({path: "videos"}));

        dispatch(setOverlay('search'));
    }

    if (!enabled) return null;

    return (
        <>
        {overlay && (
            <AbsoluteContentWrapper onClose={() => {toggleOverlay(false)}}>
                <MediaPlayer 
                queue={queue} 
                loading={loading} 
                currentlyPlaying={currentlyPlaying} 
                playing={isPlaying} 
                openSearchMedia={handleOpenSearchMedia}
                />
            </AbsoluteContentWrapper>
        )}
        <PillSpacer verticle={true} />
        <IconButton 
        padding={15}
        width={50}
        height={50}
        borderRadius={'50%'}
        title={'Media Player'}
        Icon={<AudioLines color='var(--text-color)' />}
        onClick={() => {toggleOverlay(!overlay)}}
        />
        </>
    )
}
