import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';

import store from './store/store';
import { HashRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AnimatePresence exitBeforeEnter >
      <HashRouter window={window}>
        <App />
      </HashRouter>
    </AnimatePresence>
  </Provider>
);


