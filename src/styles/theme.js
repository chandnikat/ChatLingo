import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#668297',
        main: '#40637E',
        dark: '#2c4558',
        contrastText: '#fff',
      },
      secondary: {
        light: '#63beb5',
        main: '#3caea3',
        dark: '#2a7972',
        contrastText: '#fff',
      },
    },
  });

  export default theme;