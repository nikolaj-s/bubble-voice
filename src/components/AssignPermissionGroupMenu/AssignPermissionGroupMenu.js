// library's
import React from 'react'
import { useSelector } from 'react-redux'

// state
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { CtxMenuTitle } from '../titles/ctxMenuTitle/CtxMenuTitle';

// style
import "./AssignPermissionGroupMenu.css";
import { BoolButton } from '../buttons/BoolButton/BoolButton';
import { CtxButton } from '../buttons/ctxButton/CtxButton';
import { RightArrowIcon } from '../Icons/RightArrowIcon/RightArrowIcon';

export const AssignPermissionGroupMenu = ({permission_groups, current_permission_group, action, rightPos}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const [hover, toggleHover] = React.useState(false);

    const assignNewGroup = (e, id) => {
        console.log(e)
        
        action(id, current_permission_group.split('-')[0])
    }

    return (
        <>
        <div 
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        className='assign-permission-group-menu-container'>
            <CtxButton name={"Assign User Permission"} icon={<RightArrowIcon width={20} height={20} />} />
        </div>
        {hover ?
        <div
        style={{
            position: 'absolute',
            left: window.innerWidth - rightPos < 400 ? 'calc(-100% - 7px)' : '100%',
            backgroundColor: primaryColor
        }}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        className='assign-permissions-menu'>
        {permission_groups.map((group, key) => {
            return (
                group.server_group_name === 'Owner' ? null :
                
                <BoolButton name={group.server_group_name} action={(e) => {assignNewGroup(e, group._id)}} state={group._id === current_permission_group.split('servergroup-')[1]} />
            )
        })}
        </div>
        : null}
        </>
    )
}
