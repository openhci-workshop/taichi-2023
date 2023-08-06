import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f4d03f',
      main: '#81a52c',
      dark: '#01732e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#d9d9d9',
      contrastText: '#01732e',
    },
  },
});

export default theme;