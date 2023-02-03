import React from 'react'

import "./ServerMedia.css";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image } from '../../../../../components/Image/Image';

import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ServerMedia = ({media, expand}) => {
    
    const [count, increaseCount] = React.useState(15)

    const color = useSelector(selectTextColor);

    const handleLoadMore = (e) => {
        
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        
        if (bottom) {
            increaseCount(count + 15)
        }
    }

    return (
        <div onScroll={handleLoadMore} className='server-media-container'>
            <ResponsiveMasonry columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3, 1900: 4, 2500: 5}}>
                <Masonry gutter='5px'> 
                    {media.slice(0, count).map((img, key) => {
                        return (
                            <div className='server-media-image-container'>
                                <Image hideOnError={true} loadingState='lazy' expandContent={expand} cursor='pointer' key={img + key} image={img} />
                            </div>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>
            {count > media.length ? <h3 style={{color: color}}>You have reached the end of this servers collected media content.</h3> : null}
        </div>
    )
}
