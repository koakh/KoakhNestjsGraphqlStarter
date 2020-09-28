import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { Theme } from '@material-ui/core/styles';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },    
  },
});
