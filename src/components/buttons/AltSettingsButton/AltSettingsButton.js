import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import { useNavigate } from 'react-router';

export const AltSettingsButton = ({active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const navigate = useNavigate();

    const handleHover = (bool) => {
        if (!active) return;

        toggleHover(bool)
    }

    const action = () => {
       
        const url = window.location.hash.split('#')[1]

        if (url.search('/appsettings') === -1) {
            if (url.includes('server-settings')) {
                navigate(url.split('/server-settings')[0] + '/appsettings/account')
            } else {
                navigate(url + "/appsettings/account")
            }
            
        } else {
            navigate(url.split('/appsettings')[0])
        }

        
        toggleHover(false);
    }

    return (
        <div 
        id={"disconnect-from-channel-button"}
        onClick={action}
        style={{margin: '7px 0px 0px 0px',opacity: !active ? 0.6 : 1, cursor: !active ? 'default' : 'pointer'}}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover  ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.015 2.8125C15.9325 2.8225 16.8463 2.92875 17.7425 3.12875C17.9332 3.17131 18.1058 3.27238 18.2362 3.41783C18.3667 3.56327 18.4484 3.74583 18.47 3.94L18.6825 5.84875C18.7125 6.11786 18.8053 6.37616 18.9533 6.60288C19.1014 6.8296 19.3005 7.01841 19.5349 7.15411C19.7692 7.28981 20.0321 7.36862 20.3024 7.38419C20.5727 7.39976 20.8429 7.35165 21.0913 7.24375L22.8413 6.475C23.0191 6.39669 23.2168 6.37555 23.4072 6.41452C23.5975 6.45348 23.771 6.55062 23.9038 6.6925C25.1691 8.04376 26.1115 9.66441 26.66 11.4325C26.7174 11.6184 26.7154 11.8176 26.6545 12.0024C26.5936 12.1871 26.4767 12.3484 26.32 12.4637L24.7688 13.6088C24.5502 13.769 24.3725 13.9784 24.25 14.2201C24.1274 14.4618 24.0636 14.729 24.0636 15C24.0636 15.271 24.1274 15.5382 24.25 15.7799C24.3725 16.0216 24.5502 16.231 24.7688 16.3912L26.3225 17.535C26.4795 17.6504 26.5965 17.8119 26.6574 17.9969C26.7184 18.182 26.7202 18.3814 26.6625 18.5675C26.1142 20.3354 25.1722 21.956 23.9075 23.3075C23.775 23.4493 23.6018 23.5465 23.4117 23.5857C23.2216 23.6249 23.0241 23.6041 22.8463 23.5262L21.0888 22.755C20.8408 22.6463 20.5706 22.5974 20.3002 22.6125C20.0299 22.6275 19.7668 22.706 19.5324 22.8416C19.298 22.9772 19.0988 23.1661 18.9509 23.3929C18.8031 23.6198 18.7107 23.8783 18.6813 24.1475L18.4688 26.055C18.4476 26.2469 18.3676 26.4276 18.2399 26.5723C18.1121 26.7171 17.9428 26.8188 17.755 26.8637C15.9445 27.2945 14.0581 27.2945 12.2475 26.8637C12.0595 26.8191 11.8899 26.7174 11.7619 26.5726C11.634 26.4278 11.5538 26.2471 11.5325 26.055L11.3213 24.15C11.2906 23.8816 11.1974 23.6242 11.0492 23.3984C10.901 23.1726 10.7019 22.9846 10.4679 22.8497C10.2339 22.7148 9.97152 22.6366 9.70183 22.6215C9.43214 22.6063 9.16266 22.6546 8.91503 22.7625L7.15753 23.5325C6.97959 23.6107 6.78177 23.6316 6.59142 23.5924C6.40107 23.5532 6.22761 23.4558 6.09503 23.3137C4.83011 21.9607 3.88858 20.3383 3.34128 18.5687C3.28365 18.3827 3.28542 18.1832 3.34635 17.9982C3.40729 17.8132 3.52435 17.6517 3.68128 17.5363L5.23503 16.3912C5.45358 16.231 5.63132 16.0216 5.75384 15.7799C5.87635 15.5382 5.9402 15.271 5.9402 15C5.9402 14.729 5.87635 14.4618 5.75384 14.2201C5.63132 13.9784 5.45358 13.769 5.23503 13.6088L3.68128 12.4662C3.52435 12.3508 3.40729 12.1893 3.34635 12.0043C3.28542 11.8193 3.28365 11.6198 3.34128 11.4338C3.8898 9.66567 4.83218 8.04501 6.09753 6.69375C6.23026 6.55187 6.40379 6.45473 6.59413 6.41577C6.78447 6.3768 6.98222 6.39794 7.16003 6.47625L8.91003 7.245C9.1588 7.35284 9.4294 7.40083 9.70008 7.38511C9.97077 7.36939 10.234 7.2904 10.4686 7.15449C10.7032 7.01858 10.9027 6.82954 11.051 6.60255C11.1993 6.37556 11.2923 6.11695 11.3225 5.8475L11.535 3.94C11.5565 3.74544 11.6383 3.56248 11.769 3.41677C11.8997 3.27106 12.0727 3.16991 12.2638 3.1275C13.1675 2.92777 14.0895 2.8222 15.015 2.8125ZM15 11.25C14.0055 11.25 13.0516 11.6451 12.3484 12.3483C11.6451 13.0516 11.25 14.0054 11.25 15C11.25 15.9946 11.6451 16.9484 12.3484 17.6517C13.0516 18.3549 14.0055 18.75 15 18.75C15.9946 18.75 16.9484 18.3549 17.6517 17.6517C18.3549 16.9484 18.75 15.9946 18.75 15C18.75 14.0054 18.3549 13.0516 17.6517 12.3483C16.9484 11.6451 15.9946 11.25 15 11.25Z" fill={textColor}/>
            </svg>
            </div>
            
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Settings</h2>
            </div>
            : null}
        </div>
    )
}