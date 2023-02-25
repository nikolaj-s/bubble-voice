import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';

export const MemberCard = ({member}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor)

    return (
        <div 
        id={`${member.username}-servergroup-${member.server_group}`}
        className='manage-member-card'
        style={{
            backgroundColor: primaryColor,
            width: "calc(100% - 1rem)",
            height: 65,
            borderRadius: "5px",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2%',
            padding: '0 .5rem'
        }}>
            <div>
            <h3
            style={{
                fontWeight: '400',
                letterSpacing: '4px',
                margin: "0 0 0 1rem",
                color: textColor
            }}
            >{member.display_name}</h3>
            <p
            style={{
                fontWeight: '400',
                letterSpacing: '4px',
                opacity: 0.4,
                margin: "0 0 0 1rem",
                color: textColor
            }}
            >id: {member.username}</p>
            </div>
            <SubMenuButton width={15} height={15} borderRadius={5} description={"User Management"} />
        </div>
    )
}
