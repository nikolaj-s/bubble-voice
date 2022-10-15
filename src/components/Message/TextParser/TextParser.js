// library's
import React from 'react'
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// component's
import { Iframe } from './Iframe/Iframe';

export const TextParser = ({text}) => {

    const textColor = useSelector(selectTextColor);

    return (
        <p style={{color: textColor}}>
        {text.split(' ').map((chunk, key) => {
            
            if (chunk.startsWith('https:')) {
                
                return <Iframe text={chunk} />
            
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
