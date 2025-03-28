
import { configureStore } from '@reduxjs/toolkit';

import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const reducers = {};

const sliceContext = require.context('../features', true, /Slice\.js$/);

sliceContext.keys().forEach((key) => {
  const slice = sliceContext(key).default;
  const sliceName = key.split('/').pop().replace('.js', '');
  reducers[sliceName] = slice;
});
// state store
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;