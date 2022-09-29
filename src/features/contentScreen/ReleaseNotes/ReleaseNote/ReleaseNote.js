import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ReleaseNote = ({data}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <div className='release-note-container'>
            <h1
            style={{color: textColor}}
            >{data.version_name}</h1>
            {data.release_notes.split('.').map((note, key) => {
                return (
                    <li style={{color: textColor}} key={key}>{note}</li>
                )
            })}
        </div>
    )
}
