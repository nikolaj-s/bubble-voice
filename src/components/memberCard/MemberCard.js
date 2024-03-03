import React from 'react'
import { useSelector } from 'react-redux'
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { SubMenuButton } from '../buttons/subMenuButton/SubMenuButton';

export const MemberCard = ({member}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor)
    console.log(member)
    return (
        <div 
        id={`${member.username}-servergroup-${member.server_group}`}
        className='manage-member-card'
        style={{
            backgroundColor: primaryColor,
            width: "calc(100% - 3px)",
            height: 50,
            borderRadius: "5px",
            display: 'flex',
            alignItems: 'center',
            marginTop: '2%',
            padding: '0 .5rem'
        }}>
            <div
            style={{
                width: 40,
                height: 40,
                overflow: 'hidden',
                marginRight: 10,
                borderRadius: member?.profile_picture_shape === 'square' ? 5 : '50%'
            }}
            >
                <img src={member?.user_image} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: "cover",
                }} />
            </div>
            <div>
            <h3
            style={{
                fontWeight: '400',
                margin: 0,
                fontSize: '1rem',
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
            <div style={{flexGrow: 4}} />
            <SubMenuButton desc_width={60} width={15} height={15} borderRadius={5} description={"Options"} />
        </div>
    )
}
