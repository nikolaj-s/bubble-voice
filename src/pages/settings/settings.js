
import React from 'react'
import FullScreenWrapper from '../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { AccountSettingsForm } from '../../layout/Forms/Settings/AccountSettingsForm/AccountSettingsForm'
import { AppearanceSettingsForm } from '../../layout/Forms/Settings/AppearanceSettingsForm/AppearanceSettingsForm'
import { ContentSettingsForm} from '../../layout/Forms/Settings/ContentSettingsForm/ContentSettingsForm';
import { SocialSettingsForm } from '../../layout/Forms/Settings/SocialSettingsForm/SocialSettingsForm'
import { VoiceVideoSettingsForm } from '../../layout/Forms/Settings/VoiceVideoSettingsForm/VoiceVideoSettingsForm'
import { KeybindSettingsForm } from '../../layout/Forms/Settings/KeybindSettingsForm/KeybindSettingsForm'
import { SoundSettingsForm } from '../../layout/Forms/Settings/SoundSettingsForm/SoundSettingsForm'

export const Settings = ({close}) => {

    const navItems = [
        {key: "account", label: "Account"},
        {key: "appearance", label: "Appearance"},
        {key: "socialSettings", label: "Social"},
        {key: "content", label: "Content"},
        {key: "voiceVideo", label: "Voice / Video"},
        {key: "keybinds", label: "Keybinds"},
        {key: "sound", label: "Sound"}
    ].sort((a, b) => a.label.localeCompare(b.label));

    const content = {
        account: <AccountSettingsForm />,
        appearance: <AppearanceSettingsForm />,
        socialSettings: <SocialSettingsForm />,
        content: <ContentSettingsForm />,
        voiceVideo: <VoiceVideoSettingsForm />,
        keybinds: <KeybindSettingsForm />,
        sound: <SoundSettingsForm />
    }
        
    return (
        <FullScreenWrapper onClose={close}>
            <MenuWrapper navItems={navItems}>
                {content}
            </MenuWrapper>
        </FullScreenWrapper>
    )
}

