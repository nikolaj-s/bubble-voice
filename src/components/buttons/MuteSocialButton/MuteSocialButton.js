import React from 'react'

import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const MuteSocialButton = (props) => {

    const textColor = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper {...props} >
            {props.state ?
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9609 30C15.6055 30 16.9511 28.6154 16.9511 26.9231H10.9707C10.9707 27.7391 11.2857 28.5218 11.8465 29.0988C12.4073 29.6758 13.1678 30 13.9609 30ZM22.9316 13.0769C22.9316 8.35385 20.4796 4.4 16.2036 3.35385V2.30769C16.2036 1.03077 15.2018 0 13.9609 0C12.72 0 11.7182 1.03077 11.7182 2.30769V3.35385C11.3594 3.44615 11.0155 3.58462 10.6866 3.70769L22.9316 16.3077V13.0769ZM4.10811 1.30769L2 3.47692L6.20127 7.8C5.42381 9.33846 4.99022 11.1231 4.99022 13.0769V20.7692L3.06153 22.7538C2.11961 23.7231 2.77746 25.3846 4.10811 25.3846H23.2904L25.8919 28.0615L28 25.8923L4.10811 1.30769Z" fill={textColor}/>
            </svg>
            
                                
            :
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.002 30C16.7422 30 18.166 28.6154 18.166 26.9231H11.8379C11.8379 27.7391 12.1713 28.5218 12.7646 29.0988C13.358 29.6758 14.1628 30 15.002 30ZM24.4941 20.7692V13.0769C24.4941 8.35385 21.8996 4.4 17.375 3.35385V2.30769C17.375 1.03077 16.315 0 15.002 0C13.6889 0 12.6289 1.03077 12.6289 2.30769V3.35385C8.08853 4.4 5.50984 8.33846 5.50984 13.0769V20.7692L3.46903 22.7538C2.47236 23.7231 3.16845 25.3846 4.57645 25.3846H25.4116C26.8196 25.3846 27.5315 23.7231 26.5349 22.7538L24.4941 20.7692Z" fill={textColor}/>
            </svg>
            }

        </ButtonAnimationWrapper>

    )
}
