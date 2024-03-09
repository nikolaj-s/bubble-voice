import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { selectAccentColor, selectTextColor, selectPrimaryColor} from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { checkConnection, selectServerPing } from '../../features/server/ServerSlice';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { selectConnectionError, selectConnectionLoading } from '../../features/controlBar/ControlBarSlice';

export const AltConnectionIndicator = ({active}) => {

    const dispatch = useDispatch();

    const [hover, toggleHover] = React.useState(false);

    const loading = useSelector(selectConnectionLoading);

    const error = useSelector(selectConnectionError);

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);
    
    const accentColor = useSelector(selectAccentColor);

    const ping = useSelector(selectServerPing);

    const handleHover = (bool) => {

        if (!active) return;

        toggleHover(bool)
    }

    const action = () => {
        if (!active) return;

        dispatch(checkConnection());
    }

    return (
        <div 
        onClick={action}
        style={{margin: '5px 0px 0px 0px', opacity: !active ? 0.6 : 1, cursor: !active ? 'default' : 'pointer'}}
        onMouseEnter={() => {handleHover(true)}}
        onMouseLeave={() => {handleHover(false)}}
        className='saved-media-container'>
            <div style={{backgroundColor: accentColor, borderRadius: hover  ? '10px' : '50%', transition: '0.1s'}} className='extra-button-icon-container'>
            <div style={{display: 'flex', width: 20, height: 20, justifyContent: 'center', alignItems: 'flex-end'}}>
                <div style={{width: 5, height: 20, backgroundColor: ping <= 60 ? '#07fc03' : textColor, marginRight: 2, borderRadius: 4}} />
                <div style={{width: 5, height: 15, backgroundColor: ping <= 60 ? '#07fc03' : ping <= 110 ? 'yellow' : textColor, marginRight: 2, borderRadius: 4}} />
                <div style={{width: 5, height: 10, backgroundColor: ping <= 60 ? '#07fc03' : ping <= 110 ? 'yellow' : ping <= 999 ? 'red' : textColor, borderRadius: 4}} />
            </div>
            <Loading success_size={{width: 20, height: 20}} loading={loading} error={error} />
            </div>
            
            {hover ? 
            <div onMouseEnter={() => {toggleHover(false)}} style={{backgroundColor: primaryColor}} className='server-button-name-container'>
                <h2 style={{color: textColor}}>Ping: {ping}ms</h2>
            </div>
            : null}
        </div>
    )
}