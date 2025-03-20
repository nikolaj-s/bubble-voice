
import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../features/App/appSlice';

import authSlice from '../features/Auth/AuthSlice';

import accountSlice from '../features/Account/accountSlice';

import serversSlice from '../features/Servers/serversSlice';

import searchSlice from '../features/Search/searchSlice';

import createServerSlice from '../features/CreateServer/createServerSlice';

import overlaySlice from '../features/Overlay/overlaySlice';

import serverDetailsSlice from '../features/ServerDetails/serverDetailsSlice';

import deviceSlice from '../features/Settings/Devices/DeviceSlice';

import keybindsSlice from '../features/Settings/Keybinds/keybindsSlice'

import soundSlice from '../features/Settings/Sound/soundSlice';

import joinServerSlice from '../features/JoinServer/joinServerSlice';

import serverUsersSlice from '../features/ServerUsers/serverUsersSlice';

import channelsSlice from '../features/Channels/channelsSlice';

import mediaControlSlice from '../features/MediaControl/mediaControlSlice';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

// state store
const store = configureStore({
    reducer: {
      appSlice: appSlice,
      authSlice: authSlice,
      accountSlice: accountSlice,
      serversSlice: serversSlice,
      searchSlice: searchSlice,
      createServerSlice: createServerSlice,
      joinServerSlice: joinServerSlice,
      overlaySlice: overlaySlice,
      // settings slice's
      deviceSlice: deviceSlice,
      keybindsSlice: keybindsSlice,
      soundSlice: soundSlice,
      // server slice's
      serverDetailsSlice: serverDetailsSlice,
      serverUsersSlice: serverUsersSlice,
      channelsSlice: channelsSlice,
      // media
      mediaControlSlice: mediaControlSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;