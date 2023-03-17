

import React from 'react'
import { useSelector } from 'react-redux'
import { selectProfilePictureShape } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice'
import { Image } from '../../Image/Image'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ProfilePictureButton = ({image, width, height, action}) => {
  
  const profileShape = useSelector(selectProfilePictureShape);

  return (
    <ButtonAnimationWrapper
    width={width}
    height={height}
    altInvert={true}
    description="Status"
    action={action}
    padding={5}
    borderRadius={5}
    desc_space={15}
    zIndex={1}
    >
        <div
        style={{
            width: '100%',
            height: '100%',
            borderRadius: profileShape === 'square' ? '5px' : '50%',
            overflow: 'hidden',
            cursor: 'pointer',
            objectFit: 'cover'
        }}
        >   
            <Image cursor='pointer' image={image} objectFit='cover' />
        </div>
    </ButtonAnimationWrapper>
  )
}
