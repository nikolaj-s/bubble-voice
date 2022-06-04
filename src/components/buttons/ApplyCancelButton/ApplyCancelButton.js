// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { TextButton } from '../textButton/TextButton';

import "./ApplyCancelButton.css";

export const ApplyCancelButton = ({apply, cancel, active, name = "Apply"}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const style = {
        backgroundColor: primaryColor,
        color: textColor
    }

    return (
        <div className='apply-cancel-button-container'>
            <TextButton textAlign='center' name={"Cancel"} action={cancel} />
            <TextButton textAlign='center' name={name} apply={apply} />
        </div>
    )
}
