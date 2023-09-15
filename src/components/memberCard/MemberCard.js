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
            width: "calc(100% - 3px)",
            height: 45,
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
                margin: 0,
                fontSize: '.9rem',
                color: textColor
            }}
            >{member.display_name}</h3>
            <p
            style={{
                fontWeight: '400',
                opacity: 0.4,
                margin: 0,
                color: textColor,
                fontSize: '.7rem'
            }}
            >id: {member.username}</p>
            </div>
            <SubMenuButton desc_width={60} invert={true} width={15} height={15} borderRadius={5} description={"User Management"} />
        </div>
    )
}
