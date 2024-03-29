import React from 'react'

import "./ServerMedia.css";

import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectDisableTransitionAnimations, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Reccomendations } from './Recommendations/Reccomendations';
import { ViewSubReddit } from './ViewSubReddits/ViewSubReddit';
import { GetPostsFromSubReddit, addMoreMedia, selectCurrentSubReddit, selectLoadingNewMedia, selectLoadingSubReddit, selectMedia, selectMediaQuery, selectNextPostPage, selectScrollServerMediaScrollPosition, selectServerMediaPage, selectSubRedditSortState, setMediaQuery, setNewMedia, setScrollPosition, setServerMediaPage, toggleLoadingNewMedia } from './ServerMediaSlice';
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { ImageSearch } from '../../../../../util/ImageSearch';
import { selectServerId, throwServerError } from '../../../ServerSlice';
import {motion} from 'framer-motion';
import { clearCache } from '../../../../../util/ClearCaches';

export const ServerMedia = ({media, expand}) => {
    
    const dispatch = useDispatch();

    const [count, increaseCount] = React.useState(30);

    const loadingNewMedia = useSelector(selectLoadingNewMedia);

    const page = useSelector(selectServerMediaPage);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const loading = useSelector(selectLoadingSubReddit);

    const selectedSubReddit = useSelector(selectCurrentSubReddit);

    const nextPostPage = useSelector(selectNextPostPage);

    const sortState = useSelector(selectSubRedditSortState);

    const scrollPos = useSelector(selectScrollServerMediaScrollPosition);

    const newMedia = useSelector(selectMedia);

    const serverId = useSelector(selectServerId);

    const mediaQuery = useSelector(selectMediaQuery);

    const glassColor = useSelector(selectGlassColor);

    const disableTransition = useSelector(selectDisableTransitionAnimations);

    const handleLoadMore = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 600);
        
        dispatch(setScrollPosition(e.target.scrollTop));
        
        if (loading) return;

        if (bottom) {
            if (page === 'recommendations') {

                if (loadingNewMedia) return;

                increaseCount(count + 15);

                if (newMedia.length > 1 && newMedia.length < count) {
                    console.log(newMedia[newMedia.length - 1])
                    searchMedia(false, newMedia[newMedia.length - 1]?.tags)
                }
            } else if (page === 'subreddit') {
                dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: sortState, after: nextPostPage}))
            }   
        }

        
    }

    const setPage = (page) => {

        dispatch(setScrollPosition(0));

        document.getElementsByClassName('server-media-container')[0].scrollTop = 0;

        dispatch(setServerMediaPage(page));
    
    }

    const handleQueryInput = (value) => {
        dispatch(setMediaQuery(value));
    }

    const searchMedia = async (newSearch = true, query = false) => {

        if (newSearch) document.getElementsByClassName('server-media-container')[0].scrollTop = 0;

        if (newSearch) dispatch(setNewMedia([{}]));

        dispatch(toggleLoadingNewMedia(true));

        const images = await ImageSearch(query ? query : mediaQuery, serverId);

        dispatch(toggleLoadingNewMedia(false));

        if (images.error) return dispatch(throwServerError({error: true, errorMessage: images.errorMessage}))
        
        if (newSearch) {
            dispatch(setNewMedia(images.media));
        } else {
            dispatch(addMoreMedia(images.media));
        }

        dispatch(setMediaQuery(""));

    }

    const handleEnter = (keycode) => {
        if (keycode === 13) {
            searchMedia();
        }
    }

    React.useEffect(() => {

        try {
            
            setTimeout(() => {
                document.getElementsByClassName('server-media-container')[0].scrollTop = scrollPos;
            }, 50)
            

        } catch (err) {
            return;
        }

        return () => {
            clearCache();
        }
    // eslint-disable-next-line
    }, [page])
    
    return (
        <motion.div 
        transition={disableTransition ? {duration: 0} : {duration: 0.2}}
        className='server-media-wrappers' initial={{opacity: 0}} animate={{opacity: 1}} 
        exit={{opacity: 0}}>
            <div style={{backgroundColor: secondaryColor}} className='server-media-navigation-container'>
                    
                    <h3 onClick={() => {setPage('recommendations')}} style={{color: textColor, opacity: page === 'recommendations' ? 1 : 0.5, cursor: page === 'recommendations' ? 'default' : 'pointer', backgroundColor: page === 'recommendations' ? accentColor : null}}>Recommendations</h3>
                    <h3 onClick={() => {setPage('subreddit')}} style={{color: textColor, opacity: page === 'subreddit' ? 1 : 0.5, cursor: page === 'subreddit' ? 'default' : 'pointer', backgroundColor: page === 'subreddit' ? accentColor : null}}>Subreddits</h3>
            </div>
            {page === 'recommendations' ?
            <div className='server-media-image-search'>
                <TextInput keyCode={handleEnter} action={handleQueryInput} inputValue={mediaQuery} placeholder={'Search Media'} />
            </div>
            : null}
            <div style={{height: page === 'subreddit' ? 'calc(100% - 40px)' : page === 'screenShots' ? 'calc(100% - 40px)' : null}} onScroll={handleLoadMore} className='server-media-container'>
                
                {page === 'recommendations' ? <Reccomendations count={count} expand={expand} media={newMedia.length > 0 ? newMedia : media} /> : null}
                {page === 'subreddit' ? <ViewSubReddit expand={expand} /> : null}
                
            </div>
            
            <Loading backgroundColor={glassColor} loading={loadingNewMedia} />
        </motion.div>
        )
}
