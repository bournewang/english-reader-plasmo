// src/index.ts
// export * from './api';
// export * from './components';
// export * from './contexts/UserContext';

// import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Faq, Login, Register, History } from './components';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      {/* <App /> */}
      {/* <Faq /> */}
      <Login/>
      {/* <History/> */}
    </UserProvider>
  </React.StrictMode>
);