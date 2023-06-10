import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedMedia, selectSavedMedia, selectSavedMediaOpenState } from './SavedMediaSlice'

import "./SavedMedia.css";
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { NoMedia } from '../../components/NoMedia/NoMedia';

import { Video } from '../../components/Video/Video'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { setExpandedContent } from '../ExpandContent/ExpandContentSlice';
import { Image } from '../../components/Image/Image';

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
    
    return (
        <AnimatePresence>
            {visibleState ?
            <motion.div 
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            style={{backgroundColor: glassState ? glassColor : secondaryColor}}
            className='saved-media-outer-container'>
                <div className='saved-media-inner-container'>
                    <div className='saved-media-header-wrapper'>
                        <h2 style={{color: textColor}}>Saved Media</h2>
                        <h3 style={{color: textColor}}>{savedMedia.length} / 50</h3>
                    </div>
                    {savedMedia.length === 0 ?
                    <NoMedia alt={true} message={"You Have No Saved Media, Save Media By Right Clicking On Media And Hitting Save Within The Context Menu"} />
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
            : null}
        </AnimatePresence>
    )
}
