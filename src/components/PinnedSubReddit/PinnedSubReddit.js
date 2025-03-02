import React from 'react'
import { RedditPost } from '../RedditPost/RedditPost';
import { Loading } from '../LoadingComponents/Loading/Loading';

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadedSubreddits, setLoadedSubReddit } from '../../features/server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice';
import { CloseIcon } from '../Icons/CloseIcon/CloseIcon';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';

export const PinnedSubReddit = ({subreddit, onLoad, editing, remove = () => {}, mediaOfTheDay}) => {

    const dispatch = useDispatch();

    const accentColor = useSelector(selectAccentColor);
    
    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

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
    console.log(mediaOfTheDay)
    return (
        <div 
        style={{backgroundColor: editing ? primaryColor : null, borderRadius: editing ? 10 : null, margin: editing ? 3 : 0}}
        className={`pinned-sub-reddit-container`}>
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
            {editing ?
            <h3 style={{color: textColor, width: 'auto', margin: '10px'}}>{subreddit.url}</h3>
            :
            posts.length > 0 ? <RedditPost pinned={true} action={handleOpen} data={posts[index]} /> : null}
            <Loading loading={loading} />
        </div>
    )
}
