// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { CtxMenuPlaceHolder } from '../titles/ctxMenuPlaceHolder/CtxMenuPlaceHolder';

// style
import "./AssignPermissionGroupMenu.css";

export const AssignPermissionGroupMenu = ({permission_groups, current_permission_group, action}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const assignNewGroup = (e, id) => {
        e.stopPropagation();
        
        action(id, current_permission_group.split('servergroup-')[1])
    }

    return (
        <div className='assign-permission-group-menu-container'>
            <CtxMenuPlaceHolder name={"Assign Permssions"} />
            {permission_groups.map((group, key) => {
                return (
                    group.server_group_name === 'Owner' ? null :
                    <div 
                    key={group._id + key + 'server-group-select'}
                    style={{backgroundColor: primaryColor}}
                    onClick={(e) => {assignNewGroup(e, group._id)}} className='select-server-group-to-assign-button'>
                        {group._id === current_permission_group.split('servergroup-')[1] ? <div style={{backgroundColor: textColor}}></div> : <div></div>}
                        <p
                        style={{color: textColor}}
                        >{group.server_group_name}</p>
                    </div>
                )
            })}
        </div>
    )
}
