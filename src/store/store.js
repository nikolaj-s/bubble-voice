
import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../features/App/appSlice';

import authSlice from '../features/Auth/AuthSlice';

import accountSlice from '../features/Account/accountSlice';

import serversSlice from '../features/Servers/serversSlice';

import searchSlice from '../features/Search/searchSlice';

import createServerSlice from '../features/CreateServer/createServerSlice';

import overlaySlice from '../features/Overlay/overlaySlice';

import serverDetailsSlice from '../features/ServerDetails/serverDetailsSlice';

import deviceSlice from '../features/Devices/DeviceSlice';

import keybindsSlice from '../features/Keybinds/keybindsSlice'

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
      overlaySlice: overlaySlice,
      // settings slice's
      deviceSlice: deviceSlice,
      keybindsSlice: keybindsSlice,
      // server slice's
      serverDetailsSlice: serverDetailsSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;