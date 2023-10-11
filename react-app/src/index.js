import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import ReduxProvider from './redux/provider';
import createTheme from './theme';

const customTheme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider theme={customTheme}>
        <ReduxProvider>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </ReduxProvider>
    </ThemeProvider>
);
