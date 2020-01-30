import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeFireBase } from './pushNotifications/push-notifications';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#51b7ae',
      main: '#26a69a',
      dark: '#1a746b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#53c4f7',
      main: '#29b6f6',
      dark: '#1c7fac',
      contrastText: '#000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

serviceWorker.register();