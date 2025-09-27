import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../../components/ui/Wrappers/Card/Card';
import { clearScreenshotState } from '../../../features/Screenshot/screenshotSlice';

import styles from './ScreenshotOverlay.module.css'
import { usePermissions } from '../../../hooks/usePermissions';
import Label from '../../../components/ui/Titles/Label/Label';
import Dropdown from '../../../components/ui/Inputs/DropDown/DropDown';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { Download, Send, Trash2 } from 'lucide-react';
import { ImageComponent } from '../../../components/ui/Image/Image';
import { setExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import TextLabelError from '../../../components/Error/TextLabelError/TextLabelError';
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading';
import { getImageColor } from '../../../lib/services/getImageColor';
import { sendMessage } from '../../../features/Channel/TextChannel/Thunks/sendMessage';
import { dataUrlToFile } from '../../../lib/handlers/dataUrlToFile';
import { AnimatePresence } from 'framer-motion';
import { triggerAlert } from '../../../features/Alerts/alertsSlice';
import { downloadImage } from '../../../lib/services/helperFunctions';

export const ScreenshotOverlay = () => {

    const dispatch = useDispatch();

    const permissions = usePermissions();

    const [textChannels, setTextChannels] = useState([]);

    const [backgroundColor, setBackgroundColor] = useState(null);

    const [selected, setSelected] = useState(null);

    const {screenshot, screenshotPreview, loading, error} = useSelector(state => state.screenshotSlice);

    const channels = useSelector(state => state.channelsSlice.channels);

    React.useEffect(() => {

        setSelected(null);

        if (!permissions?.user_can_post_in_text_channels) return;

        let l_channels = [];

        for (const channel of Object.values(channels)) {
            if (channel.channel_type === 'text' && !channel.locked_channel) {
                l_channels.push(channel);
            }
        }

        setTextChannels(l_channels);

    }, [channels, permissions]);

    React.useEffect(() => {

        getImageColor(screenshotPreview).then(res => setBackgroundColor(res?.hex))

    }, [screenshotPreview])

    const handleClear = () => {
        dispatch(clearScreenshotState())    
    }

    const handleDownload = () => {
         if (window?.electron) return window?.electron?.downloadFile(screenshotPreview).then(res => {
            if (res?.status === 'success') {
                dispatch(triggerAlert('Image downloaded', 'success'))
            } else {
                dispatch(triggerAlert('Failed to download image', 'error'))
            }
        }).catch(err => dispatch(triggerAlert('Failed to download image', 'error')));

        downloadImage(screenshotPreview)
    }

    const handleSend = () => {

        if (selected?._id) {

            const message = {
                image: dataUrlToFile(screenshotPreview),
                text: 'shared a screenshot',
                channel_id: selected?._id
            }

            dispatch(sendMessage(message));

            dispatch(clearScreenshotState());

        }
    }

    if (!screenshot && !error && !loading) return null;

    return (
        <div onClick={handleClear} className={styles.screenshotOverlayWrapper}>
            <AnimatePresence>
                <Card 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            
                transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                onClick={(e) => {e.stopPropagation()}} className={styles.screenshotOverlayContainer} style={{backgroundColor, bottom: 5, right: 5}} >

                    <div onClick={() => {dispatch(setExpandedImage({image: screenshotPreview}))}} className={styles.previewContainer}>
                        <ImageComponent src={screenshotPreview} />
                    </div>
                    <Label label='Share To' />
                    {error && (<TextLabelError error={error} />)}
                    <Dropdown options={textChannels} selected={selected} selector='channel_name' setSelected={setSelected} />
                    <ToolBar>
                        <IconButton 
                        Icon={<Trash2 color='var(--error-color)' />}
                        title={'Cancel'}
                        onClick={handleClear}
                        />
                        <IconButton 
                        Icon={Download}
                        title={'Download'}
                        onClick={handleDownload}
                        />
                        {selected && (<IconButton 
                        Icon={Send}
                        title={'Send'}
                        onClick={handleSend}
                        />)}
                    </ToolBar>
                    {loading && (<SpinnerLoading />)}
                </Card>
            </AnimatePresence>
        </div>
    )
}
