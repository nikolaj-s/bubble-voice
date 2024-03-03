import Axios from "axios";

import { getToken, url } from "./Validation"

export let USER_PREFS = new Map();

export let SOCIAL_DATA = new Map();

export const setSocialData = (data) => {
    SOCIAL_DATA = data;
}

// key bind management
export const fetchKeyBinds = async () => {
    try {

        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) {
            const keybinds = localStorage.getItem("KEYBINDS");
            console.log(keybinds)
            if (!keybinds) {
                return [];
            }
            
            return JSON.parse(keybinds);

        } else {
            const keytar = window.require('keytar');

            const keyBinds = await keytar.getPassword("KEY", "BINDS")
    
            if (!keyBinds) {
                return [
    
                ]
            }
    
            return JSON.parse(keyBinds);
        }

        
    } catch (error) {
        console.log(error);
        const keybinds = localStorage.getItem("KEYBINDS");

        if (!keybinds) {
            return [];
        }

        return JSON.parse(keybinds);
    }
}

export const setKeyBinds = async (keys) => {
    try {

        const os = window.require('os');

        const isMac = os.platform() === "darwin";
      
        if (isMac) {

            localStorage.setItem("KEYBINDS", JSON.stringify(keys));

            return true;

        } else {

            const keytar = window.require('keytar');

            await keytar.setPassword("KEY", "BINDS", JSON.stringify(keys))
    
            return true;
        }

       
    } catch (error) {

        localStorage.setItem("KEYBINDS", JSON.stringify(keys));

        return true;

    }
}

export const initKeyBinds = (keys) => {

    try {

        const binds = keys;
        
        const ipcRenderer = window.require('electron').ipcRenderer

        ipcRenderer.send('REG_KEYBINDS', binds)

    } catch (error) {
        return;
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

// SOCIAL DATA
export const saveSocialData = async () => {
    
    try {

        const data = new FormData();

        data.append("social_data",JSON.stringify(Array.from(SOCIAL_DATA.entries())));

        const token = await getToken();

        await Axios({
            method: "POST",
            url: `${url}/save-social-data`,
            headers: {"TOKEN": token},
            data
        }).then(res => {
            return true;
        })
        .catch(err => {
            console.log(err)
            return true;
        })
    } catch (err) { 
        console.log(err);
    }

    return;
    
}

export const fetchSocialData = async () => {
    
    const w_data = localStorage.getItem("SOCIALDATA");

    let d  = JSON.parse(w_data);
    console.log(d)
    return;
}

// USER PREFS

export const saveUserPrefs = async () => {
    try {
        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) {
            localStorage.setItem("USERPREFS", JSON.stringify(Array.from(USER_PREFS.entries())));
        } else {
            const keytar = window.require('keytar');

            await keytar.setPassword("USER", "PREFS", JSON.stringify(Array.from(USER_PREFS.entries())))
        }

    } catch (error) {
        
        localStorage.setItem("USERPREFS", JSON.stringify(Array.from(USER_PREFS.entries())));

    }
}

export const fetchSavedUserPrefs = async () => {
    try {

        const os = window.require('os');

        const isMac = os.platform() === "darwin";
        console.log(isMac)
        if (isMac) {
            const data = localStorage.getItem("USERPREFS");

            USER_PREFS = new Map(JSON.parse(data));
    
            return;
        } else {
            const keytar = window.require('keytar');

            const data = await keytar.getPassword("USER", "PREFS");
     
            USER_PREFS = new Map(JSON.parse(data));
    
            return;
        }

       
    } catch (error) {
        
        const data = localStorage.getItem("USERPREFS");

        USER_PREFS = new Map(JSON.parse(data));

        return;

    }
}

// handle hardware acceleration toggle
export const saveHardwareAcceleration = async (bool) => {
    try {

        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) return;

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

        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) return;

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

        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) {
  
            localStorage.setItem([param_1, param_2].join(''), JSON.stringify(arg));

            return true;
        } else {

            const keytar = window.require('keytar');

            await keytar.setPassword(param_1, param_2, JSON.stringify(arg))
    
            return true;
        }

        
    } catch (error) {
        console.log(error);
        localStorage.setItem([param_1, param_2].join(''), JSON.stringify(arg));

    }
}

export const fetchSavedLocalData = async (param_1, param_2) => {
    try {


        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) {
            const d = JSON.parse(localStorage.getItem([param_1, param_2].join('')));
        
            if (d === null) return {error: true};
            console.log(d)
            return d;
        } else {
            const keytar = window.require('keytar');

            const data = await keytar.getPassword(param_1, param_2);
    
            const parsed = JSON.parse(data);
    
            if (parsed === null) {
    
                return {error: true}
            
            } else {
    
                return parsed;
            
            }
        }

    } catch (error) {

        const d = JSON.parse(localStorage.getItem([param_1, param_2].join('')));
        
        if (d === null) return {error: true};
       
        return d;
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
        localStorage.clear();
    }
}