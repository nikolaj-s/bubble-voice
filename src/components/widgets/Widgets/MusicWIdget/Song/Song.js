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

export const Song = ({in_channel, in_social, search_result, playing, author, id, image, name, duration, action, liked, saved, addToQueue, inQueue, removeFromQueue, width = null, added_by}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const minutes = Math.floor(duration / 60);

    const seconds = duration % 60;

    const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    

    return (
        <div 
        style={{width: width, marginBottom: in_social ? 5 : null}}
        onMouseLeave={(e) => {
            if (in_social) return;

            e.currentTarget.style.backgroundColor = null
        }}
        onMouseEnter={(e) => {
            if (in_social) return;

            e.currentTarget.style.backgroundColor = primaryColor
        }} className='song-container'>
            <div className='song-thumbnail-container'>
                <Image objectFit='cover' image={image} />
            </div>
            <div className='song-name-container'>
                <p
                className='song-name'
                style={{
                    color: textColor,
                    fontSize: '.9rem'
                }}
                >{name}</p>
                {author ? <p 
                style={{color: textColor, opacity: 0.6, fontSize: '10px'}}
                className='song-author'>
                    {author}
                </p> : null}
                {added_by ?
                <p 
                className='added-by-song-title'
                style={{color: textColor}}
                >
                Added By: {added_by}
                </p>
                : null}
            </div>
                
            {(search_result || in_social) ? null : <LikeButton borderRadius={10} desc_space={16} padding={6} toggled={liked} action={action}  width={20} height={20} />}
            {!in_channel && in_social ? null : (!inQueue && !playing) ? <AddButton borderRadius={10} desc_width={50} transparent={true} desc_space={16} padding={6} action={addToQueue}  width={20} height={20} description={"Add To Queue"} /> : null}
            {in_social ? null : (inQueue && !playing) ? <RemoveButton borderRadius={10} desc_width={60} transparent={true} desc_space={16} padding={6} action={removeFromQueue} margin={"0 0 0 5px"} width={20} height={20} description={"Remove"} /> : null}
            <p style={{
                color: textColor
            }}>{time}</p>
        </div>
    )
}
