// library's
import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

// component's
import { Loading } from '../LoadingComponents/Loading/Loading'

// style's
import "./TwitterEmbed.css";

export const TwitterEmbed = ({id}) => {

    const [loading, toggleLoading] = React.useState(true);

    const handleOnLoad = () => {
        toggleLoading(false);
    }

    return (
        <>
        {id ?
        <div className='twitter-embed-container'>
            <TwitterTweetEmbed onLoad={handleOnLoad} tweetId={id} />
            <Loading loading={loading} />
        </div>
        : null}
        </>
    )
}
