import React from 'react'

import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SendButton = ({action, color}) => {
    return (
        <ButtonAnimationWrapper
        action={action}
        width={20}
        height={20}
        invert={true}
        borderRadius={5}
        description={"Send"}
        zIndex={3}
        >
            <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_198)">
            <path fillRule="evenodd" clipRule="evenodd" d="M46.875 6.25C46.875 5.4212 46.5458 4.62634 45.9597 4.04029C45.3737 3.45424 44.5788 3.125 43.75 3.125H6.25C5.4212 3.125 4.62634 3.45424 4.04029 4.04029C3.45424 4.62634 3.125 5.4212 3.125 6.25V43.75C3.125 44.5788 3.45424 45.3737 4.04029 45.9597C4.62634 46.5458 5.4212 46.875 6.25 46.875H43.75C44.5788 46.875 45.3737 46.5458 45.9597 45.9597C46.5458 45.3737 46.875 44.5788 46.875 43.75V6.25ZM0 6.25C0 4.5924 0.65848 3.00269 1.83058 1.83058C3.00269 0.65848 4.5924 0 6.25 0L43.75 0C45.4076 0 46.9973 0.65848 48.1694 1.83058C49.3415 3.00269 50 4.5924 50 6.25V43.75C50 45.4076 49.3415 46.9973 48.1694 48.1694C46.9973 49.3415 45.4076 50 43.75 50H6.25C4.5924 50 3.00269 49.3415 1.83058 48.1694C0.65848 46.9973 0 45.4076 0 43.75V6.25ZM26.5625 35.9375C26.5625 36.3519 26.3979 36.7493 26.1049 37.0424C25.8118 37.3354 25.4144 37.5 25 37.5C24.5856 37.5 24.1882 37.3354 23.8951 37.0424C23.6021 36.7493 23.4375 36.3519 23.4375 35.9375V17.8344L16.7313 24.5438C16.4379 24.8371 16.0399 25.002 15.625 25.002C15.2101 25.002 14.8121 24.8371 14.5187 24.5438C14.2254 24.2504 14.0605 23.8524 14.0605 23.4375C14.0605 23.0226 14.2254 22.6246 14.5187 22.3312L23.8937 12.9562C24.0389 12.8107 24.2113 12.6953 24.4011 12.6165C24.591 12.5378 24.7945 12.4972 25 12.4972C25.2055 12.4972 25.409 12.5378 25.5989 12.6165C25.7887 12.6953 25.9611 12.8107 26.1063 12.9562L35.4813 22.3312C35.7746 22.6246 35.9395 23.0226 35.9395 23.4375C35.9395 23.8524 35.7746 24.2504 35.4813 24.5438C35.1879 24.8371 34.7899 25.002 34.375 25.002C33.9601 25.002 33.5621 24.8371 33.2687 24.5438L26.5625 17.8344V35.9375Z" fill={color} stroke={color}/>
            </g>
            <defs>
            <clipPath id="clip0_3_198">
            <rect width="50" height="50" fill={color}/>
            </clipPath>
            </defs>
            </svg>

        </ButtonAnimationWrapper>
    )
}
