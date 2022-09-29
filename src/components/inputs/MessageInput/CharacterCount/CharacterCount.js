import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const CharacterCount = ({count = 0}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='input-character-count'>
            <p
            style={{color: textColor}}
            >{count} / 255</p>
        </div>
    )
}
