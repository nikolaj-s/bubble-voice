
import React from 'react'
import MenuWrapper from '../../components/ui/Wrappers/MenuWrapper/MenuWrapper'
import { AccountSettingsForm } from '../../layout/Forms/Settings/AccountSettingsForm/AccountSettingsForm'
import { AppearanceSettingsForm } from '../../layout/Forms/Settings/AppearanceSettingsForm/AppearanceSettingsForm'
import { ContentSettingsForm} from '../../layout/Forms/Settings/ContentSettingsForm/ContentSettingsForm';
import { SocialSettingsForm } from '../../layout/Forms/Settings/SocialSettingsForm/SocialSettingsForm'
import { VoiceVideoSettingsForm } from '../../layout/Forms/Settings/VoiceVideoSettingsForm/VoiceVideoSettingsForm'
import { KeybindSettingsForm } from '../../layout/Forms/Settings/KeybindSettingsForm/KeybindSettingsForm'
import { SoundSettingsForm } from '../../layout/Forms/Settings/SoundSettingsForm/SoundSettingsForm'
import { PrivacySettingsForm } from '../../layout/Forms/Settings/PrivacySettingsForm/PrivacySettingsForm'
import { SecuritySettingsForm } from '../../layout/Forms/Settings/SecuritySettingsForm/SecuritySettingsForm'
import { SearchSettingsForm } from '../../layout/Forms/Settings/SearchSettingsForm/SearchSettingsForm'
import { useDispatch } from 'react-redux'
import { updateAccountPreferences } from '../../features/AccountPreferences/Thunks/updateAccountPreferences'

export const Settings = ({close}) => {

    const dispatch = useDispatch();

    const navItems = [
        {key: "account", label: "Account"},
        {key: "appearance", label: "Appearance"},
        {key: "socialSettings", label: "Social"},
        {key: "content", label: "Content"},
        {key: "voiceVideo", label: "Voice / Video"},
        {key: "keybinds", label: "Keybinds"},
        {key: "sound", label: "Sound"},
        {key: "privacy", label: "Privacy"},
        {key: "security", label: "Security"},
        {key: "search", label: "Search"}
    ].sort((a, b) => a.label.localeCompare(b.label));

    const content = {
        account: <AccountSettingsForm />,
        appearance: <AppearanceSettingsForm />,
        socialSettings: <SocialSettingsForm />,
        content: <ContentSettingsForm />,
        voiceVideo: <VoiceVideoSettingsForm />,
        keybinds: <KeybindSettingsForm />,
        sound: <SoundSettingsForm />,
        privacy: <PrivacySettingsForm />,
        security: <SecuritySettingsForm />,
        search: <SearchSettingsForm />
    }

    React.useEffect(() => {

        return () => {
            dispatch(updateAccountPreferences());
        }

    }, [dispatch])
        
    return (
        <MenuWrapper onClose={close} navItems={navItems} showFooter={true}>
            {content}
        </MenuWrapper>
    )
}

