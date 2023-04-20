import React from 'react'
import { SavesIcon } from '../../Icons/SavesIcon/SavesIcon';

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { CloseIcon } from '../../Icons/CloseIcon/CloseIcon';

import "./SavedMediaButton.css";
import { selectSavedMediaOpenState, toggleMediaPanel } from '../../../features/SavedMedia/SavedMediaSlice';

export const SavedMediaButton = () => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const visible = useSelector(selectSavedMediaOpenState);

    const handleHover = (bool) => {
        toggleHover(bool)
    }

    const action = () => {
        dispatch(toggleMediaPanel(!visible))
    }

    return (
        <div 
        onClick={action}
        style={{
            backgroundColor: accentColor,
            borderRadius: visible ? 10 : null,
            border: visible ? `solid 2px ${textColor}` : `solid 2px ${accentColor}`
        }}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            {visible ? <CloseIcon /> : <SavesIcon />}
            {hover ? 
            <div style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Saves</h2>
            </div>
            : null}
        </div>
    )
}