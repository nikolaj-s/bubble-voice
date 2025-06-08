import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVoiceChannel } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { Unplug } from 'lucide-react';

export const useConnectionCtxMenu = () => {

    const dispatch = useDispatch();

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const getConnectionOptions = useCallback((options) => {

        if (currentVoiceChannel) {
            
            options.push({
                label: "Disconnect",
                onClick: () => {dispatch(setCurrentVoiceChannel(null))},
                type: "button",
                icon: <Unplug color="var(--error-color)" />,
                color: 'var(--error-color)'
            });
        } 

    }, [dispatch, currentVoiceChannel])
  
    return {getConnectionOptions};
}
