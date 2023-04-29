// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectPrimaryColor, selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AddButton } from '../../../../buttons/AddButton/AddButton';
import { LikeButton } from '../../../../buttons/LikeButton/LikeButton';
import { RemoveButton } from '../../../../buttons/RemoveButton/RemoveButton';

// components
import { Image } from '../../../../Image/Image';

// style
import "./Song.css";

export const Song = ({id, image, name, duration, action, liked, saved, addToQueue, inQueue, removeFromQueue}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const time = (duration / 60).toFixed(2).toString().split('.').join(':')
    
    return (
        <div 
        onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = null}}
        onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = primaryColor}} className='song-container'>
            <div className='song-thumbnail-container'>
                <Image objectFit='cover' image={image} />
            </div>
            <p
            className='song-name'
            style={{
                color: textColor
            }}
            >{name}</p>
            <LikeButton desc_space={10} padding={4} toggled={liked} action={action}  width={20} height={20} />
            {(saved && liked) ? <AddButton transparent={true} desc_space={10} padding={4} action={addToQueue} margin={"0 0 0 5px"} width={20} height={20} description={"Add To Queue"} /> : null}
            {inQueue ? <RemoveButton transparent={true} desc_space={10} padding={4} action={removeFromQueue} margin={"0 0 0 5px"} width={20} height={20} description={"Remove"} /> : null}
            <p style={{
                color: textColor
            }}>{time}</p>
        </div>
    )
}
