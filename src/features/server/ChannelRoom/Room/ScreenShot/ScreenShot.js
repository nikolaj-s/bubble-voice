import React from 'react'
import { useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { Image } from '../../../../../components/Image/Image';

import './ScreenShot.css';
import { sendMessage } from '../../../SocialSlice';
import { playSoundEffect } from '../../../../settings/soundEffects/soundEffectsSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { throwServerError } from '../../../ServerSlice';

export const ScreenShot = ({channelId, username}) => {

    const [loading, toggleLoading] = React.useState(false);

    const [image, setImage] = React.useState({});

    const dispatch = useDispatch();

    React.useEffect(() => {
        
        let ipcRenderer;

        let timeOut;

        let spam_stopper = false;

        let options = {maxSizeMB: 0.6, maxIteration: 30}

        try {

            ipcRenderer = window.require('electron').ipcRenderer;

            const handleScreenShot = async () => {

                if (loading || spam_stopper) return;

                spam_stopper = true;

                dispatch(playSoundEffect({default: "screenShot"}));

                toggleLoading(true);

                await ipcRenderer.invoke('SCREEN_SHOT').then(async data => {
                    if (data.error) return dispatch(throwServerError({errorMessage: data.error}));
                    
                    setImage({preview: data.preview});
                    
                    let blob = await fetch(data.preview)
                    .then(res => res.blob())

                    let compressed = await imageCompression(blob, options);

                    const file = Object.assign(compressed, {name: 'screenshot.jpg', lastModified: Date.now()})
                   
                    let local_id = ((Math.random(5 * Math.random(55)) + 1) * 5) + username;
                    
                    dispatch(sendMessage({username: username, file: file, channel_id: channelId, local_id: local_id, text: `Shared A Screen Shot Of ${data.text}`, image_preview: data?.preview, screen_shot: true}))
                    
                    setTimeout(() => {
                        setImage({});

                        setTimeout(() => {
    
                            toggleLoading(false);
    
                            spam_stopper = false;

                            URL.revokeObjectURL(data.preview);
    
                        }, 5000)
                        
                    }, 1000)
                }).catch(err => {
                    dispatch(throwServerError({errorMessage: "Error Capturing Screen Shot"}));

                    setTimeout(() => {
                        spam_stopper = false;
                        toggleLoading(false);
                    }, 5000)
                })

                
            }

            ipcRenderer.on('screen shot', handleScreenShot);
            
            
            return () => {
                ipcRenderer?.off('screen shot', handleScreenShot);
            }
        
        } catch (err) {
            console.log(err)
            return;
        }

    }, [])

    return (
        <>
        <AnimatePresence>
            {image.preview ?
            <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} key={'screen-shot-display-preview'} className='screen-shot-display-container'>
                <Image objectFit='contain' img_id={'screen-shot-selector'} image={image.preview} />
            </motion.div>
            : null}
        </AnimatePresence>
        </>
    )
}
