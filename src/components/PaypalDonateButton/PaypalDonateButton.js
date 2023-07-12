import React from 'react'
import { TextButton } from '../buttons/textButton/TextButton';

import './PayPalDonateButton.css'
import { PayPalIcon } from '../Icons/PayPalIcon/PayPalIcon';
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const PaypalDonateButton = () => {

    const textColor = useSelector(selectTextColor);

    const openDonateLink = () => {
        window.open("https://www.paypal.com/donate/?business=GBR43UKE9FQ92&no_recurring=0&item_name=Donate+to+help+with+covering+the+costs+of+bubble+servers&currency_code=CAD")
    }

    return (
        <div className='paypal-donate-button-container'>
            <h3 style={{color: textColor}}>Help Contribute To The Development of Bubble</h3>
            <TextButton action={openDonateLink} icon={<PayPalIcon />} name={"Donate"} />
        </div>
    )
}
