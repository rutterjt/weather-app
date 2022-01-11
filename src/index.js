import React from 'react';
import ReactDOM from 'react-dom';

// global styling
import CSSReset from 'globalStyles';

// theme
import { GlobalThemeProvider } from 'styles/theme';

// App
import App from './App';

// store
import StoreProvider from 'store/context';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <GlobalThemeProvider>
        <CSSReset />
        <App />
      </GlobalThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
