import React from 'react'
import { Image } from '../../../../../../../components/Image/Image'

import "./SharedScreenShot.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectTextColor } from '../../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectServerMembers } from '../../../../../ServerSlice';

export const SharedScreenShot = ({data}) => {

    const textColor = useSelector(selectTextColor);

    const members = useSelector(selectServerMembers);

    const [user, setUser] = React.useState({});

    const accentColor = useSelector(selectAccentColor)

    React.useEffect(() => {
        setUser(members.find(member => member.username === data.username))
    }, [])

    return (
        <>
        {!data._id ? null :
        <div style={{border: `solid 3px ${(user.color || accentColor)}`}} className='shared-screen-shot-container'>
            <p style={{color: textColor}}>{user.display_name} {data?.content?.text}</p>
            <div className='shared-screen-shot-image'>
                <Image altHeight='500px' objectFit='contain' position='relative' image={data?.content?.image} />
            </div>    
                
        </div>}
        </>
    )
}
