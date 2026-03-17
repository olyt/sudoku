import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { ThemeProvider } from 'styled-components';
import theme from './theming/themes';
import GlobalStyles from './GlobalStyles';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <AppContextProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <App />
            </ThemeProvider>
        </AppContextProvider>
    </React.StrictMode>
);
