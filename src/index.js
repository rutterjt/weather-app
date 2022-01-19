import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import '@fontsource/open-sans';
import '@fontsource/nunito';
import CSSReset from './styles/globalStyles';
import { GlobalThemeProvider } from './styles/theme';

import { worker } from './api/server';

import store from './app/store';

import App from './App';
import { saveState } from './app/localStorage';

store.subscribe(() => {
  saveState({ location: store.getState().location });
});

async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <GlobalThemeProvider>
          <CSSReset />
          <App />
        </GlobalThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

start();
