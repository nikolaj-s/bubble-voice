
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

// handle hardware acceleration toggle
export const saveHardwareAcceleration = async (bool) => {
    try {

        const keytar = window.require('keytar');

        const ipcRenderer = window.require('electron').ipcRenderer;

        await keytar.setPassword("HARDWARE", "ACCELERATION", JSON.stringify({toggled: bool}));

        ipcRenderer.send('write-hardware-change', {toggled: bool});
        
    } catch (error) {
        return {error: 'using web version'}
    }
}

export const fetchHardWareAcceleration = async () => {
    try {

        const keytar = window.require('keytar');

        const data = await keytar.getPassword("HARDWARE", "ACCELERATION");
        
        const parsed = JSON.parse(data);

        if (parsed === null) {

            await saveHardwareAcceleration(true);

            return {toggled: true}
        } else {
            return parsed;
        }

    } catch (error) {
        console.log(error);
        return {error: "using web version"};
    }
}

export const saveLocalData = async (param_1, param_2, arg) => {
    try {
        if (!param_1 || !param_2 || !arg) return;

        const keytar = window.require('keytar');

        await keytar.setPassword(param_1, param_2, JSON.stringify(arg))

        return true;
    } catch (error) {
        console.log(error);
        return {error: true}
    }
}

export const fetchSavedLocalData = async (param_1, param_2) => {
    try {

        const keytar = window.require('keytar');

        const data = await keytar.getPassword(param_1, param_2);

        const parsed = JSON.parse(data);

        if (parsed === null) {

            return {error: true}
        
        } else {

            return parsed;
        
        }

    } catch (error) {
        return {error: true}
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

        keytar.deletePassword("MISC", "MISCSETTINGS");

    } catch (error) {
        console.log('using web app');
    }
}