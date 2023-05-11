
import React from 'react'
import { CircleButton } from '../../../../../components/buttons/CircleButton/CircleButton';
import { SquareButton } from '../../../../../components/buttons/SquareButton/SquareButton';

import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle'

import "./ProfilePictureShape.css";

export const ProfilePictureShape = ({shape, action}) => {
    return (
        <>
        <InputTitle zIndex={2} title={"Change Profile Picture Shape"} />
        <div className='profile-shapes-container'>
            <CircleButton action={() => {action('circle')}} active={shape === 'circle'} padding={2} width={60} height={60} />
            <SquareButton action={() => {action('square')}} active={shape === 'square'} padding={2} width={60} height={60} />
        </div>
        </>
    )
}
