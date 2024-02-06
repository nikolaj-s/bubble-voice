import React from 'react'
import { AltDownIcon } from '../../Icons/AltDownIcon/AltDownIcon'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./DividerButton.css";

export const DividerButton = ({action, state, name, extra, icon, textMargin}) => {

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div 
        onClick={action}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        style={{backgroundColor: hover ? primaryColor : secondaryColor}}
        className='divider-button-container'>
            {icon}
            <h3 style={{color: textColor, marginLeft: textMargin}}>{name}
            {extra ?
            ` - ${extra}`
            : null}
            </h3>
            
            <div style={{backgroundColor: textColor}} className='divider-line' />
            <AltDownIcon flip={state} />
        </div>
    )
}
