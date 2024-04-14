import React from 'react'

import "./ControlProfileButton.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDecoration, selectDisplayName, selectProfileDecorations, selectProfilePictureShape, selectUserImage } from '../../settings/appSettings/accountSettings/accountSettingsSlice';
import { Image } from '../../../components/Image/Image';
import { selectAccentColor, selectActivationColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectProfileTabOpen, toggleProfileTab } from '../../Profile/ProfileSlice';
import { selectVoiceActive } from '../ControlBarSlice';
import { Decoration } from '../../../components/Decoration/Decoration';

export const ControlProfileButton = ({micState, inChannel}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const [mouseDown, toggleMouseDown] = React.useState(false);

    const profileTabOpen = useSelector(selectProfileTabOpen);

    const displayName = useSelector(selectDisplayName);

    const profilePicture = useSelector(selectUserImage);

    const activationColor = useSelector(selectActivationColor);

    const primaryColor = useSelector(selectPrimaryColor)

    const decoration = useSelector(selectCurrentDecoration);

    const shape = useSelector(selectProfilePictureShape);

    const color = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const accentColor = useSelector(selectAccentColor);

    const voiceState = useSelector(selectVoiceActive);
   
    return (
        <div
        onClick={() => {dispatch(toggleProfileTab(!profileTabOpen))}}
        style={{
            backgroundColor: (inChannel && voiceState) ? activationColor : hover ? secondaryColor : accentColor,
            transform: mouseDown ? "scale(0.95)" : "scale(1)"
        }}
        onMouseDown={() => {toggleMouseDown(true)}}
        onMouseUp={() => {toggleMouseDown(false)}}
        onMouseEnter={() => {toggleHover(true)}}
        onMouseLeave={() => {toggleHover(false)}}
        className='control-profile-button-container'>
            <div className='control-profile-image-container'>
                <Image cursor='pointer' borderRadius={shape !== 'circle' ? 5 : '50%'} image={profilePicture} width='100%' height='100%' objectFit='cover' />
                <Decoration decoration={decoration} width={40} height={40} />
            </div>
            <h3 style={{color: color}}>{displayName}</h3>
        </div>
    )
}
