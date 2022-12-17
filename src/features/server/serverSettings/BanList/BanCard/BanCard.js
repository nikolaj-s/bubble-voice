
import React from 'react'
import { useSelector } from 'react-redux';
import { TextButton } from '../../../../../components/buttons/textButton/TextButton';
import { selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./BanCard.css";

export const BanCard = ({username, date, action}) => {

    const color = useSelector(selectTextColor);

    return (
        <div className='ban-card-container'>
            <h3 style={{color: color}}>{username}</h3>
            <p style={{color: color}}>Banned: {date.split("T")[0]}</p>
            <TextButton action={action} name={"Un-Ban"} />
        </div>
    )
}
