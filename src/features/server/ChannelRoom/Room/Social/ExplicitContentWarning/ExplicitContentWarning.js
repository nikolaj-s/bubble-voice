import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSocialById, selectNsfwNoticeState, toggleNsfwNotice } from '../../../../SocialSlice'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AltWarningIcon } from '../../../../../../components/Icons/AltWarningIcon/AltWarningIcon'


import "./ExplicitContentWarning.css";
import { selectChannelSocialId, selectCurrentChannelId, setChannelSocialId } from '../../../../ServerSlice';
import { miscSettingsChannelSpecificStateChange, selectDisableNsfwWarning } from '../../../../../settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const ExplicitContentWarning = () => {

    const dispatch = useDispatch();

    const nsfwWarning = useSelector(selectNsfwNoticeState);

    const disableNsfwWarning = useSelector(selectDisableNsfwWarning);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const socialId = useSelector(selectChannelSocialId);

    const channel = useSelector(selectCurrentChannelId);
    
    const handleGoBack = () => {

        dispatch(clearSocialById(socialId));

        dispatch(setChannelSocialId(""));

        if (channel) {
            document.getElementsByClassName('stream-server-button')[0]?.click();
        }

    }

    const handleProceed = () => {
        dispatch(toggleNsfwNotice(false));
    }

    const disableAndProceed = () => {
        dispatch(miscSettingsChannelSpecificStateChange('disableNsfwWarning'));

        handleProceed();
    }

    return (
        <>
        {nsfwWarning && !disableNsfwWarning ?
        <div 
        style={{
            backgroundColor: secondaryColor
        }}
        className='nsfw-notice-container'>
            <div 
            style={{backgroundColor: primaryColor}}
            className='inner-notice-wrapper'>
                <AltWarningIcon />
                <h3
                style={{color: textColor}}
                >Warning Explicit Content Has Been Detected In This Channel</h3>
                <div className='explicit-notice-button-wrapper'>
                    <p onClick={disableAndProceed} style={{color: textColor}}>Don't Show This Message Again and Proceed</p>
                    <div className='inner-notice-button-wrapper'>
                        <h3 onClick={handleGoBack} style={{color: textColor}}>
                            Go Back
                        </h3>
                        <h3 onClick={handleProceed} style={{color: textColor}}>
                            Proceed
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        : null}
        </>
    )
}
