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

    const [top, setTop] = React.useState(0)

    const visible = useSelector(selectExploreTabOpen);

    const textColor = useSelector(selectTextColor);
    
    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const handleHover = (bool, e) => {
        toggleHover(bool);

        setTop(e?.target?.y)
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
        onMouseEnter={(e) => {handleHover(true, e)}}
        onMouseLeave={() => {handleHover(false)}}
        style={{marginBottom: 3}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover || visible ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
                {visible ? <CloseIcon /> : <ExploreIcon />}
            </div>
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Explore</h2>
            </div>
            : null}
        </div>
    )
}
