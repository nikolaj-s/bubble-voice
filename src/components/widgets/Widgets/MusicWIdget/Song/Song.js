// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// state
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AddButton } from '../../../../buttons/AddButton/AddButton';
import { LikeButton } from '../../../../buttons/LikeButton/LikeButton';
import { RemoveButton } from '../../../../buttons/RemoveButton/RemoveButton';

// components
import { Image } from '../../../../Image/Image';

// style
import "./Song.css";
import { setExpandedContent, setMetaData } from '../../../../../features/ExpandContent/ExpandContentSlice';

export const Song = ({profile_pin, in_channel, in_social, search_result, playing, author, id, image, name, duration, action, liked, saved, addToQueue, inQueue, removeFromQueue, width = null, added_by, url, data, altSong}) => {

    const dispatch = useDispatch();

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const minutes = Math.floor(duration / 60);

    const accentColor = useSelector(selectAccentColor);

    const seconds = duration % 60;

    const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    
    const expandContent = () => {
        dispatch(setExpandedContent(url.includes('https://') ? url : `song:${url}`));
        dispatch(setMetaData(data));
    }

    return (
        <div 
        onClick={() => {
            
                expandContent();
            
        }}
        style={{
            width: width, 
            height: profile_pin ? null : in_social ? "90px" : null, 
            margin: in_social ? '5px 0px' : null,
            cursor: 'pointer',
            transform: mouseDown ? 'scale(0.95)' : 'scale(1)'
        }}
        onMouseLeave={(e) => {
            if (in_social) return;

            e.currentTarget.style.backgroundColor = null;

            toggleMouseDown(false);
        }}
        onMouseEnter={(e) => {
            if (in_social) return;

            e.currentTarget.style.backgroundColor = altSong ? accentColor : primaryColor
        }} 
        onMouseDown={() => {toggleMouseDown(true)}}
        onMouseUp={() => {toggleMouseDown(false)}}
        className='song-container'>
            <div
            style={{
                width: profile_pin ? null : in_social ? 90 : null,
                height: profile_pin ? null : in_social ? 90 : null
            }}
            className='song-thumbnail-container'>

                <Image cursor={'pointer'} objectFit='cover' borderRadius={5} image={image} />
              
            </div>
            <div className='song-name-container'>
                <p
                className='song-name'
                style={{
                    color: textColor,
                    fontSize: '.9rem',
                    cursor: 'pointer'
                }}
                >{name}</p>
                {author ? <p 
                style={{
                    color: textColor, 
                    opacity: 0.6, 
                    fontSize: '10px',
                    cursor: 'pointer'
                }}
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
            {altSong ? null :
            <div
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
            onClick={(e) => {e.stopPropagation()}}>
            
            {(search_result || in_social) ? null : <LikeButton borderRadius={5} desc_space={16} padding={6} toggled={liked} action={action}  width={16} height={16} />}
            {!in_channel && in_social ? null : (!inQueue && !playing) ? <AddButton borderRadius={5} desc_width={50} transparent={true} desc_space={16} padding={6} action={addToQueue}  width={16} height={16} description={"Add To Queue"} /> : null}
            {in_social ? null : (inQueue && !playing) ? <RemoveButton borderRadius={5} desc_width={60} transparent={true} desc_space={16} padding={6} action={removeFromQueue} margin={"0 0 0 5px"} width={16} height={16} description={"Remove"} /> : null}
            </div>
            }
            {altSong ? null :
            <p className='song-time-stamp' style={{
                color: textColor,
                fontSize: 10
            }}>{time}</p>}
        </div>
    )
}
