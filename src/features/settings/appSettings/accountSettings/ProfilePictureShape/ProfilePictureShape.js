
import React from 'react'
import { CircleButton } from '../../../../../components/buttons/CircleButton/CircleButton';
import { SquareButton } from '../../../../../components/buttons/SquareButton/SquareButton';
import "./ProfilePictureShape.css";

export const ProfilePictureShape = ({shape, action}) => {
    return (
        <>
        <div className='profile-shapes-container'>
            <CircleButton action={() => {action('circle')}} active={shape === 'circle'} padding={2} width={30} height={30} />
            <SquareButton action={() => {action('square')}} active={shape === 'square'} padding={2} width={30} height={30} />
        </div>
        </>
    )
}
