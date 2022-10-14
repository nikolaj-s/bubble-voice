import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Hub } from './Hub/Hub';
import { RedGifs } from './RedGifs/RedGifs';
import { Youtube } from './Youtube/Youtube';

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
            
            if (chunk.startsWith('https:')) {
                
                if (chunk.includes('youtu')) {
                    return <Youtube text={chunk} />
                } else if (chunk.includes('redgifs')) {
                    return <RedGifs text={chunk} />
                } else if (chunk.includes('pornhub')) {
                    return <Hub text={chunk} />
                } else {
                    return <a key={chunk + key} onClick={() => {openLink(chunk)}} >{chunk}</a>
                }   
            
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
