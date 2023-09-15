// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAccentColor, selectPrimaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectAddServerMenuVisible, toggleAddServerMenu } from '../createServerSlice';
// component's
import "./CreateServerButton.css";

// style's
import "./CreateServerButton.css";
import { toggleMediaPanel } from '../../SavedMedia/SavedMediaSlice';
import { CloseIcon } from '../../../components/Icons/CloseIcon/CloseIcon';
import { toggleProfileTab } from '../../Profile/ProfileSlice';
import { toggleExploreTab } from '../../Explore/ExploreSlice';
import { closeDirectMessage } from '../../Messages/MessagesSlice';

export const CreateServerButton = () => {

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const dispatch = useDispatch();

    const visible = useSelector(selectAddServerMenuVisible);

    const handleCreateServerMenu = () => {
        dispatch(toggleMediaPanel(false));
        
        dispatch(toggleProfileTab(false));

        dispatch(toggleExploreTab(false));

        dispatch(closeDirectMessage());

        dispatch(toggleAddServerMenu(!visible));
    }

    const handleHover = (bool) => {
        toggleHover(bool)
    }

    return (
        <div 
        onClick={handleCreateServerMenu}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='create-server-button-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover || visible ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
            {visible ?
            <CloseIcon /> :
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14C6.71667 14 6.479 13.904 6.287 13.712C6.095 13.52 5.99934 13.2827 6 13V8H1C0.71667 8 0.479004 7.904 0.287004 7.712C0.0950036 7.52 -0.000663206 7.28267 3.4602e-06 7C3.4602e-06 6.71667 0.0960036 6.479 0.288004 6.287C0.480004 6.095 0.717337 5.99934 1 6H6V1C6 0.71667 6.096 0.479004 6.288 0.287004C6.48 0.0950036 6.71734 -0.000663206 7 3.4602e-06C7.28334 3.4602e-06 7.521 0.0960036 7.713 0.288004C7.905 0.480004 8.00067 0.717337 8 1V6H13C13.2833 6 13.521 6.096 13.713 6.288C13.905 6.48 14.0007 6.71734 14 7C14 7.28334 13.904 7.521 13.712 7.713C13.52 7.905 13.2827 8.00067 13 8H8V13C8 13.2833 7.904 13.521 7.712 13.713C7.52 13.905 7.28267 14.0007 7 14Z" fill={textColor} />
            </svg>}
            </div>
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Add a Bubble</h2>
            </div>
            : null}
        </div>
    )
}




