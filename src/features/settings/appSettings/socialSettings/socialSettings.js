import React from 'react'

import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { useRoutes } from 'react-router';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { useDispatch, useSelector } from 'react-redux';
import { miscSettingsChannelSpecificStateChange, selectAutoPlayNativeVideos, selectHideLinksOnMedia, selectHideProfileImagesOnMessages, selectMaximizeMedia, selectMiscSettingsDisableMessagePopUp, selectMuteSocialVideos } from '../MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';

import "./socialSettings.css";
import { selectAccentColor } from '../appearanceSettings/appearanceSettingsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const autoPlaySocialVideos = useSelector(selectAutoPlayNativeVideos);

    const muteSocialVideos = useSelector(selectMuteSocialVideos);
    
    const disableMessagePopUp = useSelector(selectMiscSettingsDisableMessagePopUp);

    const hideLinksOnMedia = useSelector(selectHideLinksOnMedia);

    const maximizeMediaSize = useSelector(selectMaximizeMedia);

    const hideProfileImagesOnMessages = useSelector(selectHideProfileImagesOnMessages);

    const update = (state) => {
        dispatch(miscSettingsChannelSpecificStateChange(state));
    }

    const accentColor = useSelector(selectAccentColor);

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Customize"} />
            <InputTitle title={"Hide Links On Media"} />
            <ToggleButton state={hideLinksOnMedia} action={() => {update('hideLinksOnMedia')}} />
            <InputTitle title={"Hide Profile Images"} />
            <ToggleButton state={hideProfileImagesOnMessages} action={() => {update('hideProfileImagesOnMessages')}} />
            <InputTitle title={"Maximize Media Size"} />
            <ToggleButton state={maximizeMediaSize} action={() => {update('maximizeMediaSize')}} />
            <InputTitle title={"Preview"} />
            <div className='message-customize-container'>
                <div style={{width: 5, height: '100%', backgroundColor: accentColor, marginRight: 5}}></div>
                {hideProfileImagesOnMessages ? null : <div style={{backgroundColor: accentColor}} className='user-image-message-placeholder'></div>}
                <div className='message-content-place-holder'>
                    <div style={{backgroundColor: accentColor}} className='user-info-message-placeholder'></div>
                    {hideLinksOnMedia ? null : <div className='message-link-placeholder'><a>https://link-placeholder</a></div>}
                    <div style={{backgroundColor: accentColor, width: '100%', maxWidth: maximizeMediaSize ? '100%' : 500, height: maximizeMediaSize ? 600 : 400}} className='media-message-place-holder'></div>
                </div>
            </div>
            <SettingsHeader title={"Notifications"} />
            <InputTitle title={"Disable Message Pop Up's"} />
            <ToggleButton action={() => {update("disableMessagePopUp")}} state={disableMessagePopUp} />
            <SettingsHeader title={"Videos"} />
            <InputTitle title={"Toggle Auto Play Native Videos"} />
            <ToggleButton action={() => {update('autoPlayNativeVideos')}} state={autoPlaySocialVideos}  />
            <InputTitle title={"Mute Videos By Default Within Social"} />
            <ToggleButton action={() => {update("muteSocialVideos")}} state={muteSocialVideos}  /> 
        </div>
    )
}

export const SocialSettings = () => useRoutes([
    { path: "socialsettings", element: <Settings /> }
])