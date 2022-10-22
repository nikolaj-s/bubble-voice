import React from 'react'
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { TextButton } from '../buttons/textButton/TextButton';

import "./DropDownList.css";

export const DropDownList = ({selectedItem, list = ["No Options"], action, stateType}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const [open, toggleOpen] = React.useState(false)

    const toggleDropDown = () => {
        if (list.length === 1) return;

        toggleOpen(!open);
    }

    const selectItem = (item) => {
        toggleOpen(!open)
        action(stateType, item)
    }

    const mouseLeave = () => {
        toggleOpen(false);
    }

    return (
        <div 
        onMouseLeave={mouseLeave}
        className='drop-down-container'>
            <TextButton textAlign='start' action={toggleDropDown} name={selectedItem} />
            {open && stateType !== 'error' ?
            <div 
            style={{
                backgroundColor: primaryColor
                }}
            className='drop-down-content'>
                {list.length === 0 ? 
                <li
                style={{
                    color: textColor
                }}
                >No Devices Available</li>
                :
                list.map((item, key) => {
                    return (
                        <li 
                        onClick={() => {
                            selectItem(item)
                        }}
                        style={{
                        color: textColor,
                        backgroundColor: primaryColor
                        }} key={key} >{item.label}</li>
                        )
                    })}
            </div> : null}
        </div>
    )
}
