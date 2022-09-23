import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const TextParser = ({text}) => {

    const textColor = useSelector(selectTextColor);

    const openLink = (link) => {
        try {

            const shell = window.require('electron').shell;

            shell.openExternal(link);

        } catch (error) {
            window.open(link);
        }
    }

    return (
        <p style={{color: textColor}}>
        {text.split(' ').map(chunk => {
            if (text.startsWith('https:')) {
                return <a onClick={() => {openLink(chunk)}} >{chunk}</a>
            } else {
                return chunk
            }
        })}
        </p>
    )
}
