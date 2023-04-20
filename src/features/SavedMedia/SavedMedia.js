import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedMedia, selectSavedMedia, selectSavedMediaOpenState } from './SavedMediaSlice'

import "./SavedMedia.css";
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { NoMedia } from '../../components/NoMedia/NoMedia';

import { Video } from '../../components/Video/Video'
import {ImagePreview} from '../../components/ImagePreview/ImagePreview';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { setExpandedContent } from '../ExpandContent/ExpandContentSlice';
import { Image } from '../../components/Image/Image';

export const SavedMedia = () => {

    const dispatch = useDispatch();

    const visibleState = useSelector(selectSavedMediaOpenState);

    const savedMedia = useSelector(selectSavedMedia);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    React.useEffect(() => {

        dispatch(fetchSavedMedia());

    }, [])

    const expand = (media) => {
        dispatch(setExpandedContent(media))
    }

    return (
        <AnimatePresence>
            {visibleState ?
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            style={{backgroundColor: glassState ? glassColor : secondaryColor}}
            className='saved-media-outer-container'>
                <div className='saved-media-inner-container'>
                    {savedMedia.length === 0 ?
                    <NoMedia alt={true} message={"No Saved Media"} />
                    : 
                    <ResponsiveMasonry columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3, 1900: 4, 2500: 5}}>
                        <Masonry gutter='5px'> 
                            {savedMedia.map(media => {
                               return <div style={{borderRadius: 5, overflow: 'hidden'}}>
                                    {media.type === 'image' ?
                                    <Image image={media.media} expandContent={() => {expand(media.media)}} />
                                    :
                                    <Video  video={media.media} />}
                                </div>
                            })}
                    </Masonry>
                    </ResponsiveMasonry>
                    }
                </div>
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
