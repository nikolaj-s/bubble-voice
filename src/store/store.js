
import appSlice from '../features/App/appSlice';

import authSlice from '../features/Auth/AuthSlice';

import accountSlice from '../features/Account/accountSlice';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const { configureStore } = require("@reduxjs/toolkit");

// state store
const store = configureStore({
    reducer: {
      appSlice: appSlice,
      authSlice: authSlice,
      accountSlice: accountSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;