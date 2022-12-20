// library's
import React from 'react'
import { useSelector } from 'react-redux';

// component's
import { AddButton } from '../../../../../components/buttons/AddButton/AddButton'
import { selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// state
import { selectUsersPermissions } from '../../../ServerSlice';

// style's
import "./ChannelTitle.css";

export const ChannelTitle = ({action}) => {

    const permissions = useSelector(selectUsersPermissions);

    const textColor = useSelector(selectTextColor);

    return (
        <div className='channel-title-container'>
            <h3
            style={{color: textColor}}
            >CHANNELS</h3>
            {permissions?.user_can_manage_channels ? <AddButton borderRadius={'10px'} description={"Add"} width={12} height={12} action={action} /> : null}
        </div>
    )
}
