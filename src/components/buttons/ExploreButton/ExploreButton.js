import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { toggleProfileTab } from '../../../features/Profile/ProfileSlice';
import { toggleAddServerMenu } from '../../../features/createServer/createServerSlice';
import { toggleMediaPanel } from '../../../features/SavedMedia/SavedMediaSlice';
import { CloseIcon } from '../../Icons/CloseIcon/CloseIcon';
import { ExploreIcon } from '../../Icons/ExploreIcon/ExploreIcon';
import { selectExploreTabOpen, toggleExploreTab } from '../../../features/Explore/ExploreSlice';
import { closeDirectMessage } from '../../../features/Messages/MessagesSlice';

export const ExploreButton = () => {
    
    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const visible = useSelector(selectExploreTabOpen);

    const textColor = useSelector(selectTextColor);
    
    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const handleHover = (bool) => {
        toggleHover(bool)
    }

    const action = () => {

        dispatch(toggleAddServerMenu(false));
        
        dispatch(toggleProfileTab(false));

        dispatch(toggleMediaPanel(false));

        dispatch(closeDirectMessage());

        dispatch(toggleExploreTab(!visible));
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
            {visible ? <CloseIcon /> : <ExploreIcon />}
            {hover ? 
            <div style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Explore</h2>
            </div>
            : null}
        </div>
    )
}
