import React from 'react'
import { useSelector } from 'react-redux'
import { selectGlassColor, selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ExpandButton = ({action, description, width = 25, height = 25}) => {

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectGlassColor)

    return (
        <ButtonAnimationWrapper
        width={width}
        height={height}
        action={action}
        description={description}
        background={primaryColor}
        >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6992 4.29688H5.85938C4.99512 4.29688 4.29688 4.99512 4.29688 5.85938V16.7969C4.29688 17.2266 4.64844 17.5781 5.07812 17.5781H7.42188C7.85156 17.5781 8.20312 17.2266 8.20312 16.7969V16.6992C8.20312 12.007 12.007 8.20312 16.6992 8.20312V8.20312C17.1289 8.20312 17.4805 7.85156 17.4805 7.42188V5.07812C17.4805 4.64844 17.1289 4.29688 16.6992 4.29688ZM44.9219 32.4219H42.5781C42.1484 32.4219 41.7969 32.7734 41.7969 33.2031V33.3008C41.7969 37.993 37.993 41.7969 33.3008 41.7969V41.7969C32.8711 41.7969 32.5195 42.1484 32.5195 42.5781V44.9219C32.5195 45.3516 32.8711 45.7031 33.3008 45.7031H44.1406C45.0049 45.7031 45.7031 45.0049 45.7031 44.1406V33.2031C45.7031 32.7734 45.3516 32.4219 44.9219 32.4219ZM16.6992 41.7969V41.7969C12.007 41.7969 8.20312 37.993 8.20312 33.3008V33.2031C8.20312 32.7734 7.85156 32.4219 7.42188 32.4219H5.07812C4.64844 32.4219 4.29688 32.7734 4.29688 33.2031V44.1406C4.29688 45.0049 4.99512 45.7031 5.85938 45.7031H16.6992C17.1289 45.7031 17.4805 45.3516 17.4805 44.9219V42.5781C17.4805 42.1484 17.1289 41.7969 16.6992 41.7969ZM44.1406 4.29688H33.3008C32.8711 4.29688 32.5195 4.64844 32.5195 5.07812V7.42188C32.5195 7.85156 32.8711 8.20312 33.3008 8.20312V8.20312C37.993 8.20312 41.7969 12.007 41.7969 16.6992V16.7969C41.7969 17.2266 42.1484 17.5781 42.5781 17.5781H44.9219C45.3516 17.5781 45.7031 17.2266 45.7031 16.7969V5.85938C45.7031 4.99512 45.0049 4.29688 44.1406 4.29688Z" fill={textColor}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
