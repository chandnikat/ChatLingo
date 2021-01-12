import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import theme from '../styles/theme.js';

//STYLING:
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
    fontWeight: '800',
  },

  title: {
    flexGrow: 1,
    color: 'white',
    fontWeight: '800',
  },
}));



//NavBar COMPONENT:
const MainNav = ({history}) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <ChatIcon style={{ marginRight: '10px' }} />
            {/* <Link to="/" style={{ textDecoration: 'none' }}> */}
              <Typography variant="h6" className={classes.title}>
                ChatLingo
              </Typography>
            {/* </Link> */}
            <Link to="/team" style={{ textDecoration: 'none' }}>
            <Button color="inherit" className={classes.menuButton}>
              About
            </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );

}
export default MainNav;