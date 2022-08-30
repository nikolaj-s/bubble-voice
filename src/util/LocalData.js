
export let USER_PREFS = new Map();

// key bind management
export const fetchKeyBinds = async () => {
    try {
        const keytar = window.require('keytar');

        const keyBinds = await keytar.getPassword("KEY", "BINDS")

        if (!keyBinds) {
            return [

            ]
        }

        return JSON.parse(keyBinds);
    } catch (error) {

    }
}

export const setKeyBinds = async (keys) => {
    try {
        const keytar = window.require('keytar');

        await keytar.setPassword("KEY", "BINDS", JSON.stringify(keys))

        return true;
    } catch (error) {

    }
}

export const initKeyBinds = (keys) => {

    try {

        const binds = keys;
        
        const ipcRenderer = window.require('electron').ipcRenderer

        ipcRenderer.send('REG_KEYBINDS', binds)

    } catch (error) {
        console.log(error)
    }
}

// persist voice video settings
export const fetchSavedVoiceVideoSettings = async () => {
    try {
        const keytar = window.require('keytar');
        
        const saved = await keytar.getPassword("VOICE/VIDEO", "SETTINGS")
        
        return JSON.parse(saved);
    } catch (error) {
        return {};
    }
}

export const saveVoiceVideoSettings = async (data) => {
    try {
        const keytar = window.require('keytar');

        await keytar.setPassword("VOICE/VIDEO", "SETTINGS", JSON.stringify(data))
        
        return true;
    } catch (error) {
        console.log(error)
        return {}
    }
}

// appearance settings
export const setAppearanceSettings = async (data) => {
    try {
        const keytar = window.require('keytar');

        await keytar.setPassword("APPEARANCE", "VISUAL", JSON.stringify(data));

        return true;
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const fetchAppearanceSettings = async () => {
    try {
        const keytar = window.require('keytar');

        const data = await keytar.getPassword("APPEARANCE", "VISUAL")

        return JSON.parse(data);
    } catch (error) {
        return {}
    }
}

// MUSIC WIDGET PREFS

export const fetchMusicWidgetVolume = async () => {
    try {

        const keytar = window.require('keytar');

        const data = await keytar.getPassword("MUSIC", "VOLUME");

        const parsed = JSON.parse(data);

        if (parsed === null) {
            return {volume: 1}
        } else {
            return parsed;
        }
        
    } catch (error) {
        return {volume: 1}
    }
}

export const setMusicWidgetVolume = async (volume) => {
    try {

        const keytar = window.require('keytar');

        await keytar.setPassword("MUSIC", "VOLUME", JSON.stringify({volume: volume}))

    } catch (error) {

    }
}

// APP AUDIO
export const setAppAudio = async (volume) => {
    try {

        const keytar = window.require('keytar');

        await keytar.setPassword("APPAUDIO", "LEVEL", JSON.stringify({volume: volume}))

    } catch (error) {
        console.log("Using Web App")
    }
}

export const fetchAppAudio = async () => {
    try {

        const keytar = window.require('keytar');

        const data = await keytar.getPassword("APPAUDIO", "LEVEL")

        const parsed = JSON.parse(data);

        if (parsed === null) {
            return {volume: 1}
        } else {
            return parsed;
        }
    } catch (error) {
        console.log("Using Web App")
        return {volume: 1}
    }
}

// USER PREFS

export const saveUserPrefs = async () => {
    try {

        const keytar = window.require('keytar');

        await keytar.setPassword("USER", "PREFS", JSON.stringify(Array.from(USER_PREFS.entries())))

    } catch (error) {
        console.log("Using Web App")
    }
}

export const fetchSavedUserPrefs = async () => {
    try {

        const keytar = window.require('keytar');

        const data = await keytar.getPassword("USER", "PREFS");
 
        USER_PREFS = new Map(JSON.parse(data));

    } catch (error) {
        console.log("Using Web App");
    }
}

export const clearLocalData = () => {
    try {
        const keytar = window.require('keytar');

        keytar.deletePassword("USER", "PREFS");

        keytar.deletePassword("APPAUDIO", "LEVEL");

        keytar.deletePassword("MUSIC", "VOLUME");

        keytar.deletePassword("APPEARANCE", "VISUAL");

        keytar.deletePassword("VOICE/VIDEO", "SETTINGS");

        keytar.deletePassword("KEY", "BINDS");

    } catch (error) {
        console.log('using web app');
    }
}