import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PlayButton = ({action}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper action={action} >
            <svg width="88" height="87" viewBox="0 0 88 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5059 5.4375C22.4865 5.4375 5.44336 22.4807 5.44336 43.5C5.44336 64.5193 22.4865 81.5625 43.5059 81.5625C64.5252 81.5625 81.5684 64.5193 81.5684 43.5C81.5684 22.4807 64.5252 5.4375 43.5059 5.4375ZM43.5059 75.1055C26.0549 75.1055 11.9004 60.951 11.9004 43.5C11.9004 26.049 26.0549 11.8945 43.5059 11.8945C60.9568 11.8945 75.1113 26.049 75.1113 43.5C75.1113 60.951 60.9568 75.1055 43.5059 75.1055Z" fill={color}/>
            <path d="M61.1268 42.4039L35.9698 24.1373C35.7681 23.9894 35.5292 23.9005 35.2798 23.8804C35.0305 23.8602 34.7804 23.9097 34.5576 24.0234C34.3347 24.137 34.1478 24.3103 34.0176 24.524C33.8874 24.7376 33.8191 24.9832 33.8203 25.2333V61.7665C33.8203 62.8795 35.0777 63.5082 35.9698 62.8625L61.1268 44.5959C61.3005 44.4708 61.4419 44.3061 61.5395 44.1156C61.637 43.925 61.6879 43.714 61.6879 43.4999C61.6879 43.2859 61.637 43.0748 61.5395 42.8843C61.4419 42.6937 61.3005 42.5291 61.1268 42.4039V42.4039ZM39.2408 53.7887V33.2112L53.4038 43.4999L39.2408 53.7887V53.7887Z" fill={color}/>
            </svg>

        </ButtonAnimationWrapper>
    )
}
