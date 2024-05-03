import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomClient } from "./RoomClient";
import * as mediasoupClient from 'mediasoup-client';
// socket
import { socket } from '../../ServerBar/ServerBar';
import { updateMusicState } from "./Music/MusicSlice";
import { playSoundEffect } from "../../../settings/soundEffects/soundEffectsSlice";
import { checkConnection, throwServerError, toggleReconnectingState, updateMemberStatus } from "../../ServerSlice";
import { setCurrentScreen, setScreens, setSelectingScreensState, toggleConnectionError, toggleConnectionLoading, toggleControlState, toggleLoadingScreenShare, toggleLoadingWebCam, toggleVoiceActive } from "../../../controlBar/ControlBarSlice";

export let client;

export const CLEAR_CLIENT = async () => {
    try {
        if (client) {
            await client?.exit();
        }

        client = null;
    } catch (error) {
        client = null;
    }
    
}

export const joinChannel = createAsyncThunk(
    'RoomSlice/joinChannel',
    async (_ , {getState, dispatch, rejectWithValue}) => {
        try {

            if (client) {
                await client?.exit();

                client = null;
            }

            dispatch(setScreens([]));

            dispatch(setCurrentScreen(null));

            const event = (arg) => {
                
                if (arg.action === 'playSoundEffect') return dispatch(playSoundEffect(arg.value));
        
                if (arg.action === 'error') return dispatch(throwServerError({errorMessage: arg.value}));
                
                if (arg.action === 'webcam-loading-state') return dispatch(toggleLoadingWebCam(false));
                
                if (arg.action === 'screen-share-loading-state') return dispatch(toggleLoadingScreenShare(arg.value));
               
                if (arg.action === 'close-stream') return dispatch(toggleControlState('screenShareState'));
        
                if (arg.action === 'reconnecting') {
        
                    if (arg.value === true) {
                        dispatch(toggleReconnectingState());
                    }
                    
                };
        
                if (arg.action === 'connection') return dispatch(toggleConnectionLoading(arg.value));
        
                if (arg.action === 'connectionError') return dispatch(toggleConnectionError(arg.value));
            }

            const { username } = getState().accountSettingsSlice;

            const { members, current_channel_id, server_id  } = getState().serverSlice;

            const { audioinput, audiooutput, videoinput, mirroredWebCam, micInputVolume, noiseSuppression, echoCancellation } = getState().voiceVideoSettingsSlice;

            const { microphoneState, webCamState, audioState } = getState().controlBarSlice;

            const user = members.find(member => member.username === username);
            
            client = new RoomClient(socket, current_channel_id, server_id, mediasoupClient, audioinput, videoinput, microphoneState, webCamState, user, event, audioState, mirroredWebCam, echoCancellation, noiseSuppression, micInputVolume);

            await client.join();

            await socket.request('fetch current music info')
            .then(data => {
                
                if (data.music_info) {
                    
                    dispatch(updateMusicState({playing: data.music_info.playing, queue: data.music_info.queue}))
                
                }
                
            })
            .catch(error => {
                console.log(error)
            })

            dispatch(checkConnection());

            return {connected: true};

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message})
        }
    }
)

export const handleStreamsDisabled = createAsyncThunk(
    "RoomSlice/handleStreamsDisabled",
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {

            const { username } = getState().accountSettingsSlice;

            const { muteSoundEffectsWhileMutedState } = getState().soundEffectsSlice;

            if (client) {
                await client.closeProducer('audioType');
                
                await socket.request('user status', {username: username, action: {active: false, microphone: false, muted:  true}})
                
                dispatch(updateMemberStatus({username: username, action: {active: false, microphone: false, muted: true}}))    
                
                const audio_sources_to_mute = document.querySelectorAll('video, audio');
    
                for (const el of audio_sources_to_mute) {
    
                    if (muteSoundEffectsWhileMutedState === false) {
    
                        if (el.id !== 'sound-effects-source') {
                            el.muted = true;
                        } 
    
                        continue;
                    } else {
                        el.muted = true;
                    }
    
                }

                client.toggleAudioState(true)
    
            } else {
                return;
            }

            return;
            
        } catch (error) {
            return;
        }
    }
)

export const handleMicrophoneProducer = createAsyncThunk(
    "RoomSlice/handleMicrophoneProducer",
    async ({state}, {getState, dispatch, rejectWithValue}) => {
        try {

            const { streams_disabled } = getState().RoomSlice;

            if (streams_disabled) return;

            const { username } = getState().accountSettingsSlice;

            const { audioinput } = getState().voiceVideoSettingsSlice;

            if (client) {
                if (state) {
                    
                    await client.produce('audioType', audioinput._id ? audioinput._id : 'default');
                    
                    dispatch(updateMemberStatus({username: username, action: {microphone: true}}));
                    
                    await socket.request('user status', {username: username, action: {microphone: true}})
                   

                } else {

                    await client.closeProducer('audioType');

                    dispatch(updateMemberStatus({username: username, action: {microphone: false, active: false}}))
                    
                    await socket.request('user status', {username: username, action: {microphone: false, active: false}})
                    
                    dispatch(toggleVoiceActive(false));
                }
                
            } else {
                dispatch(throwServerError({errorMessage: "ERROR: client not initialized please try rejoining the channel"}));

                return rejectWithValue({error: true});
            }

            return true;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message});
        }
    }
)

export const handleScreenProducer = createAsyncThunk(
    "RoomSlice/handleScreenProducer",
    async ({currentScreen}, {getState, dispatch, rejectWithValue}) => {
        try {

            const { username, color } = getState().accountSettingsSlice;

            const { experimentalAudioCapture } = getState().voiceVideoSettingsSlice;

            const { currentScreenName } = getState().controlBarSlice;

            dispatch(setScreens([]));

            dispatch(setSelectingScreensState(false));

            if (currentScreen) {
                
                const ipcRenderer = window.require('electron').ipcRenderer;

                ipcRenderer.send("set-window-id", {id: currentScreen});

                await client?.produce('screenType', currentScreen, currentScreenName, experimentalAudioCapture, color);

                dispatch(updateMemberStatus({username: username, action: {screenshare: true}}));

                await socket?.emit('user status', {username: username, action: {screenshare: true}})
            
                dispatch(playSoundEffect('controlSoundEffect'))
                
            
            } else {

                await client.closeProducer('screenType');

                dispatch(updateMemberStatus({username: username, action: {screenshare: false}}));

                await socket?.emit('user status', {username: username, action: {screenshare: false}});

                dispatch(setCurrentScreen(null));

            }
        } catch (error) {
            console.log(error);
            dispatch(setCurrentScreen(null));

            dispatch(throwServerError({errorMessage: error.message}));
            return;
        }
    }
)

export const handleWebCamProducer = createAsyncThunk(
    "RoomSlice/handleWebCamProducer",
    async ({data}, {getState, dispatch, rejectWithValue}) => {
        try {
            const { videoinput } = getState().voiceVideoSettingsSlice;

            const { username } = getState().accountSettingsSlice;
            
            if (data === false) {
                
                await client.produce('videoType', videoinput._id ? videoinput._id : 'default');
                
                dispatch(updateMemberStatus({username: username, action: {webcam: true}}))
                
                await socket.request('user status', {username: username, action: {webcam: true}})
                
            
            } else if (data === true) {
                
                await client.closeProducer('videoType');
                
                dispatch(updateMemberStatus({username: username, action: {webcam: false}}))
                
                await socket.request('user status', {username: username, action: {webcam: false}})
            
            }

            return;
        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message});
        }
    }
)

export const handleAudioState = createAsyncThunk(
    "RoomSlice/handleAudioState",
    async ({state}, {getState, dispatch, rejectWithValue}) => {
        try {

            const { username } = getState().accountSettingsSlice;

            const { muteSoundEffectsWhileMutedState } = getState().soundEffectsSlice;
            
            const audio_sources_to_mute = document.querySelectorAll('video, audio');

            if (state) {
                audio_sources_to_mute.forEach(el => el.muted = false)
                
                dispatch(updateMemberStatus({username: username, action: {muted: false}}))
                
                client.toggleAudioState(false)
                
                await socket.request('user status', {username: username, action: {muted: false}})
            
            } else {
                
                for (const el of audio_sources_to_mute) {

                    if (muteSoundEffectsWhileMutedState === false) {

                        if (el.id !== 'sound-effects-source') {
                            el.muted = true;
                        } 

                        continue;
                    } else {
                        el.muted = true;
                    }

                }

                dispatch(updateMemberStatus({username: username, action: {muted: true}}))
                
                client.toggleAudioState(true)
                
                await socket.request('user status', {username: username, action: {muted: true}})
            
            }

            return true;
       

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message});
        }
    }
)

export const handleVoiceActive = createAsyncThunk(
    "RoomSlice/handleVoiceActive",
    async ({active}, {getState, dispatch, rejectWithValue}) => {

        const { username } = getState().accountSettingsSlice;

        dispatch(toggleVoiceActive(active));

        if (active) {
            await client.resumeProducer('audioType');
        } else {
            await client.pauseProducer('audioType');
        }
        

        dispatch(updateMemberStatus({username: username, action: {active: active}}))
            
        await socket.request('user status', {username: username, action: {active: active, channel_specific: true}})
                
        return;
    }
)

const RoomSlice = createSlice({
    name: "RoomSlice",
    initialState: {
        loaded: false,
        loading: false,
        loadingMicroPhoneProducer: false,
        loadingWebCamProducer: false,
        channel_id: "",
        streams_disabled: false,
        loadingScreenProducer: false
    },
    reducers: {
        leftChannel: (state, action) => {
            state.loaded = false;
        }
    },
    extraReducers: {
        [joinChannel.pending]: (state, action) => {
            state.loaded = false;
            state.loading = true;
            state.loadingMicroPhoneProducer = false;
            state.loadingWebCamProducer = false;
            state.loadingScreenProducer = false;
        },
        [joinChannel.fulfilled]: (state, action) => {
            state.loaded = true;
            state.loading = false;
        },
        [joinChannel.rejected]: (state, action) => {
            state.loaded = false;
            state.loading = false;
        },
        [handleMicrophoneProducer.pending]: (state, action) => {
            state.loadingMicroPhoneProducer = true;
        },
        [handleMicrophoneProducer.fulfilled]: (state, action) => {
            state.loadingMicroPhoneProducer = false;
        },
        [handleStreamsDisabled.fulfilled]: (state, action) => {

        },
        [handleWebCamProducer.pending]: (state, action) => {
            state.loadingWebCamProducer = true;
        },
        [handleWebCamProducer.fulfilled]: (state, action) => {
            state.loadingWebCamProducer = false;
        },
        [handleAudioState.pending]: (state, action) => {
            state.loadingMicroPhoneProducer = true;
        },
        [handleAudioState.fulfilled]: (state, action) => {
            state.loadingMicroPhoneProducer = false;
        },
        [handleScreenProducer.pending]: (state, action) => {
            state.loadingScreenProducer = true;
        },
        [handleScreenProducer.fulfilled]: (state, action) => {
            state.loadingScreenProducer = false;
        },
        [handleScreenProducer.rejected]: (state, action) => {
            state.loadingScreenProducer = false;
        }
    }
})

export const selectJoiningChannelState = state => state.RoomSlice.loaded;

export const selectLoadingChannel = state => state.RoomSlice.loading;

export const selectLoadingMicrophoneProducer = state => state.RoomSlice.loadingMicroPhoneProducer;

export const selectLoadingWebCamProducer = state => state.RoomSlice.loadingWebCamProducer;

export const selectLoadingScreenProducer = state => state.RoomSlice.loadingScreenProducer;

export const {leftChannel} = RoomSlice.actions;

export default RoomSlice.reducer;