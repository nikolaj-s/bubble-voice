import React from 'react'
import { InputTitle } from '../../../../../../components/titles/inputTitle/InputTitle'
import { TextInput } from '../../../../../../components/inputs/TextInput/TextInput'
import { TextButton } from '../../../../../../components/buttons/textButton/TextButton'
import { Loading } from '../../../../../../components/LoadingComponents/Loading/Loading'

import "./ViewSubReddit.css";

import { SubRedditButton } from '../../../../../../components/buttons/SubRedditButton/SubRedditButton'


import { RedditPost } from '../../../../../../components/RedditPost/RedditPost'
import { useDispatch, useSelector } from 'react-redux'
import { GetPostsFromSubReddit, SubRedditSearch, selectCurrentRedditIndex, selectCurrentSubReddit, selectFullModeState, selectLoadingSubReddit, selectNextPostPage, selectSubRedditPosts, selectSubRedditQuery, selectSubRedditSortState, selectSubReddits, setRedditIndex, setSubReddit, setSubRedditQuery, toggleFullMode, toggleSortSubPosts } from '../ServerMediaSlice'
import { ExpandButton } from '../../../../../../components/buttons/ExpandButton/ExpandButton'
import { AnimatePresence, motion } from 'framer-motion'
import { selectGlassColor, selectGlassPrimaryColor, selectSecondaryColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { CloseIcon } from '../../../../../../components/Icons/CloseIcon/CloseIcon'
import { setExpandedContent } from '../../../../../ExpandContent/ExpandContentSlice'

export const ViewSubReddit = ({expand, explore, disableFullMode, subreddit, subreddit_name}) => {

    const dispatch = useDispatch();

    const query = useSelector(selectSubRedditQuery);

    const loading = useSelector(selectLoadingSubReddit);

    const subReddits = useSelector(selectSubReddits);

    const selectedSubReddit = useSelector(selectCurrentSubReddit);
    
    const sortState = useSelector(selectSubRedditSortState);

    const secondaryColor = useSelector(selectSecondaryColor);

    const nextPostPage = useSelector(selectNextPostPage);

    const posts = useSelector(selectSubRedditPosts);

    const index = useSelector(selectCurrentRedditIndex);

    const fullMode = useSelector(selectFullModeState);

    const glassColor = useSelector(selectGlassPrimaryColor);

    const [reverse, toggleReverse] = React.useState(false);

    const handleSearchSubreddit = async () => {

        if (loading) return;

        if (query.length === 0) return;

        dispatch(SubRedditSearch({query: query}));
       
        dispatch(setRedditIndex(0))
    }


    const setQeury = (v) => {
        dispatch(setSubRedditQuery(v))
    }

    const setSelectedSubReddit = (obj) => {
        if (loading) return;

        dispatch(setSubReddit(obj));

        dispatch(GetPostsFromSubReddit({subreddit: obj.url, sort: sortState}))

        dispatch(setRedditIndex(0))
    }

    const setSortState = (str) => {
        if (str === sortState) return;

        dispatch(toggleSortSubPosts(str));

        dispatch(setSubReddit(selectedSubReddit));
        
        dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: str}))

        dispatch(setRedditIndex(0))

    }

    const handleIndex = (e) => {

        if (loading) return;

        if (e.deltaY === 100) {
            if (posts.length - 1 === index) {
                return dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: sortState, after: nextPostPage}))
            }
            toggleReverse(false);
            dispatch(setRedditIndex(index + 1));
        } else {
            if (index === 0) return;
            toggleReverse(true)
            dispatch(setRedditIndex(index - 1));
        }
    }
    console.log(subreddit)
    React.useEffect(() => {

        const el = document.getElementsByClassName('server-media-wrappers')[0];

        if (!el) return;

        if (fullMode) {
            el.style.overflowY = 'hidden';
        } else {
            el.style.overflowY = 'auto'
        }

        return () => {
            el.style.overflowY = 'auto'
        }
    }, [fullMode])

    React.useEffect(() => {
        
        if (subreddit === selectedSubReddit.url) return;

        if (subreddit) {
            setSelectedSubReddit({url: subreddit, title: subreddit_name});
        }

    }, [subreddit, selectedSubReddit])

    const handleLoadMore = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 600);

        if (loading) return;

        if (bottom) {
            dispatch(GetPostsFromSubReddit({subreddit: subreddit, sort: sortState}));
        }
    }

    const handleExpand = (value) => {
        dispatch(setExpandedContent(value))
    }

    return (
        <>
        {fullMode ?
        <AnimatePresence>
        <motion.div 
        initial={{translateY: reverse ? '-100%' : '100%'}}
        animate={{translateY: '0%'}}
        exit={{translateY: reverse ? '100%' : '-100%'}}
        key={posts[index]?.id}
        onWheel={(e) => {handleIndex(e)}}
        className='subreddit-full-mode'>
            <div onClick={() => {dispatch(toggleFullMode())}} className='exit-full-mode-container'>
                <CloseIcon />
            </div>
            <RedditPost disableMax={true} action={expand} data={posts[index]} />
        </motion.div>
        </AnimatePresence> :
        null}
        {fullMode ?
        <div className='full-mode-navigation'>

        </div>
        : null}
        <Loading  loading={loading} />
        <div  className='implement-sub-reddit-container'>
            <div onScroll={handleLoadMore} className='view-sub-reddit-wrapper'>
            <div className='sub-reddit-finder-container'>
                {subreddit ? null :
                <>
                <InputTitle title={"Search For Sub Subreddit"} />
                <TextInput keyCode={(keyCode) => {if (keyCode === 13) handleSearchSubreddit()}} inputValue={query} action={(value) => {setQeury(value)}} placeholder={'Subreddit'} />
                <TextButton marginTop={5} action={handleSearchSubreddit} name={"Search"} />
                
                <InputTitle title={"Results"} />
                <div className='sub-reddits-button-wrapper'>
                    {subReddits.map(red => {
                        return <SubRedditButton selected={selectedSubReddit.title === red.title} action={(v) => {setSelectedSubReddit(v)}} data={red} />
                    })}
                </div>
                </>
                }
                {selectedSubReddit?.title ? 
                <>
                <InputTitle title={`Sort ${selectedSubReddit.title} posts by:`} />
                <div className='sort-by-reddit-container'>
                    <TextButton altInvert={true} action={() => {setSortState('new')}} toggled={sortState === 'new'} name={'New'} />
                    <TextButton altInvert={true} action={() => {setSortState('hot')}} toggled={sortState === 'hot'} name={'Hot'} />
                    <TextButton altInvert={true} action={() => {setSortState('top')}} toggled={sortState === 'top'} name={'Top'} />
                  
                </div>
                
                </>
                : null}
            </div>
            <div  className='subreddit-feed-wrapper'>
                {posts.length > 0 ? 
                    posts.map(post => {
                        return <RedditPost action={handleExpand} data={post} />
                    })
                : null}
            </div>
            </div>
        </div>
        </>
    )
}
