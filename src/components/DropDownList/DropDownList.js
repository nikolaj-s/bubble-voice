import React from 'react'
import { useSelector } from 'react-redux';
import { selectPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { TextButton } from '../buttons/textButton/TextButton';

import "./DropDownList.css";

export const DropDownList = ({selectedItem, list = ["No Options"], action, stateType}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const [open, toggleOpen] = React.useState(false)

    const toggleDropDown = () => {
        toggleOpen(!open);
    }

    const selectItem = (item) => {
        toggleOpen(!open)
        action(stateType, item)
    }

    return (
        <div className='drop-down-container'>
            <TextButton textAlign='start' action={toggleDropDown} name={selectedItem} />
            {open ?
            <div 
            style={{
                backgroundColor: primaryColor
                }}
            className='drop-down-content'>
                {list.map((item, key) => {
                    return (
                        <li 
                        onClick={() => {
                            selectItem(item)
                        }}
                        style={{
                        backgroundColor: primaryColor
                        }} key={key} >{item.label}</li>
                    )
                })}
            </div> : null}
        </div>
    )
}
