import React from 'react'
import { TextButton } from '../../../components/buttons/textButton/TextButton'
import { PayPalIcon } from '../../../components/Icons/PayPalIcon/PayPalIcon'

import "./StreamingMessage.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectStreamingMessage, toggleStreamingMessage } from '../ControlBarSlice';
import { CloseIcon } from '../../../components/Icons/CloseIcon/CloseIcon';

import "./StreamingMessage.css";
import { selectAccentColor, selectGlassColor, selectSecondaryColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const StreamingMessage = () => {

    const dispatch = useDispatch();

    const streamingMessageActive = useSelector(selectStreamingMessage);

    const glassColor = useSelector(selectGlassColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const accentColor = useSelector(selectAccentColor);

    const closeStreamMessage = () => {
        dispatch(toggleStreamingMessage(false));
    }

    const openDonateLink = () => {
        window.open("https://www.paypal.com/donate/?business=GBR43UKE9FQ92&no_recurring=0&item_name=Donate+to+help+with+covering+the+costs+of+bubble+servers&currency_code=CAD")
    }

    return (
    <>
       {streamingMessageActive ?
        <div style={{backgroundColor: glassColor}} className='streaming-time-cost-message'>
            <div
            style={{backgroundColor: secondaryColor}}
            className='streaming-time-innner-wrapper'>
                <div onClick={closeStreamMessage} style={{backgroundColor: accentColor}} className='close-streaming-message'>
                    <CloseIcon />
                </div>
                <h3
                style={{color: textColor}}
                >You have been streaming for over 20 minutes, please consider donating to cover server costs as streaming video is not FREE!</h3>
                <TextButton action={openDonateLink} name="Contribute" icon={<PayPalIcon />} />
            </div>
            
        </div> 
        : null}
    </>
    )
}
