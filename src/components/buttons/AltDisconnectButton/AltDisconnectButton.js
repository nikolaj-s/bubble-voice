import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { leaveChannel, selectCurrentChannel } from '../../../features/server/ServerSlice';
import { selectUsername } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { playSoundEffect } from '../../../features/settings/soundEffects/soundEffectsSlice';
import { clearWidgetOverLay } from '../../../features/server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice';
import { useNavigate } from 'react-router';

export const AltDisconnectButton = ({active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const username = useSelector(selectUsername);

    const navigate = useNavigate();

    const channel = useSelector(selectCurrentChannel);

    const handleHover = (bool) => {
        if (!active) return;

        toggleHover(bool)
    }

    const action = () => {

        if (!active) return;

        dispatch(leaveChannel({username: username}));

        dispatch(playSoundEffect({default: 'disconnected'}));

        dispatch(clearWidgetOverLay());

        navigate(window.location.hash.split('#')[1].split('/channel')[0])
        
        toggleHover(false);
    }

    return (
        <div 
        id={"disconnect-from-channel-button"}
        onClick={action}
        style={{margin: '5px 0px',opacity: !active ? 0.6 : 1, cursor: !active ? 'default' : 'pointer'}}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover  ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
                <svg 
                width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.6351 5.36504C44.7515 5.48115 44.8439 5.61909 44.9069 5.77095C44.9699 5.92282 45.0023 6.08562 45.0023 6.25004C45.0023 6.41446 44.9699 6.57726 44.9069 6.72912C44.8439 6.88098 44.7515 7.01892 44.6351 7.13504L40.4651 11.305C41.9729 13.2468 42.7205 15.6719 42.5677 18.1256C42.4149 20.5792 41.3722 22.8929 39.6351 24.6325L38.8851 25.3825L38.8776 25.39L38.1051 26.1625C37.6129 26.6541 36.9457 26.9302 36.2501 26.9302C35.5545 26.9302 34.8873 26.6541 34.3951 26.1625L23.8376 15.605C23.5938 15.3613 23.4004 15.0719 23.2685 14.7534C23.1366 14.4349 23.0687 14.0935 23.0687 13.7488C23.0687 13.404 23.1366 13.0627 23.2685 12.7442C23.4004 12.4257 23.5938 12.1363 23.8376 11.8925L25.3651 10.3675C27.1041 8.62837 29.4184 7.58423 31.8731 7.43139C34.3278 7.27855 36.7538 8.02752 38.6951 9.53754L42.8651 5.36504C42.9812 5.24863 43.1192 5.15627 43.271 5.09326C43.4229 5.03024 43.5857 4.9978 43.7501 4.9978C43.9145 4.9978 44.0773 5.03024 44.2292 5.09326C44.3811 5.15627 44.519 5.24863 44.6351 5.36504ZM37.8501 12.1175C36.4252 10.7025 34.4977 9.90962 32.4895 9.91243C30.4813 9.91524 28.5561 10.7135 27.1351 12.1325L26.3851 12.8825C26.2713 12.9963 26.1811 13.1313 26.1195 13.28C26.058 13.4286 26.0263 13.5879 26.0263 13.7488C26.0263 13.9097 26.058 14.069 26.1195 14.2176C26.1811 14.3662 26.2713 14.5013 26.3851 14.615L35.3851 23.615C35.8601 24.0925 36.6351 24.095 37.1126 23.62L37.1176 23.615L37.8676 22.865C39.2872 21.4444 40.0859 19.519 40.0888 17.5106C40.0916 15.5023 39.2983 13.5746 37.8826 12.15L37.8651 12.135L37.8501 12.1175ZM23.3851 21.6175C23.6195 21.8519 23.7511 22.1698 23.7511 22.5013C23.7511 22.8327 23.6195 23.1506 23.3851 23.385L19.2676 27.5L22.5001 30.7325L26.6151 26.615C26.7313 26.4988 26.8693 26.4066 27.0212 26.3437C27.173 26.2808 27.3358 26.2485 27.5001 26.2485C27.6645 26.2485 27.8272 26.2808 27.9791 26.3437C28.1309 26.4066 28.2689 26.4988 28.3851 26.615C28.5013 26.7313 28.5935 26.8692 28.6564 27.0211C28.7193 27.1729 28.7517 27.3357 28.7517 27.5C28.7517 27.6644 28.7193 27.8271 28.6564 27.979C28.5935 28.1308 28.5013 28.2688 28.3851 28.385L24.2676 32.5L25.3851 33.6175C26.0836 34.3161 26.4759 35.2635 26.4759 36.2513C26.4759 37.2391 26.0836 38.1865 25.3851 38.885L24.6351 39.635C22.8961 41.3742 20.5818 42.4183 18.1271 42.5712C15.6724 42.724 13.2464 41.9751 11.3051 40.465L7.13511 44.635C6.9004 44.8698 6.58205 45.0016 6.25011 45.0016C5.91817 45.0016 5.59983 44.8698 5.36511 44.635C5.1304 44.4003 4.99854 44.082 4.99854 43.75C4.99854 43.4181 5.1304 43.0998 5.36511 42.865L9.53761 38.695C8.02797 36.7542 7.27898 34.3289 7.43136 31.8748C7.58373 29.4207 8.62698 27.1067 10.3651 25.3675L11.1151 24.6175C11.4611 24.2713 11.8718 23.9967 12.3239 23.8093C12.7761 23.6219 13.2607 23.5255 13.7501 23.5255C14.2395 23.5255 14.7242 23.6219 15.1763 23.8093C15.6284 23.9967 16.0392 24.2713 16.3851 24.6175L17.5001 25.7325L21.6151 21.615C21.7312 21.4986 21.8692 21.4063 22.021 21.3433C22.1729 21.2802 22.3357 21.2478 22.5001 21.2478C22.6645 21.2478 22.8273 21.2802 22.9792 21.3433C23.1311 21.4063 23.269 21.4986 23.3851 21.615V21.6175ZM12.1476 37.88C13.572 39.2968 15.5 40.091 17.5089 40.0887C19.5179 40.0863 21.444 39.2876 22.8651 37.8675L23.6151 37.1175C23.7289 37.0038 23.8191 36.8687 23.8807 36.7201C23.9423 36.5715 23.974 36.4122 23.974 36.2513C23.974 36.0904 23.9423 35.9311 23.8807 35.7825C23.8191 35.6338 23.7289 35.4988 23.6151 35.385L14.6151 26.385C14.3855 26.156 14.0744 26.0274 13.7501 26.0274C13.4258 26.0274 13.1147 26.156 12.8851 26.385L12.1351 27.135C10.7129 28.5583 9.91399 30.488 9.91399 32.5C9.91399 34.5121 10.7129 36.4418 12.1351 37.865L12.1476 37.88Z" fill={textColor}/>
                </svg>
            </div>
            
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Disconnect From {channel.channel_name}</h2>
            </div>
            : null}
        </div>
    )
}