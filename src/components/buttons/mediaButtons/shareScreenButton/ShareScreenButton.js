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
    description={active ? null : `${state ? 'Share Screen' : 'Stop Sharing'}`}
    zIndex={5}
    background={sharing_screen ? activationColor : null}
    borderRadius={5}
    desc_width='100px'
    >
        <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.3125 3C4.16875 3 3.07185 3.39507 2.2631 4.09829C1.45435 4.80151 1 5.75529 1 6.74979V29.2485C0.999749 29.7411 1.11111 30.2289 1.32772 30.684C1.54433 31.1392 1.86195 31.5527 2.26242 31.9011C2.6629 32.2495 3.13839 32.5259 3.66174 32.7144C4.18508 32.903 4.74601 33 5.3125 33H42.6875C43.8312 33 44.9281 32.6049 45.7369 31.9017C46.5456 31.1985 47 30.2447 47 29.2502V6.75146C47 5.75695 46.5456 4.80318 45.7369 4.09996C44.9281 3.39673 43.8312 3.00167 42.6875 3.00167L5.3125 3ZM25.012 9.40131L31.2508 14.826C31.5125 15.0619 31.6572 15.3777 31.6537 15.7054C31.6503 16.0331 31.4989 16.3465 31.2323 16.5782C30.9656 16.8098 30.605 16.9411 30.2281 16.9438C29.8512 16.9465 29.4882 16.8204 29.2172 16.5926L25.4337 13.3028V25.7137C25.4337 26.0452 25.2822 26.3632 25.0126 26.5976C24.743 26.832 24.3774 26.9637 23.9962 26.9637C23.6149 26.9637 23.2493 26.832 22.9797 26.5976C22.7101 26.3632 22.5587 26.0452 22.5587 25.7137V13.3061L18.7828 16.5926C18.6503 16.712 18.4917 16.8073 18.3164 16.8729C18.141 16.9385 17.9524 16.973 17.7616 16.9745C17.5707 16.9761 17.3814 16.9445 17.2047 16.8817C17.028 16.819 16.8674 16.7262 16.7324 16.6089C16.5974 16.4916 16.4906 16.3521 16.4182 16.1985C16.3458 16.0449 16.3094 15.8804 16.3109 15.7144C16.3125 15.5484 16.3521 15.3844 16.4273 15.2319C16.5026 15.0793 16.612 14.9414 16.7492 14.826L22.9784 9.40298C23.1119 9.28683 23.2704 9.19468 23.4449 9.13182C23.6194 9.06895 23.8064 9.0366 23.9952 9.0366C24.1841 9.0366 24.3711 9.06895 24.5455 9.13182C24.72 9.19468 24.8785 9.28516 25.012 9.40131Z" fill={textColor}/>
<rect x="7" y="39" width="34.2857" height="5.14286" rx="1" fill={textColor}/>
</svg>




        <Loading loading={loading} success_size={{width: 30, height: 30}} />
    </ButtonAnimationWrapper>
  )
}
