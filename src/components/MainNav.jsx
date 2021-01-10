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
export default function MainNav() {
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
            <Button color="inherit" className={classes.menuButton}>
              About
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );

  //     <ul>
  //       {MenuItems.map((item, idx) => {
  //         return (
  //           <li className='MainNav-item' key={`menuitem-${idx}`}>
  //             <Link to={item.link}>{item.itemName}</Link>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </nav>
  // );
}
