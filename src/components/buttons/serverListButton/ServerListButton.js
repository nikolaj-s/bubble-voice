// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper';

export const ServerListButton = ({action, active}) => {

  const color = useSelector(selectTextColor);

  return (
    <ButtonAnimationWrapper width={105} height={20} active={active} borderRadius='0%' action={action} >
        <svg style={{filter: active ? 'contrast(200%)' : null}} width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.6665 6.25H8.33317C7.2281 6.25 6.16829 6.68899 5.38689 7.47039C4.60549 8.25179 4.1665 9.3116 4.1665 10.4167V18.75C4.1665 19.8551 4.60549 20.9149 5.38689 21.6963C6.16829 22.4777 7.2281 22.9167 8.33317 22.9167H41.6665C42.7716 22.9167 43.8314 22.4777 44.6128 21.6963C45.3942 20.9149 45.8332 19.8551 45.8332 18.75V10.4167C45.8332 9.3116 45.3942 8.25179 44.6128 7.47039C43.8314 6.68899 42.7716 6.25 41.6665 6.25ZM8.33317 18.75V10.4167H41.6665V18.75H8.33317ZM41.6665 27.0833H8.33317C7.2281 27.0833 6.16829 27.5223 5.38689 28.3037C4.60549 29.0851 4.1665 30.1449 4.1665 31.25V39.5833C4.1665 40.6884 4.60549 41.7482 5.38689 42.5296C6.16829 43.311 7.2281 43.75 8.33317 43.75H41.6665C42.7716 43.75 43.8314 43.311 44.6128 42.5296C45.3942 41.7482 45.8332 40.6884 45.8332 39.5833V31.25C45.8332 30.1449 45.3942 29.0851 44.6128 28.3037C43.8314 27.5223 42.7716 27.0833 41.6665 27.0833ZM8.33317 39.5833V31.25H41.6665V39.5833H8.33317Z" fill={color}fillOpacity="0.6"/>
        <path d="M35.4165 12.5H39.5832V16.6667H35.4165V12.5ZM29.1665 12.5H33.3332V16.6667H29.1665V12.5ZM35.4165 33.3333H39.5832V37.5H35.4165V33.3333ZM29.1665 33.3333H33.3332V37.5H29.1665V33.3333Z" fill={color} fillOpacity="0.6"/>
        </svg>
    </ButtonAnimationWrapper>
  )
}
