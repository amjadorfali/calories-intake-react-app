import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import BounceComponent from 'components/bounceComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#90D7FF',
      contrastText: '#688097',
      dark: '#90D7FF',
      light: '#90D7FF',
    },
    secondary: {
      main: '#5DFDCB',
      contrastText: '#B8B3BE',
      dark: '#5DFDCB',
      light: '#5DFDCB',
    },
  },
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={3000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BounceComponent />
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
