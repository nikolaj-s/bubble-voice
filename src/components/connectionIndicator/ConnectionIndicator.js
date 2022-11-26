import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectConnectionError, selectConnectionLoading } from '../../features/controlBar/ControlBarSlice';
import { checkConnection, selectServerPing } from '../../features/server/ServerSlice';

import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper';
import { Loading } from '../LoadingComponents/Loading/Loading';

export const ConnectionIndicator = ({active}) => {

    const dispatch = useDispatch();

    const [showPing, toggleShowPing] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const loading = useSelector(selectConnectionLoading);

    const error = useSelector(selectConnectionError);
    
    const ping = useSelector(selectServerPing);

    const handleToggleShowPing = () => {
        toggleShowPing(!showPing);
        dispatch(checkConnection());
    }
    
    return (
        <ButtonAnimationWrapper action={active ? handleToggleShowPing : null} zIndex={3} description={active ? `${ping}ms` : null} opacity={active ? 1 : 0.2} width={25} height={25} position={'relative'} active={!active} invert={true} >
            {ping === 0 ?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" stroke={textColor} stroke-width="2"/>
            <path opacity="0.8" d="M7.75695 13.757C8.31412 13.1998 8.9756 12.7577 9.70362 12.4561C10.4316 12.1545 11.2119 11.9993 12 11.9993C12.788 11.9993 13.5683 12.1545 14.2963 12.4561C15.0243 12.7577 15.6858 13.1998 16.243 13.757M4.92895 10.93C8.83395 7.02502 15.166 7.02502 19.071 10.93M2.10095 8.10002C7.56795 2.63202 16.432 2.63202 21.899 8.10002" stroke={textColor} stroke-opacity="0.2" stroke-width="2"/>
            </svg>
            : ping >= 1 && ping < 50 ?             
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M7.75695 13.757C8.31412 13.1998 8.9756 12.7577 9.70362 12.4561C10.4316 12.1545 11.2119 11.9993 12 11.9993C12.788 11.9993 13.5683 12.1545 14.2963 12.4561C15.0243 12.7577 15.6858 13.1998 16.243 13.757M4.92895 10.93C8.83395 7.02502 15.166 7.02502 19.071 10.93M2.10095 8.10002C7.56795 2.63202 16.432 2.63202 21.899 8.10002M12 20C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7892 19.0392 14 18.5305 14 18C14 17.4696 13.7892 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16C11.4695 16 10.9608 16.2107 10.5857 16.5858C10.2107 16.9609 9.99995 17.4696 9.99995 18C9.99995 18.5305 10.2107 19.0392 10.5857 19.4142C10.9608 19.7893 11.4695 20 12 20Z" stroke={textColor} strokeWidth="2"/>
           </svg>      
            : ping > 50 && ping < 100 ?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75696 13.7567C8.31412 13.1995 8.9756 12.7574 9.70362 12.4558C10.4316 12.1542 11.2119 11.999 12 11.999C12.788 11.999 13.5683 12.1542 14.2963 12.4558C15.0243 12.7574 15.6858 13.1995 16.243 13.7567M4.92896 10.9297C8.83396 7.02473 15.166 7.02473 19.071 10.9297M12 19.9997C12.5304 19.9997 13.0391 19.789 13.4142 19.4139C13.7892 19.0389 14 18.5302 14 17.9997C14 17.4693 13.7892 16.9606 13.4142 16.5855C13.0391 16.2104 12.5304 15.9997 12 15.9997C11.4695 15.9997 10.9608 16.2104 10.5857 16.5855C10.2107 16.9606 9.99996 17.4693 9.99996 17.9997C9.99996 18.5302 10.2107 19.0389 10.5857 19.4139C10.9608 19.789 11.4695 19.9997 12 19.9997Z" stroke={textColor} stroke-width="2"/>
            <path opacity="0.8" d="M2.09998 8.09976C7.56798 2.63276 16.432 2.63276 21.9 8.09976" stroke={textColor} stroke-opacity="0.2" stroke-width="2"/>
            </svg>
            : 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75696 13.7572C8.31412 13.2 8.9756 12.7579 9.70362 12.4563C10.4316 12.1547 11.2119 11.9995 12 11.9995C12.788 11.9995 13.5683 12.1547 14.2963 12.4563C15.0243 12.7579 15.6858 13.2 16.243 13.7572M12 20.0002C12.5304 20.0002 13.0391 19.7895 13.4142 19.4144C13.7892 19.0394 14 18.5307 14 18.0002C14 17.4698 13.7892 16.9611 13.4142 16.586C13.0391 16.2109 12.5304 16.0002 12 16.0002C11.4695 16.0002 10.9608 16.2109 10.5857 16.586C10.2107 16.9611 9.99996 17.4698 9.99996 18.0002C9.99996 18.5307 10.2107 19.0394 10.5857 19.4144C10.9608 19.7895 11.4695 20.0002 12 20.0002Z" stroke={textColor} stroke-width="2"/>
            <path opacity="0.8" d="M4.92895 10.929C8.83395 7.02402 15.166 7.02402 19.071 10.929M2.10095 8.10002C7.56795 2.63202 16.432 2.63202 21.899 8.10002" stroke={textColor} stroke-opacity="0.2" stroke-width="2"/>
            </svg>
            }
            <Loading success_size={{width: 20, height: 20}} loading={loading} error={error} />
        </ButtonAnimationWrapper>

    )
}
