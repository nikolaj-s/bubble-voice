import React from 'react'

import "./ServerMedia.css";

import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Reccomendations } from './Recommendations/Reccomendations';
import { ViewSubReddit } from './ViewSubReddits/ViewSubReddit';
import { GetPostsFromSubReddit, selectCurrentSubReddit, selectLoadingSubReddit, selectNextPostPage, selectScrollServerMediaScrollPosition, selectServerMediaPage, selectSubRedditSortState, setScrollPosition, setServerMediaPage } from './ServerMediaSlice';

export const ServerMedia = ({media, expand}) => {
    
    const dispatch = useDispatch();

    const [count, increaseCount] = React.useState(30);

    const page = useSelector(selectServerMediaPage);

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const loading = useSelector(selectLoadingSubReddit);

    const selectedSubReddit = useSelector(selectCurrentSubReddit);

    const nextPostPage = useSelector(selectNextPostPage);

    const sortState = useSelector(selectSubRedditSortState);

    const scrollPos = useSelector(selectScrollServerMediaScrollPosition);

    const handleLoadMore = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 600);
        
        dispatch(setScrollPosition(e.target.scrollTop));
        
        if (loading) return;

        if (bottom) {
            if (page === 'recommendations') {
                increaseCount(count + 15)
            } else {
                dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: sortState, after: nextPostPage}))
            }   
        }

        
    }

    const setPage = (page) => {

        dispatch(setScrollPosition(0));

        document.getElementsByClassName('server-media-container')[0].scrollTop = 0;

        dispatch(setServerMediaPage(page));
    
    }

    React.useEffect(() => {

        try {
            
            setTimeout(() => {
                document.getElementsByClassName('server-media-container')[0].scrollTop = scrollPos;
            }, 50)
            

        } catch (err) {
            return;
        }
    }, [page])
    
    return (
        <>
            <div style={{backgroundColor: secondaryColor}} className='server-media-navigation-container'>
                    <h3 onClick={() => {setPage('recommendations')}} style={{color: textColor, opacity: page === 'recommendations' ? 1 : 0.5, cursor: page === 'recommendations' ? 'default' : 'pointer', backgroundColor: page === 'recommendations' ? accentColor : null}}>Recommendations</h3>
                    <h3 onClick={() => {setPage('subreddit')}} style={{color: textColor, opacity: page === 'subreddit' ? 1 : 0.5, cursor: page === 'subreddit' ? 'default' : 'pointer', backgroundColor: page === 'subreddit' ? accentColor : null}}>Subreddits</h3>
            </div>
            <div onScroll={handleLoadMore} className='server-media-container'>
                
                {page === 'recommendations' ? <Reccomendations count={count} expand={expand} media={media} /> : null}
                {page === 'subreddit' ? <ViewSubReddit expand={expand} /> : null}
            
            </div>
        </>
        )
}
