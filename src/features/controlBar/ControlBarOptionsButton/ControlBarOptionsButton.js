import React from 'react'

import { AltDownIcon } from '../../../components/Icons/AltDownIcon/AltDownIcon'

import './ControlBarOptionsButton.css';
import { useSelector } from 'react-redux';
import { selectAccentColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ControlBarOptionsButton = ({action, state}) => {

    const accentColor = useSelector(selectAccentColor);

    return (
        <div 
        onClick={action}
        className='control-bar-options-button'>
            <AltDownIcon flip={state} />
        </div>
    )
}
