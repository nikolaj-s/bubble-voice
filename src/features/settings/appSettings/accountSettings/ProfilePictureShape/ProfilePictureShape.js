
import React from 'react'
import { CircleButton } from '../../../../../components/buttons/CircleButton/CircleButton';
import { SquareButton } from '../../../../../components/buttons/SquareButton/SquareButton';
import "./ProfilePictureShape.css";
import { useSelector } from 'react-redux';
import { selectAccentColor, selectGlassColor } from '../../appearanceSettings/appearanceSettingsSlice';

export const ProfilePictureShape = ({shape, action}) => {

    const glassColor = useSelector(selectGlassColor);

    const primaryColor = useSelector(selectAccentColor);

    return (
        <>
        <div className='profile-shapes-container'>
            <CircleButton active_background={primaryColor} background={glassColor} action={() => {action('circle')}} active={shape === 'circle'} padding={2} width={30} height={30} />
            <SquareButton active_background={primaryColor} background={glassColor} action={() => {action('square')}} active={shape === 'square'} padding={2} width={30} height={30} />
        </div>
        </>
    )
}
