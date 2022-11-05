import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ImageButton = ({action}) => {

  const color = useSelector(selectTextColor);

  return (
    <ButtonAnimationWrapper
    width={30}
    height={30}
    margin="0 10px 0 10px"
    action={action}
    >
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.16675 10.5001C2.16675 8.28994 3.04472 6.17033 4.60752 4.60752C6.17033 3.04472 8.28994 2.16675 10.5001 2.16675H35.5001C37.7102 2.16675 39.8298 3.04472 41.3926 4.60752C42.9554 6.17033 43.8334 8.28994 43.8334 10.5001V35.5001C43.8334 37.7102 42.9554 39.8298 41.3926 41.3926C39.8298 42.9554 37.7102 43.8334 35.5001 43.8334H10.5001C8.28994 43.8334 6.17033 42.9554 4.60752 41.3926C3.04472 39.8298 2.16675 37.7102 2.16675 35.5001V10.5001Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.7083 20.9167C18.5848 20.9167 20.9167 18.5848 20.9167 15.7083C20.9167 12.8319 18.5848 10.5 15.7083 10.5C12.8319 10.5 10.5 12.8319 10.5 15.7083C10.5 18.5848 12.8319 20.9167 15.7083 20.9167Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28.2625 24.2937L10.5 43.8333H35.7771C37.9137 43.8333 39.9629 42.9845 41.4737 41.4737C42.9846 39.9628 43.8333 37.9137 43.8333 35.777V35.5C43.8333 34.5291 43.4687 34.1562 42.8125 33.4375L34.4167 24.2812C34.0254 23.8544 33.5494 23.5138 33.0191 23.2812C32.4888 23.0485 31.9159 22.929 31.3368 22.9302C30.7578 22.9314 30.1853 23.0532 29.656 23.288C29.1266 23.5228 28.6521 23.8653 28.2625 24.2937V24.2937Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


    </ButtonAnimationWrapper>
  )
}
