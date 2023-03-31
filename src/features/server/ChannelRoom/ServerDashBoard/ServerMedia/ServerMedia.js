import React from 'react'

import "./ServerMedia.css";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image } from '../../../../../components/Image/Image';

import { NoMedia } from '../../../../../components/NoMedia/NoMedia';
import { VideoPreview } from '../../../../../components/VideoPreview/VideoPreview';
import { ImagePreview } from '../../../../../components/ImagePreview/ImagePreview';

export const ServerMedia = ({media, expand}) => {
    
    const [count, increaseCount] = React.useState(30)

    const handleLoadMore = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight + 200);
        
        if (bottom) {
            increaseCount(count + 15)
        }
    }
    
    return (
        <div onScroll={handleLoadMore} className='server-media-container'>
            {media?.length === 0 ?
            <NoMedia alt={true} message={"No Server Media, Start Using The Image Search To Populate This Area"} />
            :
            <ResponsiveMasonry columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3, 1900: 4, 2500: 5}}>
                <Masonry gutter='5px'> 
                    {media.slice(0, count).map((img, key) => {
                        return (
                           <>
                            {img.type === 'image' ?
                            <ImagePreview image={img.preview} action={() => {expand(img.preview)}} tags={img.tags} />
                            :
                            <VideoPreview action={() => {expand(img.link)}} video={img} />}
                            </>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>}
            {count > media.length && media.length !== 0 ? <NoMedia alt={true} message={"No More Server Media"} /> : null}
        </div>
    )
}
