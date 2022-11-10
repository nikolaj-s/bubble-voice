// library's
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// component's
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SearchButton = ({action, active}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper width={20} height={20} borderRadius={0} active={active} action={action} >
            <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.4141 41.7236L31.7334 29.043C33.7012 26.499 34.7656 23.3887 34.7656 20.1172C34.7656 16.2012 33.2373 12.5293 30.4736 9.76074C27.71 6.99219 24.0283 5.46875 20.1172 5.46875C16.2061 5.46875 12.5244 6.99707 9.76074 9.76074C6.99219 12.5244 5.46875 16.2012 5.46875 20.1172C5.46875 24.0283 6.99707 27.71 9.76074 30.4736C12.5244 33.2422 16.2012 34.7656 20.1172 34.7656C23.3887 34.7656 26.4941 33.7012 29.0381 31.7383L41.7188 44.4141C41.7559 44.4513 41.8001 44.4808 41.8487 44.5009C41.8973 44.5211 41.9494 44.5314 42.002 44.5314C42.0546 44.5314 42.1066 44.5211 42.1552 44.5009C42.2038 44.4808 42.248 44.4513 42.2852 44.4141L44.4141 42.29C44.4513 42.2529 44.4808 42.2087 44.5009 42.1601C44.5211 42.1115 44.5314 42.0594 44.5314 42.0068C44.5314 41.9542 44.5211 41.9022 44.5009 41.8536C44.4808 41.805 44.4513 41.7608 44.4141 41.7236ZM27.8516 27.8516C25.7813 29.917 23.0371 31.0547 20.1172 31.0547C17.1973 31.0547 14.4531 29.917 12.3828 27.8516C10.3174 25.7813 9.17969 23.0371 9.17969 20.1172C9.17969 17.1973 10.3174 14.4482 12.3828 12.3828C14.4531 10.3174 17.1973 9.17969 20.1172 9.17969C23.0371 9.17969 25.7861 10.3125 27.8516 12.3828C29.917 14.4531 31.0547 17.1973 31.0547 20.1172C31.0547 23.0371 29.917 25.7861 27.8516 27.8516Z" fill={color} fillOpacity="0.54"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
