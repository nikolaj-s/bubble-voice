import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ImageButton = ({action}) => {

  const color = useSelector(selectTextColor);

  return (
    <ButtonAnimationWrapper
    width={20}
    height={20}
    margin="0 10px 0 10px"
    action={action}
    borderRadius={5}
    description={"Upload Image"}
    zIndex={3}
    >
        <svg width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.8334 20.9998C41.8334 19.8492 40.9007 18.9165 39.7501 18.9165C38.5995 18.9165 37.6667 19.8492 37.6667 20.9998H41.8334ZM21.0001 4.33317C22.1507 4.33317 23.0834 3.40043 23.0834 2.24984C23.0834 1.09924 22.1507 0.166504 21.0001 0.166504V4.33317ZM36.6251 37.6665H5.37508V41.8332H36.6251V37.6665ZM4.33341 36.6248V5.37484H0.166748V36.6248H4.33341ZM37.6667 20.9998V36.6248H41.8334V20.9998H37.6667ZM5.37508 4.33317H21.0001V0.166504H5.37508V4.33317ZM5.37508 37.6665C4.79979 37.6665 4.33341 37.2001 4.33341 36.6248H0.166748C0.166748 39.5013 2.49859 41.8332 5.37508 41.8332V37.6665ZM36.6251 41.8332C39.5015 41.8332 41.8334 39.5013 41.8334 36.6248H37.6667C37.6667 37.2001 37.2004 37.6665 36.6251 37.6665V41.8332ZM4.33341 5.37484C4.33341 4.79955 4.79978 4.33317 5.37508 4.33317V0.166504C2.4986 0.166504 0.166748 2.49835 0.166748 5.37484H4.33341Z" fill={color}/>
        <path d="M2.25 32.4582L13.3886 22.2478C14.1655 21.5356 15.352 21.5158 16.1522 22.2018L29.3333 33.4999" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25.1667 28.2915L30.1391 23.3191C30.8722 22.5861 32.0328 22.5036 32.8623 23.1257L39.7501 28.2915" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34.5417 14.75V2.25" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3335 7.45833L34.5418 2.25L39.7502 7.45833" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    </ButtonAnimationWrapper>
  )
}
