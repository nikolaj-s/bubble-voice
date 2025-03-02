
import AppFeature from '../app/AppFeature';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const { configureStore } = require("@reduxjs/toolkit");

// state store
const store = configureStore({
    reducer: {
      AppFeature: AppFeature
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;