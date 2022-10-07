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
        {text.split(' ').map((chunk, key) => {
            if (text.startsWith('https:')) {
                return <a key={chunk + key} onClick={() => {openLink(chunk)}} >{chunk}</a>
            } else {
                return (
                <React.Fragment key={chunk + key}>
                    {chunk + " "}
                </React.Fragment>
                )
            }
        })}
        </p>
    )
}
