import React from 'react'
import { ProfileImage } from '../ProfileImage/ProfileImage'
import { ProfilePictureShape } from '../ProfilePictureShape/ProfilePictureShape'
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle'
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput'
import { TogglePreviewButton } from '../../../../../components/buttons/TogglePreviewButton/TogglePreviewButton'
import { UserBio } from '../../../../../components/UserBio/UserBio'
import { TextArea } from '../../../../../components/inputs/TextArea/TextArea'
import { ToggleButton } from '../../../../../components/buttons/ToggleButton/ToggleButton';
import { ScreenShotShowCase } from '../../../../../components/ScreenShotShowCase/ScreenShotShowCase'
import { ColorInput } from '../../../../../components/inputs/ColorInput/ColorInput'
import { ImageInput } from '../../../../../components/inputs/ImageInput/ImageInput'
import { useSelector } from 'react-redux'
import { selectGlassColor, selectPrimaryColor, selectTextColor } from '../../appearanceSettings/appearanceSettingsSlice'

import "./EditMemberPanel.css";

export const EditMemberPanel = ({
    color, 
    updateColor, 
    newShape, 
    getNewUserBanner, 
    getNewUserImage, 
    userImage, 
    userBanner, 
    changeProfileShape, 
    handleInput, 
    newBanner,
    newImage,
    displayName, 
    previewBio, 
    togglePreviewBio, 
    profileBio, 
    changeProfileBio,
    showCaseScreenShots,
    toggleShowCaseScreenShots,
    screenShots,
    handleNewDisplayName,
    username,
    disablePreview
    }) => {
    
    const accentColor = useSelector(selectTextColor);   

    const primaryColor = useSelector(selectPrimaryColor);

    const glassColor = useSelector(selectGlassColor);

    const [preview, togglePreview] = React.useState(false);

    const textColor = useSelector(selectTextColor);

    return (
        
        <div style={{flexShrink: 0,padding: '5px', borderRadius: '8px', maxWidth: 750, position: 'relative', width: '100%', minHeight: 800}} className='edit-member-panel-container'>
            <div style={{width: '100%', maxWidth: 350, flexShrink: 0}}> 
                <div style={{display: 'flex', width: '100%', alignItems: 'center',}}>
                    <InputTitle width={'calc(100% - 50px)'} title={"Update Profile Image"} />
                </div>
                <div
                style={{
                    width: 100,
                    height: 100,
                    position: 'relative'
                }}
                >
                <ImageInput position='absolute' imageCleared={newImage} listenToClears={true} centerButtons={true} backgroundColor={'rgba(0,0,0,0)'} maxDimensions={250} getFile={getNewUserImage} initalImage={userImage} zIndex='1' width={"100px"} height={"100px"} borderRadius={newShape === 'circle' ? '50%' : '10px'} />
                </div>
                <ProfilePictureShape action={changeProfileShape} shape={newShape} />
                <InputTitle title={"Update Profile Banner"} />
                <ProfileImage newBanner={newBanner} newImage={newImage} color={updateColor} shape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} />
                <InputTitle title={"Change Accent Color"} />
                <ColorInput rgb={color} action={updateColor} />
                <InputTitle title={'Change Display Name'} />
                <TextInput stateSelector='display_name' action={handleNewDisplayName} inputValue={displayName} placeholder={""} />
                <InputTitle  title={'Bio Hint: Pasting Image Links Will Display The Image'} />
                {previewBio ?
                <UserBio bio={profileBio} />
                :
                <TextArea inputValue={profileBio} action={changeProfileBio} height={300} />
                }
                
                <InputTitle title={"Showcase Recent Screen Shots"} />
                <ToggleButton state={showCaseScreenShots} action={toggleShowCaseScreenShots} />
                <div style={{height: 5, flexShrink: 0}}></div>
                {showCaseScreenShots ? <ScreenShotShowCase screenShots={screenShots} /> : null}
            </div>
            <div>
                <InputTitle title={"Preview"} />
                <div 
                style={{backgroundColor: color}}
                className='edit-panel-profile-preview'>
                    <div className='profile-banner-preview-wrapper'>
                        <img className='profile-baner-source' src={newBanner?.preview || userBanner} />
                        <img style={{borderRadius: newShape === 'square' ? 5 : '50%'}} className='profile-image-source' src={newImage?.preview || userImage} />
                    </div>
                    <div 
                    style={{backgroundColor: primaryColor}}
                    className='profile-preview-display-name-wrapper'>
                        <h2 style={{color: textColor}}>{displayName}</h2>
                        <h2 style={{color: textColor, opacity: 0.6, fontWeight: 300, fontSize: '0.9rem'}}>#{username}</h2>
                    </div>
                    <UserBio bio={profileBio} />
                    {showCaseScreenShots ? <ScreenShotShowCase screenShots={screenShots} /> : null}
                </div>
            </div>   
        </div>
    )
}
