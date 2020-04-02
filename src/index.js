import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
import { Fabric, Customizer } from '@fluentui/react';
import { AuthenticationProvider } from './components/authentication';
import App from './App';
import {
  TeamsCustomizations,
  // WordCustomizations,
  // DefaultCustomizations,
  // DarkCustomizations
} from '@uifabric/theme-samples';
initializeIcons();

ReactDOM.render(
  <AuthenticationProvider>
    <Customizer {...TeamsCustomizations}>
      <Fabric>
        <App />
      </Fabric>
    </Customizer>
  </AuthenticationProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
