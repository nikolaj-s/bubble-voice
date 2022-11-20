import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { Loading } from '../../../LoadingComponents/Loading/Loading'
import { ButtonAnimationWrapper } from '../../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const WebCamButton = ({action, state, active, id, loading = true}) => {

  const color = useSelector(selectTextColor);

  return (
    <ButtonAnimationWrapper action={action}
    width={25}
    height={25}
    active={active || loading}
    opacity={0.5}
    id={id}
    position={'relative'}
    invert={true}
    description={active ? null : `Turn ${state ? 'On' : 'Off'} Webcam`}
    zIndex={5}
    borderRadius={10}
    >
        {state ?
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.7501 14.8959C43.1171 14.6109 42.4143 14.5182 41.7291 14.6293C41.0439 14.7404 40.4064 15.0505 39.8959 15.5209L35.4167 19.6876V16.6667C35.4167 15.0091 34.7583 13.4194 33.5862 12.2473C32.4141 11.0752 30.8244 10.4167 29.1667 10.4167H10.4167C8.75914 10.4167 7.16943 11.0752 5.99733 12.2473C4.82523 13.4194 4.16675 15.0091 4.16675 16.6667V33.3334C4.16675 34.991 4.82523 36.5807 5.99733 37.7528C7.16943 38.9249 8.75914 39.5834 10.4167 39.5834H29.1667C30.8244 39.5834 32.4141 38.9249 33.5862 37.7528C34.7583 36.5807 35.4167 34.991 35.4167 33.3334V30.3126L39.9167 34.4792C40.5792 35.0789 41.4398 35.4128 42.3334 35.4167C42.8293 35.4156 43.3193 35.3091 43.7709 35.1042C44.3854 34.8557 44.9118 34.4296 45.2829 33.8804C45.654 33.3311 45.8529 32.6837 45.8542 32.0209V17.9792C45.8512 17.314 45.6492 16.6649 45.2743 16.1154C44.8993 15.5659 44.3684 15.1412 43.7501 14.8959V14.8959ZM31.2501 33.3334C31.2501 33.8859 31.0306 34.4159 30.6399 34.8066C30.2492 35.1973 29.7193 35.4167 29.1667 35.4167H10.4167C9.86421 35.4167 9.33431 35.1973 8.94361 34.8066C8.55291 34.4159 8.33341 33.8859 8.33341 33.3334V16.6667C8.33341 16.1142 8.55291 15.5843 8.94361 15.1936C9.33431 14.8029 9.86421 14.5834 10.4167 14.5834H29.1667C29.7193 14.5834 30.2492 14.8029 30.6399 15.1936C31.0306 15.5843 31.2501 16.1142 31.2501 16.6667V33.3334ZM41.6667 30.4167L35.8126 25.0001L41.6667 19.5834V30.4167Z" fill={color} />
        </svg>        
        : 
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.7501 14.8957C43.1171 14.6107 42.4143 14.518 41.7291 14.6291C41.0439 14.7402 40.4064 15.0502 39.8959 15.5207L35.4167 19.6873V16.6665C35.4167 15.0089 34.7583 13.4192 33.5862 12.2471C32.4141 11.075 30.8244 10.4165 29.1667 10.4165H10.4167C8.75914 10.4165 7.16943 11.075 5.99733 12.2471C4.82523 13.4192 4.16675 15.0089 4.16675 16.6665V33.3332C4.16675 34.9908 4.82523 36.5805 5.99733 37.7526C7.16943 38.9247 8.75914 39.5832 10.4167 39.5832H29.1667C30.8244 39.5832 32.4141 38.9247 33.5862 37.7526C34.7583 36.5805 35.4167 34.9908 35.4167 33.3332V30.3123L39.9167 34.479C40.5792 35.0787 41.4398 35.4125 42.3334 35.4165C42.8293 35.4153 43.3193 35.3088 43.7709 35.104C44.3854 34.8554 44.9118 34.4293 45.2829 33.8801C45.654 33.3309 45.8529 32.6835 45.8542 32.0207V17.979C45.8512 17.3138 45.6492 16.6647 45.2743 16.1152C44.8993 15.5657 44.3684 15.141 43.7501 14.8957ZM31.2501 33.3332C31.2501 33.8857 31.0306 34.4156 30.6399 34.8063C30.2492 35.197 29.7193 35.4165 29.1667 35.4165H10.4167C9.86421 35.4165 9.33431 35.197 8.94361 34.8063C8.55291 34.4156 8.33341 33.8857 8.33341 33.3332V16.6665C8.33341 16.114 8.55291 15.5841 8.94361 15.1934C9.33431 14.8027 9.86421 14.5832 10.4167 14.5832H29.1667C29.7193 14.5832 30.2492 14.8027 30.6399 15.1934C31.0306 15.5841 31.2501 16.114 31.2501 16.6665V33.3332ZM41.6667 30.4165L35.8126 24.9998L41.6667 19.5832V30.4165Z" fill={color}/>
        <rect y="7.82861" width="4" height="53" rx="2" transform="rotate(-45 0 7.82861)" fill={color} />
        </svg>
        }
        <Loading success_size={{width: 30, height: 30}} loading={loading} />
    </ButtonAnimationWrapper>
  )
}
