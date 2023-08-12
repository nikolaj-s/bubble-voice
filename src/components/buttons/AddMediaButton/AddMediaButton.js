import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const AddMediaButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props}>
           <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C11.2151 0 0 11.2151 0 25C0 38.7849 11.2151 50 25 50C38.7849 50 50 38.7849 50 25C50 11.2151 38.7849 0 25 0ZM34.6154 26.9231H26.9231V34.6154C26.9231 35.1254 26.7205 35.6146 26.3598 35.9752C25.9992 36.3359 25.51 36.5385 25 36.5385C24.49 36.5385 24.0008 36.3359 23.6402 35.9752C23.2795 35.6146 23.0769 35.1254 23.0769 34.6154V26.9231H15.3846C14.8746 26.9231 14.3854 26.7205 14.0248 26.3598C13.6641 25.9992 13.4615 25.51 13.4615 25C13.4615 24.49 13.6641 24.0008 14.0248 23.6402C14.3854 23.2795 14.8746 23.0769 15.3846 23.0769H23.0769V15.3846C23.0769 14.8746 23.2795 14.3854 23.6402 14.0248C24.0008 13.6641 24.49 13.4615 25 13.4615C25.51 13.4615 25.9992 13.6641 26.3598 14.0248C26.7205 14.3854 26.9231 14.8746 26.9231 15.3846V23.0769H34.6154C35.1254 23.0769 35.6146 23.2795 35.9752 23.6402C36.3359 24.0008 36.5385 24.49 36.5385 25C36.5385 25.51 36.3359 25.9992 35.9752 26.3598C35.6146 26.7205 35.1254 26.9231 34.6154 26.9231Z" fill={color}/>
            </svg>



        </ButtonAnimationWrapper>
    )
}
