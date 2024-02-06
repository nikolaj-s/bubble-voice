import React from 'react'

import "./SelectSubReddit.css";
import { Image } from '../../Image/Image';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const SelectSubReddit = ({data, add = () => {}, remove = () => {}, pinned = false}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const handleRemove = (e) => {
        remove();
    }

    const handleAdd = (e) => {
        add(data);
    }

    return (
        <div 
        style={{backgroundColor: primaryColor}}
        onClick={handleAdd} className='select-pinned-sub-reddit'>
            <h3 style={{color: textColor}}>{data.title}</h3>
        </div>
    )
}
