// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';

// state
import { selectAccentColor, selectSecondaryColor, selectTextColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { setDefaultServer } from '../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { toggleHideDefaultServerNotice } from '../../ServerSlice';

// style
import "./SetAsDefaultServerNotice.css";

export const SetAsDefaultServerNotice = ({visible, servername, serverId}) => {

    const dispatch = useDispatch();

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);
    
    const handleCancel = () => {
        dispatch(toggleHideDefaultServerNotice(true));
    }

    const handleApply = () => {

        if (!servername || !serverId) return;

        dispatch(setDefaultServer({label: servername, id: serverId}))
    }

    return (
        <>
        {visible ?
        <div 
        style={{
            border: `solid 4px ${accentColor}`,
            backgroundColor: secondaryColor
        }}
        className='set-default-server-notice-container'>
            <p style={{color: textColor}}>{
                `Would you like to set ${servername} as your default server.  Setting as default lets you auto join on app launch, this can be changed in misc app settings.`
            }</p>
            <ApplyCancelButton apply={handleApply} cancel={handleCancel} />
        </div>
        : null}
        </>
    )
}
