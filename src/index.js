import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthenticationProvider } from './components/util/authentication';
import { ThemeProvider } from './components/util/theme';

initializeIcons();

ReactDOM.render(
  <AuthenticationProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthenticationProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
