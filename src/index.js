import React from 'react';
import ReactDOM from 'react-dom';

// global styling
// import CSSReset from 'globalStyles';

// theme
// import { GlobalThemeProvider } from 'styles/theme';

// worker
import { worker } from './api/server';

// App
import App from './App';

// store
// import StoreProvider from 'store/context';

// worker.start({ onUnhandledRequest: 'bypass' });

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <StoreProvider> */}
//     {/* <GlobalThemeProvider> */}
//     {/* <CSSReset /> */}
//     <App />
//     {/* </GlobalThemeProvider> */}
//     {/* </StoreProvider> */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );

async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' });

  ReactDOM.render(
    <React.StrictMode>
      {/* <StoreProvider> */}
      {/* <GlobalThemeProvider> */}
      {/* <CSSReset /> */}
      <App />
      {/* </GlobalThemeProvider> */}
      {/* </StoreProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
  );
}

start();
