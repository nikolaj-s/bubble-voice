import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedMedia, selectSavedMedia, selectSavedMediaOpenState, toggleMediaPanel } from './SavedMediaSlice'

import "./SavedMedia.css";
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { NoMedia } from '../../components/NoMedia/NoMedia';

import { Video } from '../../components/Video/Video'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { setExpandedContent } from '../ExpandContent/ExpandContentSlice';
import { Image } from '../../components/Image/Image';
import { NoSavesIcon } from '../../components/Icons/NoSavesIcon/NoSavesIcon';

export const SavedMedia = () => {

    const dispatch = useDispatch();

    const visibleState = useSelector(selectSavedMediaOpenState);

    const [saves, setSaves] = React.useState([]);

    const savedMedia = useSelector(selectSavedMedia);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        dispatch(fetchSavedMedia());

    }, [])

    React.useEffect(() => {

        if (visibleState) {
            setTimeout(() => {
                setSaves(savedMedia)
            }, 200)
        } else {
            setSaves([])
        }
        

    }, [savedMedia, visibleState])

    const expand = (media) => {
        dispatch(setExpandedContent(media))
    }

    const close = () => {
        dispatch(toggleMediaPanel(false));
    }
    
    return (
        <AnimatePresence>
            {visibleState ?
            <div onClick={close} className='side-tab-outer-container'>
                <motion.div 
                onClick={(e) => {e.stopPropagation()}}
                initial={{opacity: 0, marginLeft: '-600px'}}
                animate={{opacity: 1, marginLeft: 0}}
                exit={{opacity: 0, marginLeft: '-600px'}}
                style={{backgroundColor: glassState ? glassColor : secondaryColor}}
                className='saved-media-outer-container'>
                    <div className='saved-media-inner-container'>
                        {savedMedia.length === 0 ?
                        <NoSavesIcon className={'no-saves-icon'} />
                        : 
                        <ResponsiveMasonry style={{width: '100% - 10px', margin: '0px 5px'}} columnsCountBreakPoints={{1000: 1}}>
                            <Masonry gutter='5px'> 
                                {saves.map(media => {
                                return <div style={{borderRadius: 5, overflow: 'hidden'}}>
                                        {media.type === 'image' ?
                                        <Image cursor='pointer' image={media.media} expandContent={() => {expand(media.media)}} />
                                        :
                                        <Video  video={media.media} />}
                                    </div>
                                })}
                        </Masonry>
                        </ResponsiveMasonry>
                        }
                    </div>
                </motion.div>
            </div>
            : null}
        </AnimatePresence>
    )
}
