
import { PillSpacer } from '../../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../../ui/Buttons/IconButton/IconButton';
import { AudioLines } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setOverlay } from '../../../../features/Overlay/overlaySlice';

export const MediaPlayerControls = () => {

    const dispatch = useDispatch();

    const {enabled } = useSelector(state => state.mediaPlayerSlice);

    if (!enabled) return null;

    return (
        <div data-context={JSON.stringify({type: 'mediaplayer'})} style={{display: 'flex', height: '100%', alignItems: 'center'}}>
        
        <IconButton 
        
        key={'media-player-button'}
        padding={15}
        width={50}
        height={50}
        borderRadius={'50%'}
        title={'Media Player'}
        Icon={<AudioLines color='var(--text-color)' />}
        onClick={() => {dispatch(setOverlay('mediaPlayer'))}}
        />
        <PillSpacer verticle={true} />
        </div>
    )
}
