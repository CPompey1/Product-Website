import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5733',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });
export const isWebview  = () => {return RegisterLoginJsInterface && null}
export const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
export const GO_SERVER_HOST = process.env.GO_SERVER_HOST || 'localhost:3002';
export const LOGO_URL = '/media/static_content/E-Bazzar_Logo.png';