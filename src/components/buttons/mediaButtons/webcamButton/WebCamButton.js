import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Loading } from '../../../LoadingComponents/Loading/Loading'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const WebCamButton = ({action, state, active, id, loading = true, width = 25, height = 25, padding, desc_space}) => {

  const color = useSelector(selectTextColor);

  return (
    <ButtonAnimationWrapper action={action}
    width={width}
    height={height}
    padding={padding}
    active={active || loading}
    desc_space={desc_space}
    opacity={0.5}
    id={id}
    altInvert={true}
    position={'relative'}
   
    description={active ? null : `Turn ${state ? 'On' : 'Off'} Webcam`}
    zIndex={5}
    borderRadius={5}
    >
        {state ?
        <svg width="100%" height="100%" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.32 2.25L10.5 3.5V2C10.5 1.73478 10.3946 1.48043 10.2071 1.29289C10.0196 1.10536 9.76521 1 9.49999 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V9C1 9.26522 1.10536 9.51957 1.29289 9.70711C1.48043 9.89464 1.73478 10 2 10H9.49999C9.76521 10 10.0196 9.89464 10.2071 9.70711C10.3946 9.51957 10.5 9.26522 10.5 9V7.5L13.32 8.75C13.396 8.77934 13.4781 8.78965 13.559 8.78004C13.6399 8.77042 13.7173 8.74118 13.7843 8.69484C13.8513 8.64851 13.906 8.58649 13.9436 8.51419C13.9812 8.44189 14.0006 8.36149 14 8.28V2.72C14.0006 2.63851 13.9812 2.55811 13.9436 2.48581C13.906 2.41351 13.8513 2.35149 13.7843 2.30516C13.7173 2.25882 13.6399 2.22958 13.559 2.21996C13.4781 2.21035 13.396 2.22066 13.32 2.25Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="10.5" y1="3" x2="10.5" y2="8" stroke={color}/>
        </svg>
        
              
        : 
        <svg width="100%" height="100%" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.32 3.25L10.5 4.5V3C10.5 2.73478 10.3946 2.48043 10.2071 2.29289C10.0196 2.10536 9.76521 2 9.49999 2H2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H9.49999C9.76521 11 10.0196 10.8946 10.2071 10.7071C10.3946 10.5196 10.5 10.2652 10.5 10V8.5L13.32 9.75C13.396 9.77934 13.4781 9.78965 13.559 9.78004C13.6399 9.77042 13.7173 9.74118 13.7843 9.69484C13.8513 9.64851 13.906 9.58649 13.9436 9.51419C13.9812 9.44189 14.0006 9.36149 14 9.28V3.72C14.0006 3.63851 13.9812 3.55811 13.9436 3.48581C13.906 3.41351 13.8513 3.35149 13.7843 3.30516C13.7173 3.25882 13.6399 3.22958 13.559 3.21996C13.4781 3.21035 13.396 3.22066 13.32 3.25Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
<line x1="10.5" y1="4" x2="10.5" y2="9" stroke={color}/>
<line x1="0.706439" y1="1.03071" x2="11.0307" y2="12.2936" stroke={color} strokeLinecap="round"/>
</svg>

        }
        <Loading success_size={{width: 30, height: 30}} loading={loading} />
    </ButtonAnimationWrapper>
  )
}
