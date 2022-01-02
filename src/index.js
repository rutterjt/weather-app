import React from 'react';
import ReactDOM from 'react-dom';

// global styling
import CSSReset from 'globalStyles';

// App
import App from './App';

// store
import StoreProvider from 'store/context';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <CSSReset />
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
