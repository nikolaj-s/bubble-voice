

export const clearCache = () => {
    try {

        const {webFrame, ipcRenderer} = window.require('electron');

        webFrame.clearCache();

        ipcRenderer.invoke('CLEAR_CACHE');
    } catch (err) {
        return;
    }
}