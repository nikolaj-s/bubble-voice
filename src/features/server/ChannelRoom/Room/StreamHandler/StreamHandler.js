import React from 'react'
import { useSelector } from 'react-redux';
import { selectUsername } from '../../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { selectSoundEffectQueue } from '../../../../settings/soundEffects/soundEffectsSlice';

export const StreamHandler = ({users, client}) => {

    const user_name = useSelector(selectUsername);

    const soundEffectsQueue = useSelector(selectSoundEffectQueue);

    React.useEffect(() => {

        const streaming = document.getElementsByClassName(`${user_name}-streaming-player`)[0];

        if (client && streaming) {
            let audio = false;

            for (const user of users) {
                if ((user.username !== user_name && (user.active || user.screenshare))) {
                    audio = false;
                    break;
                }

                if (soundEffectsQueue.length > 0) {
                    audio = false;
                    break;
                }

                audio = true;
            }

            let stream_audio_id = streaming?.classList[2];

            if (stream_audio_id) {
                
                let producer_id = stream_audio_id.split('=')[1];

                if (audio === true) {
                    client.resumeProducerById(producer_id);
                } else if (audio === false) {
                    client.pauseProducerById(producer_id)
                }
            
            }

        }
            
    }, [users, client, soundEffectsQueue])

    React.useEffect(() => {

        const user = users.find(u => u.username === user_name);

        const streams = document.getElementsByClassName('streaming-video-player')

        if (streams) {
            for (const stream of streams) {
                if (user.active) {
                    stream.muted = true;
                } else {
                    stream.muted = false;
                }
            }
        }
        
    }, [users])

    return (
        <></>
    )
}
