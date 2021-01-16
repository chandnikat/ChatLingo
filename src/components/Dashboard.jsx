import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Drawer,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatIcon from '@material-ui/icons/Chat';
import StarIcon from '@material-ui/icons/Star';
import HistoryIcon from '@material-ui/icons/History';
import LanguageIcon from '@material-ui/icons/Language';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Join from './Join';
import Dictionary from './Dictionary';
import Translation from './Translation';
import Conversations from './Conversations';
import Favorites from './Favorites';
import Chat from './Chat';
import theme1 from '../styles/theme.js';
import { Favorite } from '@material-ui/icons';
import useSocket from './useSocket';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%',
    padding: '7px',
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontWeight: '800',
  },
  gridItem: {
    padding: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
    fontWeight: '800',
  },
}));

const Dashboard = ({ match }) => {
  let { name } = match.params;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState('rooms');
  const [room, setRoom] = useState('English');
  const socket = useSocket(name, room);

  //Capitalizes username:
  const toUpperFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const socket = useSocket(name, room, toUpperFirst);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRoomNameChange = (input) => {
    setRoom(input);
  };

  name = toUpperFirst(name);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme1}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <ChatIcon style={{ marginRight: '10px' }} />
            <Typography variant='h6' noWrap className={classes.title}>
              ChatLingo
            </Typography>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => localStorage.removeItem(name)}
                color='inherit'
                className={classes.menuButton}
              >
                Logout
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => setTool('dictionary')}
              key={'Dictionary'}
            >
              <ListItemIcon>{<MenuBookIcon color='secondary' />}</ListItemIcon>
              <ListItemText primary={'Dictionary'} />
            </ListItem>
            <ListItem
              button
              onClick={() => setTool('translation')}
              key={'Translation'}
            >
              <ListItemIcon>{<LanguageIcon color='secondary' />}</ListItemIcon>
              <ListItemText primary={'Translation'} />
            </ListItem>
            <ListItem
              button
              button
              onClick={() => setTool('favorites')}
              key={'Favorites'}
            >
              <ListItemIcon>{<StarIcon color='secondary' />}</ListItemIcon>
              <ListItemText primary={'Favorites'} />
            </ListItem>
            <ListItem
              button
              button
              onClick={() => setTool('conversations')}
              key={'Conversations'}
            >
              <ListItemIcon>{<HistoryIcon color='secondary' />}</ListItemIcon>
              <ListItemText primary={'Conversations'} />
            </ListItem>
            <ListItem
              button
              button
              onClick={() => setTool('rooms')}
              key={'Rooms'}
            >
              <ListItemIcon>{<PeopleAltIcon color='secondary' />}</ListItemIcon>
              <ListItemText primary={'Rooms'} />
            </ListItem>
          </List>
        </Drawer>
        <Grid container style={{ height: '85vh' }}>
          <Grid item xs={12} sm={3} className={classes.content}>
            <Paper
              style={{ height: '85vh' }}
              className={classes.gridItem}
              style={{ backgroundColor: '#3caea3' }}
            >
              {/* <div className={classes.toolbar} /> */}
              {tool === 'rooms' && (
                <Join
                  name={name}
                  handleRoomNameChange={handleRoomNameChange}
                  room={room}
                  socket={socket}
                />
              )}
              {tool === 'conversations' && <Conversations socket={socket} />}
              {tool === 'dictionary' && (
                <Dictionary name={name} toUpperFirst={toUpperFirst} />
              )}
              {tool === 'translation' && <Translation name={name} />}
              {tool === 'favorites' && <Favorites name={name} />}
            </Paper>
          </Grid>
          <Divider orientation='vertical' />
          <Grid item xs={12} sm={8} className={classes.content}>
            <Paper
              style={{ height: '85vh' }}
              className={classes.gridItem}
              style={{ backgroundColor: '#3caea3' }}
            >
              {/* <div className={classes.toolbar} /> */}
              <Chat
                name={name}
                room={room}
                socket={socket}
                toUpperFirst={toUpperFirst}
              />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
