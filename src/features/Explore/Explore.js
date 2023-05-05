import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectExploreScrollPos, selectExploreTabOpen, setExploreScrollPos } from './ExploreSlice'
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./Explore.css";
import { ViewSubReddit } from '../server/ChannelRoom/ServerDashBoard/ServerMedia/ViewSubReddits/ViewSubReddit'
import { setExpandedContent } from '../ExpandContent/ExpandContentSlice'
import { GetPostsFromSubReddit, selectCurrentSubReddit, selectLoadingSubReddit, selectNextPostPage, selectSubRedditSortState } from '../server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice'
import { TextButton } from '../../components/buttons/textButton/TextButton'

export const Explore = () => {

    const dispatch = useDispatch();

    const [mounted, toggleMounted] = React.useState(false);

    const visible = useSelector(selectExploreTabOpen);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassColor = useSelector(selectGlassColor);

    const glassState = useSelector(selectGlassState);

    const nextPostPage = useSelector(selectNextPostPage);

    const scrollPos = useSelector(selectExploreScrollPos);

    const sortState = useSelector(selectSubRedditSortState);

    const selectedSubReddit = useSelector(selectCurrentSubReddit);

    const loading = useSelector(selectLoadingSubReddit);

    const handleLoadMore = (e) => {

        if (mounted === false) return;

        dispatch(setExploreScrollPos(e.target.scrollTop))

        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 600);

        if (loading) return;

        if (bottom) {
            dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: sortState, after: nextPostPage}))
        }

    }

    const expand = (img) => {
        dispatch(setExpandedContent(img))
    }

    React.useEffect(() => {
        try {
            if (visible) {
                setTimeout(() => {
                    document.getElementsByClassName('explore-tab-inner-container')[0].scrollTop = scrollPos;
    
                    toggleMounted(true)
                }, 100)
            }
            
        } catch (e) {
            console.log(e)
        }

        return () => {
            if (!visible) toggleMounted(false)
        }

    }, [visible])

    const backToTop = () => {
        dispatch(setExploreScrollPos(0))

        document.getElementsByClassName('explore-tab-inner-container')[0].scrollTop = 0;
        
    }

    return (
        <AnimatePresence>
            {visible ? 
            <motion.div 

            style={{backgroundColor: glassState ? glassColor : secondaryColor}}
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            className='explore-tab-container'>
                <div onScroll={handleLoadMore} className='explore-tab-inner-container'>
                    <ViewSubReddit explore={true} expand={expand} />
                </div>
                {scrollPos > window.innerHeight ?
                <div className='back-to-top-container'>
                    <TextButton action={backToTop} name={"Back To Top"} />
                </div>: null}
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
