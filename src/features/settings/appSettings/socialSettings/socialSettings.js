import React from 'react'

import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';
import { useRoutes } from 'react-router';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { useDispatch, useSelector } from 'react-redux';
import { miscSettingsChannelSpecificStateChange, selectAutoPlayNativeVideos, selectDisableNsfwBlur, selectDisableNsfwWarning, selectHideLinksOnMedia, selectHideProfileImagesOnMessages, selectMaximizeMedia, selectMiscSettingsDisableMessagePopUp, selectMuteSocial, selectMuteSocialVideos } from '../MiscellaneousSettings/MiscellaneousSettingsSlice';
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

    const disableNsfwWarning = useSelector(selectDisableNsfwWarning);

    const disableNsfwBlur = useSelector(selectDisableNsfwBlur);

    const muteSocial = useSelector(selectMuteSocial);

    const update = (state) => {
        dispatch(miscSettingsChannelSpecificStateChange(state));
    }

    const accentColor = useSelector(selectAccentColor);

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Customize"} />
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
                    {hideLinksOnMedia ? null : <div className='message-link-placeholder'><p>https://link-placeholder</p></div>}
                    <div style={{backgroundColor: accentColor, width: '100%', maxWidth: maximizeMediaSize ? '100%' : 500, height: maximizeMediaSize ? 600 : 400}} className='media-message-place-holder'></div>
                </div>
            </div>
            <SettingsHeader title={'Content Filtering'} />
            <InputTitle title={"Remove Blur On Nsfw Content"} />
            <ToggleButton state={disableNsfwBlur} action={() => {update("disableNsfwBlur")}} />
            <InputTitle title={"Disable Explicit Content Detected Warning"} />
            <ToggleButton state={disableNsfwWarning} action={() => {update('disableNsfwWarning')}} />
            <SettingsHeader title={"Notifications"} />
            <InputTitle title={"Mute Social Overlay Notifications"} />
            <ToggleButton action={() => {update("muteSocial")}} state={muteSocial} />
            <SettingsHeader title={"Videos"} />
            <InputTitle title={"Auto Play Native Videos"} />
            <ToggleButton action={() => {update('autoPlayNativeVideos')}} state={autoPlaySocialVideos}  />
            <InputTitle title={"Mute Videos By Default Within Social"} />
            <ToggleButton action={() => {update("muteSocialVideos")}} state={muteSocialVideos}  /> 
            <div style={{height: 100, flexShrink: 0}} />
        </div>
    )
}

export const SocialSettings = () => useRoutes([
    { path: "socialsettings", element: <Settings /> }
])