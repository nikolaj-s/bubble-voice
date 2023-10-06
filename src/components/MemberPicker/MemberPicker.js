import React from 'react'
import { useSelector } from 'react-redux';
import { selectGlassColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { TextButton } from '../buttons/textButton/TextButton';
import {RadioButton} from '../buttons/RadioButton/RadioButton';
import { DownIcon } from '../Icons/DownIcon/DownIcon';

export const DropDownList = ({selectedItem, list = ["No Options"], action, stateType}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const glassColor = useSelector(selectGlassColor);

    const [open, toggleOpen] = React.useState(false)

    const toggleDropDown = () => {
        if (list.length === 0) return;

        toggleOpen(!open);
    }

    const selectItem = (item) => {
        toggleOpen(!open)
        action(stateType, item)
    }

    return (
        <>
            <div 
            className='drop-down-container'>
                <TextButton textAlign='start' action={toggleDropDown} name={selectedItem} />
                <div style={{rotate: open ? '-180deg' : null}} className='drop-down-icon-wrapper'>
                    <DownIcon />
                </div>
                
            </div>
            {open && stateType !== 'error' ?
                <div 
                onClick={() => {toggleDropDown()}}
                style={{
                    backgroundColor: glassColor
                    }}
                className='drop-down-content'>
                    <div onClick={(e) => {e.stopPropagation()}} style={{backgroundColor: primaryColor}} className='inner-drop-down-container'>
                        {list.length === 0 ? 
                        <li
                        style={{
                            color: textColor
                        }}
                        >No Options Available</li>
                        :
                        list.map((item, key) => {
                            return (
                                <RadioButton  name={item.display_name} action={() => {selectItem(item)}} state={item.username === selectedItem} />
                                )
                            })}
                    </div>
                </div> : null}
        </>
    )
}
