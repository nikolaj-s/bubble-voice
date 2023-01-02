import React from 'react'
import { useSelector } from 'react-redux'

import {selectTextColor} from "../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice";

export const MicMuted = ({width = 16, height = 16}) => {

  const color = useSelector(selectTextColor)

  return (
    <div style={{width: width, height: height}} className='extra-media-icon'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_553_2)">
        <path d="M13 8.00001C13 8.56401 12.906 9.10701 12.734 9.61301L11.92 8.79901C11.9733 8.53602 12.0001 8.26835 12 8.00001V7.00001C12 6.8674 12.0527 6.74023 12.1464 6.64646C12.2402 6.55269 12.3674 6.50001 12.5 6.50001C12.6326 6.50001 12.7598 6.55269 12.8536 6.64646C12.9473 6.74023 13 6.8674 13 7.00001V8.00001ZM8 12C8.818 12 9.578 11.755 10.212 11.333L10.93 12.052C10.2162 12.5697 9.37751 12.8882 8.5 12.975V15H11.5C11.6326 15 11.7598 15.0527 11.8536 15.1465C11.9473 15.2402 12 15.3674 12 15.5C12 15.6326 11.9473 15.7598 11.8536 15.8536C11.7598 15.9473 11.6326 16 11.5 16H4.5C4.36739 16 4.24021 15.9473 4.14645 15.8536C4.05268 15.7598 4 15.6326 4 15.5C4 15.3674 4.05268 15.2402 4.14645 15.1465C4.24021 15.0527 4.36739 15 4.5 15H7.5V12.975C6.26668 12.8511 5.12338 12.2734 4.29188 11.3542C3.46038 10.4349 2.99998 9.23954 3 8.00001V7.00001C3 6.8674 3.05268 6.74023 3.14645 6.64646C3.24021 6.55269 3.36739 6.50001 3.5 6.50001C3.63261 6.50001 3.75979 6.55269 3.85355 6.64646C3.94732 6.74023 4 6.8674 4 7.00001V8.00001C4 9.06088 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12ZM11 3.00001V7.87901L10 6.87901V3.00001C10.0023 2.47827 9.80064 1.97628 9.43803 1.60115C9.07541 1.22601 8.58056 1.00742 8.05904 0.992028C7.53752 0.976632 7.03063 1.16564 6.64652 1.51873C6.2624 1.87183 6.03147 2.36104 6.003 2.88201L5.158 2.03701C5.38694 1.36425 5.8472 0.794569 6.45683 0.429379C7.06647 0.0641881 7.78592 -0.0728099 8.4871 0.0427739C9.18829 0.158358 9.8257 0.519022 10.2859 1.06056C10.746 1.6021 10.9991 2.28937 11 3.00001V3.00001Z" fill={color}/>
        <path d="M9.486 10.607L8.738 9.859C8.43462 9.97944 8.10637 10.0238 7.7819 9.98821C7.45743 9.95261 7.1466 9.83814 6.87655 9.65479C6.6065 9.47143 6.38543 9.22477 6.23264 8.93632C6.07984 8.64787 5.99997 8.32641 6 8V7.122L5 6.122V8C4.99984 8.52531 5.13763 9.04146 5.39957 9.49681C5.66152 9.95216 6.03844 10.3307 6.49263 10.5947C6.94682 10.8586 7.46236 10.9987 7.98767 11.0009C8.51298 11.003 9.02965 10.8672 9.486 10.607V10.607ZM1.646 1.354L13.646 13.354L14.354 12.646L2.354 0.645996L1.646 1.354V1.354Z" fill={color}/>
        </g>
        <defs>
        <clipPath id="clip0_553_2">
        <rect width="16" height="16" fill={color}/>
        </clipPath>
        </defs>
        </svg>
    </div>
  )
}
