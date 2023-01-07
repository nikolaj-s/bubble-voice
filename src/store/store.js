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
import RoomActionOverlaySlice from "../features/server/ChannelRoom/Room/RoomActionOverlay/RoomActionOverlaySlice";
import MiscellaneousSettingsSlice from "../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice";
import ExpandContentSlice from "../features/ExpandContent/ExpandContentSlice";
import MusicSlice from "../features/server/ChannelRoom/Room/Music/MusicSlice";
import UserStatusSlice from "../features/server/ChannelRoom/UserStatusBar/UserStatusSlice";
import ServerDashBoardSlice from "../features/server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import MemberPanelSlice from "../features/server/ChannelRoom/MemberPanel/MemberPanelSlice";

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
        MiscellaneousSettingsSlice: MiscellaneousSettingsSlice,
        // server
        createServerSlice: createServerSlice,
        joinServerSlice: joinServerSlice,
        RoomActionOverlaySlice: RoomActionOverlaySlice,
        ExpandContentSlice: ExpandContentSlice,
        UserStatusSlice: UserStatusSlice,
        ServerDashBoardSlice: ServerDashBoardSlice,
        MemberPanelSlice: MemberPanelSlice,
        // sound fx
        soundEffectsSlice: soundEffectsSlice,
        // ctx menu
        contextMenuSlice: contextMenuSlice,
        // music
        MusicSlice: MusicSlice
    }
})

export default store;