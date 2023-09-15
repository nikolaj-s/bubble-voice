import React from 'react'
import { useSelector } from 'react-redux'
import { selectActivationColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Loading } from '../../../LoadingComponents/Loading/Loading'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ShareScreenButton = ({action, state, active, loading, id, width = 25, height = 25, padding, desc_space, sharing_screen}) => {

  const textColor = useSelector(selectTextColor);

  const activationColor = useSelector(selectActivationColor);

  return (
    <ButtonAnimationWrapper action={action}
    width={width}
    height={height}
    active={active}
    padding={padding}
    desc_space={desc_space}
    opacity={0.5}
    position={'relative'}
    altInvert={true}
    id={id}
    description={active ? null : `${state ? 'Share-Screen' : 'Stop-Sharing'}`}
    zIndex={5}
    background={sharing_screen ? activationColor : null}
    borderRadius={5}
    >
        <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 0.821411C3.65326 0.821411 3.08097 1.03776 2.65901 1.42285C2.23705 1.80795 2 2.33026 2 2.87487V15.1956C1.99987 15.4654 2.05797 15.7325 2.17098 15.9817C2.284 16.231 2.44971 16.4574 2.65866 16.6482C2.8676 16.839 3.11568 16.9903 3.38873 17.0936C3.66178 17.1968 3.95444 17.25 4.25 17.25H23.75C24.3467 17.25 24.919 17.0336 25.341 16.6485C25.7629 16.2634 26 15.7411 26 15.1965V2.87578C26 2.33117 25.7629 1.80887 25.341 1.42377C24.919 1.03867 24.3467 0.822324 23.75 0.822324L4.25 0.821411ZM14.528 4.32689L17.783 7.29756C17.9196 7.42671 17.9951 7.59965 17.9933 7.77912C17.9915 7.95859 17.9125 8.13023 17.7734 8.25708C17.6342 8.38393 17.4461 8.45584 17.2495 8.45731C17.0528 8.45879 16.8634 8.38971 16.722 8.26497L14.748 6.4634V13.2599C14.748 13.4414 14.669 13.6155 14.5283 13.7439C14.3877 13.8723 14.1969 13.9444 13.998 13.9444C13.7991 13.9444 13.6083 13.8723 13.4677 13.7439C13.327 13.6155 13.248 13.4414 13.248 13.2599V6.46522L11.278 8.26497C11.2088 8.33037 11.1261 8.38255 11.0346 8.41846C10.9431 8.45437 10.8447 8.4733 10.7452 8.47413C10.6456 8.47496 10.5468 8.45769 10.4546 8.42331C10.3624 8.38893 10.2787 8.33814 10.2082 8.27391C10.1378 8.20967 10.082 8.13327 10.0443 8.04917C10.0065 7.96506 9.9875 7.87494 9.98832 7.78405C9.98913 7.69317 10.0098 7.60334 10.049 7.51981C10.0883 7.43629 10.1454 7.36073 10.217 7.29756L13.467 4.3278C13.5367 4.2642 13.6194 4.21374 13.7104 4.17931C13.8014 4.14489 13.899 4.12717 13.9975 4.12717C14.096 4.12717 14.1936 4.14489 14.2846 4.17931C14.3756 4.21374 14.4583 4.26328 14.528 4.32689Z" fill={textColor}/>
<rect x="4" y="19.7142" width="20" height="2.46429" rx="1" fill={textColor}/>
</svg>


        <Loading loading={loading} success_size={{width: 30, height: 30}} />
    </ButtonAnimationWrapper>
  )
}
