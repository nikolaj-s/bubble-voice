import React from 'react'

import "./SimpleImageCarousel.css";
import { Image } from '../Image/Image';
import { useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const SimpleImageCarousel = ({images = [], expand}) => {
    
    const [index, setIndex] = React.useState(0);

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const incr = () => {
        if (index < images.length - 1) {
            setIndex(index+1)
        } else {
            setIndex(0);
        }
    }

    const decr = () => {
        if (index > 0) {
            setIndex(index-1)
        } else {
            setIndex(images.length - 1);
        }
    }
    
    return (
        <div className='simple-image-carousel-container'>
            <Image expandContent={() => {expand(images[index])}} image={images[index]} />
            <div style={{backgroundColor: accentColor}} onClick={decr} className='decr-control'></div>
            <div style={{backgroundColor: accentColor}} onClick={incr} className='incr-control'></div>
            <div className='position-indicator-wrapper'>
                {images.map((item, key) => {
                    return <div onClick={() => {setIndex(key)}} style={{width: 14, heigh: 14, flexShrink: 0, borderRadius: '50%', backgroundColor: key === index ? accentColor : primaryColor, margin: '5px'}} ></div>
                })}
            </div>
        </div>
    )
}
