import React from 'react'
import Portal from '../Portal/Portal';
import FullScreenWrapper from '../ui/Wrappers/FullScreenWrapper/FullScreenWrapper';
import { ToolBar } from '../ui/Wrappers/ToolBar/ToolBar';
import Header from '../ui/Titles/Header/Header';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { X } from 'lucide-react';
import TextInput from '../ui/Inputs/TextInput/TextInput';
import PasswordRequirements from '../ui/PasswordRequirements/PasswordRequirements';
import { ApplyChangesPopup } from '../ApplyChangesPopup/ApplyChangesPopup';
import { Card } from '../ui/Wrappers/Card/Card';

export const PasswordResetMenu = ({
    active = false, currentPassword = "", 
    newPassword = "", confirmPassword = "", isValid = false,
    onCurrentPasswordChange = () => {}, onNewPasswordChange = () => {}, 
    onConfirmPasswordChange = () => {}, 
    setIsValid = () => {}, onClose = () => {},
    confirm = () => {}
}) => {

    if (!active) return null;

    return (
        <Portal>
            <FullScreenWrapper onClose={onClose} maxContentWidth={500}>
                <Card>
                    <ToolBar style={{alignItems: 'center', justifyContent: 'space-between', background: 'transparent'}}>
                        <Header level={5} text='Change Password' />
                        <IconButton 
                        Icon={X}
                        title={'Close'}
                        onClick={onClose}
                        />
                    </ToolBar>
                    <TextInput type='password' value={currentPassword} onChange={onCurrentPasswordChange} placeholder='current password' />
                    <PasswordRequirements password={newPassword} isValid={setIsValid} />
                    <TextInput type='password' value={newPassword} onChange={onNewPasswordChange} placeholder='new password'/>
                    <TextInput type='password' value={confirmPassword} onChange={onConfirmPasswordChange} placeholder='confirm new password' />
                    <ApplyChangesPopup 
                    disabled={!currentPassword || !isValid || (newPassword !== confirmPassword)}
                    onApply={confirm}
                    onClearChanges={() => {
                        onCurrentPasswordChange("");
                        onConfirmPasswordChange("");
                        onNewPasswordChange("");
                        onClose();
                    }}
                    />
                </Card>
            </FullScreenWrapper>
        </Portal>
    )
}
