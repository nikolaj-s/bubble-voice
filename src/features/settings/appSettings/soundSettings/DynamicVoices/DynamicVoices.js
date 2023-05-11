import React from 'react'
import { TextButton } from '../../../../../components/buttons/textButton/TextButton'

import './DynamicVoices.css';

export const DynamicVoices = ({voices, current, action, getVoices}) => {
    return (
        <div className='dynamic-voices'>
            {voices.length === 0 ?
            <TextButton action={getVoices} name={'Get Voices'} /> :
            voices.map((v, key) => {
                return <TextButton action={() => {action(key)}} name={v.name.split('Microsoft ')[1]} toggled={key === current} />
            })}
        </div>
    )
}
