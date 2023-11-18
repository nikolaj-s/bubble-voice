import React from 'react'
import { AltDownIcon } from '../../Icons/AltDownIcon/AltDownIcon'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

import "./DividerButton.css";

export const DividerButton = ({action, state, name, extra}) => {

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
            <h3 style={{color: textColor}}>{name}</h3>
            {extra ?
            <>
            <div style={{width: 5, height: 5, borderRadius: '50%', backgroundColor: textColor, margin: '0px 5px 0px 0px', flexShrink: 0}} />
            <h3 style={{color: textColor}}>{extra}</h3>
            </>
            : null}
            <div style={{backgroundColor: textColor}} className='divider-line' />
            <AltDownIcon flip={state} />
        </div>
    )
}
