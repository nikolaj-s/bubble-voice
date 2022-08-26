import appSlice from "../app/appSlice";
import contentScreenSlice from "../features/contentScreen/contentScreenSlice";
import ControlBarSlice from "../features/controlBar/ControlBarSlice";
import createServerSlice from "../features/createServer/createServerSlice";
import accountSettingsSlice from "../features/settings/appSettings/accountSettings/accountSettingsSlice";
import appearanceSettingsSlice from "../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice";
import appSettingsMenuSlice from "../features/settings/appSettings/appSettingsMenuSlice";
import keyBindSettingsSlice from "../features/settings/appSettings/keyBindSettings/keyBindSettingsSlice";
import ServerSlice from "../features/server/ServerSlice";
import sideBarSlice from "../features/sideBar/sideBarSlice";
import signInSlice from "../features/LoggingIn/signIn/signInSlice";
import voiceVideoSettingsSlice from "../features/settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice";
import initializingAppScreenSlice from "../features/initializingAppScreen/initializingAppScreenSlice";
import signUpSlice from "../features/LoggingIn/signUp/signUpSlice";
import verificationSlice from "../features/LoggingIn/verification/verificationSlice";
import joinServerSlice from "../features/joinServer/joinServerSlice";
import soundEffectsSlice from "../features/settings/soundEffects/soundEffectsSlice";
import contextMenuSlice from "../features/contextMenu/contextMenuSlice";

const { configureStore } = require("@reduxjs/toolkit");

// state store
const store = configureStore({
    reducer: {
        // initial load
        initializingAppScreenSlice: initializingAppScreenSlice,
        // logging in
        signInSlice: signInSlice,
        signUpSlice: signUpSlice,
        verificationSlice: verificationSlice,
        // main
        appSlice: appSlice,
        contentScreenSlice: contentScreenSlice,
        sideBarSlice: sideBarSlice,
        controlBarSlice: ControlBarSlice,
        serverSlice: ServerSlice,
        // settings
        appSettingsMenuSlice: appSettingsMenuSlice,
        appearanceSettingsSlice: appearanceSettingsSlice,
        accountSettingsSlice: accountSettingsSlice,
        keyBindSettingsSlice: keyBindSettingsSlice,
        voiceVideoSettingsSlice: voiceVideoSettingsSlice,
        // server
        createServerSlice: createServerSlice,
        joinServerSlice: joinServerSlice,
        // sound fx
        soundEffectsSlice: soundEffectsSlice,
        // ctx menu
        contextMenuSlice: contextMenuSlice
    }
})

export default store;