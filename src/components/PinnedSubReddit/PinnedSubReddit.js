import React from 'react'
import Masonry from 'react-responsive-masonry';
import { RedditPost } from '../RedditPost/RedditPost';
import { Loading } from '../LoadingComponents/Loading/Loading';

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadedSubreddits, setLoadedSubReddit } from '../../features/server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice';
import { CloseIcon } from '../Icons/CloseIcon/CloseIcon';
import { selectAccentColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { PinIcon } from '../Icons/PinIcon/PinIcon'

export const PinnedSubReddit = ({subreddit, onLoad, editing, remove = () => {}}) => {

    const dispatch = useDispatch();

    const accentColor = useSelector(selectAccentColor);
    
    const textColor = useSelector(selectTextColor);

    const [loading, toggleLoading] = React.useState(false);

    const [posts, setPosts] = React.useState([]);

    const [index, setIndex] = React.useState(0);

    const [error, toggleError] = React.useState(false);

    const loadedSubreddits = useSelector(selectLoadedSubreddits);

    const fetchPosts = async () => {
        toggleLoading(true);

        const data = await Axios.get(`http://www.reddit.com${subreddit.url}top/.json?t=day`)
        .then(data => {
            
            return {posts: data.data.data.children.map(c => {return {...c.data}}), after: data.data.data.after};
        
        })
        
        if (data.posts) {
            setPosts(data.posts);

            setIndex(Math.floor(Math.random() * data.posts.length));
            
            dispatch(setLoadedSubReddit({subreddit: subreddit.url, posts: data.posts}));
        
        }

        toggleLoading(false);

    }

    React.useEffect(() => {

        if (!loadedSubreddits[subreddit?.url]) {

            fetchPosts();

        } else {
            
            setPosts(loadedSubreddits[subreddit?.url]);

            setIndex(Math.floor(Math.random() * posts.length));

            toggleLoading(false);
        
        }

    }, [])

    const handleRemove = () => {
        remove(subreddit.url);
    }

    const handleOpen = (data) => {
        dispatch(setExpandedContent(data))
    }

    return (
        <div className='pinned-sub-reddit-container'>
            {editing ? 
            <div 
            style={{
                backgroundColor: accentColor
            }}
            onClick={handleRemove}
            className='remove-pinned-sub-button'>
                <CloseIcon />
            </div>
            : 
            null}
            {posts.length > 0 ? <RedditPost action={handleOpen} data={posts[index]} /> : null}
            <Loading loading={loading} />
        </div>
    )
}
