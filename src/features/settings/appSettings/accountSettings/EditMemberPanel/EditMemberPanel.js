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
handleNewDisplayName
}) => {
    
    return (
        <div style={{flexShrink: 0,padding: '5px', borderRadius: '8px', maxWidth: 500, position: 'relative', width: '100%', overflow: 'hidden', minHeight: 800}} className='edit-member-panel-container'>
            <ProfileImage newBanner={newBanner} newImage={newImage} color={updateColor} shape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} />
            <ProfilePictureShape action={changeProfileShape} shape={newShape} />
            <InputTitle title={'Change Display Name'} />
            <TextInput stateSelector='display_name' action={handleNewDisplayName} inputValue={displayName} placeholder={""} />
            
            <div style={{display: 'flex', width: '100%', alignItems: 'center',}}>
                <InputTitle width={'calc(100% - 50px)'} title={'Bio Hint: Pasting Image Links Will Display The Image'} />
                <TogglePreviewButton active={previewBio} action={() => {togglePreviewBio(!previewBio)}} padding={5} width={20} height={20} description={'Toggle Preview'} desc_height={15} />
            </div>
            {previewBio ?
            <UserBio bio={profileBio} />
            :
            <TextArea inputValue={profileBio} action={changeProfileBio} height={300} />
            }
            <InputTitle title={"Change Accent Color"} />
            <ColorInput rgb={color} action={updateColor} />
            <InputTitle title={"Showcase Recent Screen Shots"} />
            <ToggleButton state={showCaseScreenShots} action={toggleShowCaseScreenShots} />
            <div style={{height: 5, flexShrink: 0}}></div>
            {showCaseScreenShots ? <ScreenShotShowCase screenShots={screenShots} /> : null}
        </div>
    )
}
