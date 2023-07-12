import React from 'react'
import { ProfileImage } from '../ProfileImage/ProfileImage'
import { ProfilePictureShape } from '../ProfilePictureShape/ProfilePictureShape'
import { InputTitle } from '../../../../../components/titles/inputTitle/InputTitle'
import { TextInput } from '../../../../../components/inputs/TextInput/TextInput'
import { TogglePreviewButton } from '../../../../../components/buttons/TogglePreviewButton/TogglePreviewButton'
import { UserBio } from '../../../../../components/UserBio/UserBio'
import { TextArea } from '../../../../../components/inputs/TextArea/TextArea'

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
    displayName, 
    previewBio, 
    togglePreviewBio, 
    profileBio, 
    changeProfileBio}) => {
    
    return (
        <div style={{backgroundColor: color, padding: '5px', borderRadius: '8px', maxWidth: 500, position: 'relative', width: '100%', overflow: 'hidden', boxShadow: '5px 5px 20px black', minHeight: 800}} className='edit-member-panel-container'>
            <ProfileImage color={updateColor} shape={newShape} getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userImage={userImage} userBanner={userBanner} />
            <ProfilePictureShape action={changeProfileShape} shape={newShape} />
            <InputTitle title={'Change Display Name'} />
            <TextInput stateSelector='display_name' action={handleInput} inputValue={displayName} placeholder={""} />
            
            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                <InputTitle width={'60px'} title={'Bio'} />
                <TogglePreviewButton active={previewBio} action={() => {togglePreviewBio(!previewBio)}} padding={5} width={20} height={20} description={'Toggle Preview'} desc_height={15} />
            </div>
            {previewBio ?
            <UserBio bio={profileBio} />
            :
            <TextArea inputValue={profileBio} action={changeProfileBio} height={300} />
            }
        </div>
    )
}