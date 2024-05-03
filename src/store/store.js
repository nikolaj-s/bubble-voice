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
import UserStatusSlice from "../features/server/ChannelRoom/UserStatus/UserStatusSlice";
import ServerDashBoardSlice from "../features/server/ChannelRoom/ServerDashBoard/ServerDashBoardSlice";
import MemberPanelSlice from "../features/server/ChannelRoom/MemberPanel/MemberPanelSlice";
import ServerNavigationSlice from "../features/server/ChannelRoom/ServerNavigation/ServerNavigationSlice";
import ServerMediaSlice from "../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice";
import SavedMediaSlice from "../features/SavedMedia/SavedMediaSlice";
import ProfileSlice from "../features/Profile/ProfileSlice";
import ExploreSlice from "../features/Explore/ExploreSlice";
import MessagesSlice from "../features/Messages/MessagesSlice";
import SocialSlice from "../features/server/SocialSlice";
import AudioInitSlice from "../features/AudioInit/AudioInitSlice";
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import SimilarImageSlice from "../features/SimilarImageMenu/SimilarImageSlice";
import RoomSlice from "../features/server/ChannelRoom/Room/RoomSlice";
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
        ServerNavigationSlice: ServerNavigationSlice,
        ServerMediaSlice: ServerMediaSlice,
        // sound fx
        soundEffectsSlice: soundEffectsSlice,
        // ctx menu
        contextMenuSlice: contextMenuSlice,
        // music
        MusicSlice: MusicSlice,
        // saves
        SavedMediaSlice: SavedMediaSlice,
        ExploreSlice: ExploreSlice,
        // profile
        ProfileSlice: ProfileSlice,
        MessagesSlice: MessagesSlice,
        // Social
        SocialSlice: SocialSlice,
        AudioInitSlice: AudioInitSlice,
        // misc
        SimilarImageSlice: SimilarImageSlice,
        // ROOM
        RoomSlice: RoomSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;