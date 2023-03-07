import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './constants/themes';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
