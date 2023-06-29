import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PlayButton = (props) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props} description={"Play"}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.125 15.0001C28.1258 15.3184 28.0442 15.6315 27.8881 15.9089C27.732 16.1864 27.5068 16.4187 27.2344 16.5833L10.35 26.9122C10.0653 27.0865 9.7393 27.1817 9.40556 27.1879C9.07182 27.194 8.74249 27.111 8.45156 26.9474C8.16341 26.7862 7.92337 26.5513 7.75613 26.2667C7.58889 25.982 7.50048 25.658 7.5 25.3278V4.67236C7.50048 4.34223 7.58889 4.01818 7.75613 3.73354C7.92337 3.4489 8.16341 3.21394 8.45156 3.05283C8.74249 2.88918 9.07182 2.80615 9.40556 2.81233C9.7393 2.81851 10.0653 2.91367 10.35 3.08799L27.2344 13.4169C27.5068 13.5815 27.732 13.8138 27.8881 14.0913C28.0442 14.3687 28.1258 14.6818 28.125 15.0001Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
