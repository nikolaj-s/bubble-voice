import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Loading } from '../../../LoadingComponents/Loading/Loading'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ShareScreenButton = ({action, state, active, loading, id}) => {

  const textColor = useSelector(selectTextColor);



  return (
    <ButtonAnimationWrapper action={action}
    width={25}
    height={25}
    active={active}
    opacity={0.5}
    position={'relative'}
    invert={true}
    id={id}
    >
        {state ? 
        <svg
        width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.4168 6.25H45.8334V16.6667M27.0834 6.25H8.33342C7.22835 6.25 6.16854 6.68899 5.38714 7.47039C4.60573 8.25179 4.16675 9.3116 4.16675 10.4167V31.25C4.16675 32.3551 4.60573 33.4149 5.38714 34.1963C6.16854 34.9777 7.22835 35.4167 8.33342 35.4167H41.6668C42.7718 35.4167 43.8316 34.9777 44.613 34.1963C45.3944 33.4149 45.8334 32.3551 45.8334 31.25V25L27.0834 6.25ZM16.6667 43.75H33.3334H16.6667ZM25.0001 35.4167V43.75V35.4167ZM35.4168 16.6667L45.8334 6.25L35.4168 16.6667Z" stroke={textColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>        
        :
        <svg 
        width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.4168 6.25H45.8334V16.6667M27.0834 6.25H8.33342C7.22835 6.25 6.16854 6.68899 5.38714 7.47039C4.60573 8.25179 4.16675 9.3116 4.16675 10.4167V31.25C4.16675 32.3551 4.60573 33.4149 5.38714 34.1963C6.16854 34.9777 7.22835 35.4167 8.33342 35.4167H41.6668C42.7718 35.4167 43.8316 34.9777 44.613 34.1963C45.3944 33.4149 45.8334 32.3551 45.8334 31.25V25L27.0834 6.25ZM16.6667 43.75H33.3334H16.6667ZM25.0001 35.4167V43.75V35.4167ZM35.4168 16.6667L45.8334 6.25L35.4168 16.6667Z" stroke={textColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5.82861" width="4" height="53" rx="2" transform="rotate(-45 1 5.82861)" fill={textColor}/>
        </svg>
        }
        <Loading loading={loading} success_size={{width: 30, height: 30}} />
    </ButtonAnimationWrapper>
  )
}
