import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { PinnedSubReddit } from './PinnedSubReddit';

import "./PinnedSubReddit.css";

export const PinnedSubRedditWrapper = ({subreddits = [], handleRemove, onLoad, editing}) => {

    return (
        <div className='pinned-sub-reddit-wrapper'>
            <ResponsiveMasonry style={{width: 'calc(100% - 10px)', marginLeft: 5}} columnsCountBreakPoints={{1299: 1, 1300: 2, 2000: 3}}>
                <Masonry>
                {
                subreddits.map(sub => {
                    return <PinnedSubReddit key={sub.url} editing={editing} remove={handleRemove} subreddit={sub} />
                })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}
