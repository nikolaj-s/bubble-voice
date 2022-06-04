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

const { configureStore } = require("@reduxjs/toolkit");

// state store
const store = configureStore({
    reducer: {
        // logging in
        signInSlice: signInSlice,

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
    }
})

export default store;