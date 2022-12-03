// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'

// components
import { ApplyCancelButton } from '../../../../components/buttons/ApplyCancelButton/ApplyCancelButton';
import { TextInput } from '../../../../components/inputs/TextInput/TextInput';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader';

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectActivateCameraKey, selectDisconnectKey, selectMuteAudioKey, selectMuteMicKey, selectPushToMuteKey, selectPushToTalkKey, selectShareScreenKey, updateKeyCodeState } from './keyBindSettingsSlice';

// style
import "./KeyBindSettings.css";
import { ClearButton } from '../../../../components/buttons/ClearButton/ClearButton';

const Settings = () => {

    const dispatch = useDispatch();

    const [local, setLocal] = React.useState({})

    const [update, toggleUpdate] = React.useState(false);

    const pushToTalkkey = useSelector(selectPushToTalkKey);

    const muteMicKey = useSelector(selectMuteMicKey);

    const muteAudioKey = useSelector(selectMuteAudioKey);

    const activateCameraKey = useSelector(selectActivateCameraKey);

    const disconnectKey = useSelector(selectDisconnectKey);

    const shareScreenKey = useSelector(selectShareScreenKey);

    const pushToMuteKey = useSelector(selectPushToMuteKey);

    React.useEffect(() => {
        dispatch(setHeaderTitle('Key Bind Settings'))
    // eslint-disable-next-line
    }, [])

    const handleKeyCodeUpdate = (keyCode, state, event) => {

        
        
        if (event.key.includes('F')) return;

        if (event.keyCode === pushToTalkkey.keyCode && (event.keyCode !== "")) return;
        
        if (event.keyCode === muteMicKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === muteAudioKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === activateCameraKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === disconnectKey.keyCode && (event.keyCode !== "")) return;

        if (event.keyCode === shareScreenKey.keyCode && (event.keyCode !== "")) return;
        
        if (event.keyCode === pushToMuteKey.keyCode && (event.keyCode !== "")) return;

        const obj = {...local, [state]: {key: event.nativeEvent.key, keyCode: event.keyCode}}
        
        setLocal(obj)
        
        toggleUpdate(true);
    
    }

    const saveKeyBinds = () => {
        dispatch(updateKeyCodeState(local))
        toggleUpdate(false)
    }

    const handleCancel = () => {
        setLocal({})
        toggleUpdate(false)
    }

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Media Binds"} />
            <InputTitle title={"Push To Talk"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='push_to_talk' inputValue={local['push_to_talk'] ? local['push_to_talk'].key : pushToTalkkey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "push_to_talk", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            <InputTitle title={"Push To Mute"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='push_to_mute' inputValue={local['push_to_mute'] ? local['push_to_mute'].key : pushToMuteKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "push_to_mute", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            <InputTitle title={"Mute Mic"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='mute_mic' inputValue={local['mute_mic'] ? local['mute_mic'].key : muteMicKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "mute_mic", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            <InputTitle title={"Mute Audio"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='mute_audio' inputValue={local['mute_audio'] ? local['mute_audio'].key : muteAudioKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "mute_audio", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            <InputTitle title={"Activate Camera"} />
            <div className='key-bind-input-wrapper'>    
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='activate_camera' inputValue={local['activate_camera'] ? local['activate_camera'].key : activateCameraKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "activate_camera", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            <InputTitle title={"Share Screen"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='share_screen' inputValue={local['share_screen'] ? local['share_screen'].key : shareScreenKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "share_screen", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>    
            <SettingsHeader title={"Misc"} />
            <InputTitle title={"Disconnect"} />
            <div className='key-bind-input-wrapper'>
                <TextInput keyCode={handleKeyCodeUpdate} stateSelector='disconnect' inputValue={local['disconnect'] ? local['disconnect'].key : disconnectKey.key} />
                <ClearButton action={() => {handleKeyCodeUpdate({}, "disconnect", {nativeEvent: {key: ""}, keyCode: "", key: ""})}} name={"Clear Bind"} />
            </div>
            {update ? <ApplyCancelButton cancel={handleCancel} apply={saveKeyBinds} name='Save' /> : null}
            <SettingsSpacer />
        </div>
    )
}

export const KeyBindSettings = () => useRoutes([
    { path: "keybindings", element: <Settings /> }
])
