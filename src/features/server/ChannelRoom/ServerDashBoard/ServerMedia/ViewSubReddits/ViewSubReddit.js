import React from 'react'
import { InputTitle } from '../../../../../../components/titles/inputTitle/InputTitle'
import { TextInput } from '../../../../../../components/inputs/TextInput/TextInput'
import { TextButton } from '../../../../../../components/buttons/textButton/TextButton'
import { Loading } from '../../../../../../components/LoadingComponents/Loading/Loading'

import "./ViewSubReddit.css";

import { SubRedditButton } from '../../../../../../components/buttons/SubRedditButton/SubRedditButton'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { RedditPost } from '../../../../../../components/RedditPost/RedditPost'
import { useDispatch, useSelector } from 'react-redux'
import { GetPostsFromSubReddit, SubRedditSearch, selectCurrentSubReddit, selectLoadingSubReddit, selectSubRedditPosts, selectSubRedditQuery, selectSubRedditSortState, selectSubReddits, setSubReddit, setSubRedditQuery, toggleSortSubPosts } from '../ServerMediaSlice'

export const ViewSubReddit = ({expand}) => {

    const dispatch = useDispatch();

    const query = useSelector(selectSubRedditQuery);

    const loading = useSelector(selectLoadingSubReddit);

    const subReddits = useSelector(selectSubReddits);

    const selectedSubReddit = useSelector(selectCurrentSubReddit);
    
    const sortState = useSelector(selectSubRedditSortState);

    const posts = useSelector(selectSubRedditPosts);


    const handleSearchSubreddit = async () => {

        if (loading) return;

        if (query.length === 0) return;

        dispatch(SubRedditSearch({query: query}));
       
    }


    const setQeury = (v) => {
        dispatch(setSubRedditQuery(v))
    }

    const setSelectedSubReddit = (obj) => {
        if (loading) return;

        dispatch(setSubReddit(obj));

        dispatch(GetPostsFromSubReddit({subreddit: obj.url, sort: sortState}))
    }

    const setSortState = (str) => {
        if (str === sortState) return;

        dispatch(toggleSortSubPosts(str));

        dispatch(setSubReddit(selectedSubReddit));
        
        dispatch(GetPostsFromSubReddit({subreddit: selectedSubReddit.url, sort: str}))

    }

    return (
        <>
        <Loading  loading={loading} />
        <div className='implement-sub-reddit-container'>
            
            <div className='sub-reddit-finder-container'>
                <InputTitle title={"Search For Sub Subreddit"} />
                <TextInput keyCode={(keyCode) => {if (keyCode === 13) handleSearchSubreddit()}} inputValue={query} action={(value) => {setQeury(value)}} placeholder={'Subreddit'} />
                <TextButton marginTop={5} action={handleSearchSubreddit} name={"Search"} />
                
                <InputTitle title={"Results"} />
                <div className='sub-reddits-button-wrapper'>
                    {subReddits.map(red => {
                        return <SubRedditButton selected={selectedSubReddit.title === red.title} action={(v) => {setSelectedSubReddit(v)}} data={red} />
                    })}
                </div>
                {selectedSubReddit.title ? 
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
            {posts.length > 0 ? 
            <ResponsiveMasonry style={{width: '100%', marginTop: 10}} columnsCountBreakPoints={{800: 1, 1200: 2, 1400: 3}}>
                <Masonry gutter='5px'>
                    {posts.map(post => {
                        return <RedditPost action={expand} data={post} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
            : null}
        </div>
        </>
    )
}
