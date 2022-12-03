import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ClearButton = ({action, width, height}) => {

    const color = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper description={"Clear"} altInvert={true} padding={3} action={action} width={width} height={height} >
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1190_2)">
            <path d="M1.818 1.364C1.69767 1.36426 1.58235 1.41218 1.49727 1.49727C1.41218 1.58235 1.36426 1.69767 1.364 1.818V18.182C1.364 18.432 1.567 18.636 1.818 18.636H18.182C18.3023 18.6357 18.4177 18.5878 18.5027 18.5027C18.5878 18.4177 18.6357 18.3023 18.636 18.182V1.818C18.6357 1.69767 18.5878 1.58235 18.5027 1.49727C18.4177 1.41218 18.3023 1.36426 18.182 1.364H1.818ZM18.182 0C19.186 0 20 0.814 20 1.818V18.182C20 18.4207 19.953 18.6571 19.8616 18.8777C19.7702 19.0983 19.6363 19.2987 19.4675 19.4675C19.2987 19.6363 19.0983 19.7702 18.8777 19.8616C18.6571 19.953 18.4207 20 18.182 20H1.818C1.57926 20 1.34285 19.953 1.12228 19.8616C0.901712 19.7702 0.701297 19.6363 0.53248 19.4675C0.363663 19.2987 0.22975 19.0983 0.138387 18.8777C0.047024 18.6571 0 18.4207 0 18.182L0 1.818C0 0.814 0.814 0 1.818 0H18.182V0ZM12.207 6.818L10.01 9.01L7.815 6.818C7.70067 6.70361 7.54942 6.63356 7.38822 6.62037C7.22703 6.60719 7.0664 6.65171 6.935 6.746L6.851 6.818C6.72325 6.94588 6.65149 7.11924 6.65149 7.3C6.65149 7.48076 6.72325 7.65412 6.851 7.782L9.046 9.975L6.851 12.168C6.72303 12.2958 6.65109 12.4693 6.651 12.6501C6.65095 12.7397 6.66854 12.8284 6.70277 12.9112C6.73701 12.9939 6.7872 13.0691 6.8505 13.1325C6.9138 13.1959 6.98895 13.2461 7.07168 13.2805C7.15441 13.3148 7.24308 13.3325 7.33265 13.3325C7.51353 13.3326 7.68703 13.2608 7.815 13.133L10.01 10.938L12.207 13.133C12.447 13.373 12.82 13.396 13.087 13.204L13.171 13.132C13.2987 13.0041 13.3705 12.8308 13.3705 12.65C13.3705 12.4692 13.2987 12.2959 13.171 12.168L10.975 9.975L13.17 7.782C13.2884 7.65245 13.3523 7.48222 13.3484 7.30675C13.3445 7.13127 13.2731 6.96405 13.1491 6.83988C13.0251 6.7157 12.8579 6.64413 12.6824 6.64006C12.507 6.63598 12.3367 6.69972 12.207 6.818V6.818Z" fill={color}/>
            </g>
            <defs>
            <clipPath id="clip0_1190_2">
            <rect width="20" height="20" fill="white"/>
            </clipPath>
            </defs>
            </svg>

        </ButtonAnimationWrapper>
    )
}
