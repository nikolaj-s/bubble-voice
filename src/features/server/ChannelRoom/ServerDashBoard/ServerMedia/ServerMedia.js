import React from 'react'

import "./ServerMedia.css";

import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectDisableTransitionAnimations, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Reccomendations } from './Recommendations/Reccomendations';
import { ViewSubReddit } from './ViewSubReddits/ViewSubReddit';
import { GetPostsFromSubReddit, addMoreMedia, selectCurrentSubReddit, selectLoadingNewMedia, selectLoadingSubReddit, selectMedia, selectMediaQuery, selectNextPostPage, selectScrollServerMediaScrollPosition, selectServerMediaPage, selectSubRedditSortState, setMediaQuery, setNewMedia, setScrollPosition, setServerMediaPage, setVideos, toggleLoadingNewMedia } from './ServerMediaSlice';
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput';
import { Loading } from '../../../../../components/LoadingComponents/Loading/Loading';
import { ImageSearch } from '../../../../../util/ImageSearch';
import { selectServerId, throwServerError } from '../../../ServerSlice';
import {motion} from 'framer-motion';
import { clearCache } from '../../../../../util/ClearCaches';
import { setMetaData } from '../../../../ExpandContent/ExpandContentSlice';
import { ImageSearchFilterMenu } from '../../../../../components/inputs/MessageInput/ImageSearchPanel/ImageSearchFilterMenu/ImageSearchFilterMenu';
import { VideoSearch } from '../../../../../util/VideoSearch';
import { VideoMediaList } from './VideoMediaList/VideoMediaList';


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

    const [sortBy, setSortBy] = React.useState("relevance");

    const [format, setFormat] = React.useState("images");

    const [mediaLocation, setMediaLocation] = React.useState("");

    const handleLoadMore = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 600);
        
        dispatch(setScrollPosition(e.target.scrollTop));
        
        if (loading) return;

        if (bottom) {
            if (page === 'subreddit') {
                dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: sortState, after: nextPostPage}))
            }   
        }

        
    }

    const openMetaData = (data) => {
        dispatch(setMetaData(data));
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

        document.getElementsByClassName('server-media-wrappers')[0].scrollTop = 0;

        dispatch(toggleLoadingNewMedia(true));

        if (page === 'recommendations') {

            const images = await ImageSearch(query ? query : mediaQuery, serverId, format, mediaLocation, sortBy);

            if (images.error) {
                dispatch(toggleLoadingNewMedia(false));
                dispatch(throwServerError({error: true, errorMessage: images.errorMessage}));
                return;
            }
            
            dispatch(setNewMedia(images.media));
            

        } else if (page === 'videos') {
            
            const videos = await VideoSearch(query ? query : mediaQuery, serverId);

            if (videos.error) {
                dispatch(throwServerError({error: true, errorMessage: videos.errorMessage}));
                dispatch(toggleLoadingNewMedia(false));
                return;
            } 

            dispatch(setVideos(videos.media));
        }

        dispatch(toggleLoadingNewMedia(false));

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
            
            <div style={{backgroundColor: secondaryColor,
            zIndex: 4, borderRadius: 10}} className='server-media-navigation-container'>
                    
                    <h3 onClick={() => {setPage('recommendations')}} style={{color: textColor, opacity: page === 'recommendations' ? 1 : 0.5, cursor: page === 'recommendations' ? 'default' : 'pointer', backgroundColor: page === 'recommendations' ? accentColor : null}}>Images</h3>
                    <h3 onClick={() => {setPage('videos')}} style={{color: textColor, opacity: page === 'videos' ? 1 : 0.5, cursor: page === 'videos' ? 'default' : 'pointer', backgroundColor: page === 'videos' ? accentColor : null}}>Videos</h3>
                    <h3 onClick={() => {setPage('subreddit')}} style={{color: textColor, opacity: page === 'subreddit' ? 1 : 0.5, cursor: page === 'subreddit' ? 'default' : 'pointer', backgroundColor: page === 'subreddit' ? accentColor : null}}>Subreddits</h3>
            </div>
            {page === 'recommendations' || page === "videos" ?
            <div 
            style={{backgroundColor: secondaryColor, zIndex: 2}}
            className='server-media-image-search'>
                <TextInput showSearchIcon={true} keyCode={handleEnter} action={handleQueryInput} inputValue={mediaQuery} placeholder={'Search Media'} />
                {page === 'videos' ? null : <ImageSearchFilterMenu videoSort={page === 'videos'} format={format} mediaLocation={mediaLocation} setMediaLocation={setMediaLocation} setSortBy={setSortBy} sortBy={sortBy} updateFormat={setFormat} />}
            </div>
            : null}
           
            <div style={{height: 'auto'}} onScroll={handleLoadMore} className='server-media-container'>
                
                {page === 'recommendations' ? <Reccomendations openMetaData={openMetaData} count={count} expand={expand} media={newMedia.length > 0 ? newMedia : media} /> : null}
                {page === 'subreddit' ? <ViewSubReddit expand={expand} /> : null}
                {page === 'videos' ? <VideoMediaList /> : null}
            </div>
            
            <Loading backgroundColor={glassColor} loading={loadingNewMedia} />
        </motion.div>
        )
}
