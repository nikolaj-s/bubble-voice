
import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../features/App/appSlice';

import authSlice from '../features/Auth/AuthSlice';

import accountSlice from '../features/Account/accountSlice';

import serverSlice from '../features/Servers/serversSlice';

import searchSlice from '../features/Search/searchSlice';

import createServerSlice from '../features/CreateServer/createServerSlice';

import overlaySlice from '../features/Overlay/overlaySlice';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';


// state store
const store = configureStore({
    reducer: {
      appSlice: appSlice,
      authSlice: authSlice,
      accountSlice: accountSlice,
      serverSlice: serverSlice,
      searchSlice: searchSlice,
      createServerSlice: createServerSlice,
      overlaySlice: overlaySlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;