import { createSlice } from "@reduxjs/toolkit";
import { fetchKeyBinds, initKeyBinds, setKeyBinds } from "../../../../util/LocalData";


const keyBindSettingsSlice = createSlice({
    name: "keyBindSettingsSlice",
    initialState: {
        push_to_talk: {
            key: "",
            keyCode: ""
        },
        mute_mic: {
            key: "",
            keyCode: ""
        },
        mute_audio: {
            key: "",
            keyCode: ""
        },
        activate_camera: {
            key: "",
            keyCode: ""
        },
        disconnect: {
            key: "",
            keyCode: ""
        },
        share_screen: {
            key: "",
            keyCode: ""
        }
    },
    reducers: {
        updateKeyCodeState: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }

            const keysToSave = {
                push_to_talk: state.push_to_talk,
                mute_mic: state.mute_mic,
                mute_audio: state.mute_audio,
                activate_camera: state.activate_camera,
                disconnect: state.disconnect,
                share_screen: state.share_screen
            }

            setKeyBinds(keysToSave).then(() => {
                fetchKeyBinds().then(binds => {
                    initKeyBinds(binds);
                })
            })
            
        },
        setSavedKeyCodes: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        }
    }
})

// selectors
export const selectPushToTalkKey = state => state.keyBindSettingsSlice.push_to_talk;

export const selectMuteMicKey = state => state.keyBindSettingsSlice.mute_mic;

export const selectMuteAudioKey = state => state.keyBindSettingsSlice.mute_audio;

export const selectActivateCameraKey = state => state.keyBindSettingsSlice.activate_camera;

export const selectDisconnectKey = state => state.keyBindSettingsSlice.disconnect;

export const selectShareScreenKey = state => state.keyBindSettingsSlice.share_screen;

// actions

export const { updateKeyCodeState, setSavedKeyCodes } = keyBindSettingsSlice.actions;

export default keyBindSettingsSlice.reducer;