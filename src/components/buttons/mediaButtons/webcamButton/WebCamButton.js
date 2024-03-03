import React from 'react'
import { useSelector } from 'react-redux'
import { selectActivationColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Loading } from '../../../LoadingComponents/Loading/Loading'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const WebCamButton = ({action, state, active, id, loading = true, width = 25, height = 25, padding, desc_space}) => {

  const color = useSelector(selectTextColor);

  const activationColor = useSelector(selectActivationColor);

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
    background={!state ? activationColor : null}
    description={active ? null : `Turn ${state ? 'on' : 'off'} Webcam`}
    zIndex={5}
    borderRadius={5}
    desc_width='100px'
    >
        <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.4 12.9167C32.4 10.817 31.6098 8.8034 30.2033 7.31874C28.7968 5.83408 26.8891 5 24.9 5H7.5C5.51088 5 3.60322 5.83408 2.1967 7.31874C0.790176 8.8034 0 10.817 0 12.9167V35.0833C0 37.183 0.790176 39.1966 2.1967 40.6813C3.60322 42.1659 5.51088 43 7.5 43H24.9C26.8891 43 28.7968 42.1659 30.2033 40.6813C31.6098 39.1966 32.4 37.183 32.4 35.0833V12.9167ZM34.8 31.0072L43.1532 37.8928C45.1236 39.5167 48 38.0347 48 35.3975V12.6038C48 9.96533 45.1236 8.4846 43.1532 10.1085L34.8 16.9928V31.0072Z" fill={color}/>
</svg>


        <Loading success_size={{width: 30, height: 30}} loading={loading} />
    </ButtonAnimationWrapper>
  )
}
