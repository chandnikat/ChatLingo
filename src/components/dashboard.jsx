import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Join from './Join'
import VocabAPI from './VocabAPI'
import Chat from './Chat'
import theme from '../styles/theme.js';

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
  },
}));

const Dashboard = ({  match  }) => {
const { name, room } = match.params;
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tool, setTool] = React.useState('rooms');

console.log("TOOL ->", tool)
console.log("NAME ->" ,name)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
         <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ChatLingo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={() => setTool('dictionary')} key={"Dictionary"} >
              <ListItemIcon >{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={"Dictionary"} />
            </ListItem>
            <ListItem button onClick={() => setTool('translation') } key={"Translation"} >
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={"Translation"} />
            </ListItem>
            <ListItem button button onClick={() => setTool('history') }key={"History"} >
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItem>
            <ListItem button button onClick={() => setTool('rooms') }key={"Rooms"} >
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={"Rooms"} />
            </ListItem>
        </List>
      </Drawer>
      <Grid container direction="row" alignItems="stretch" spacing={1} style={{height:"100vh"}}>
      <Grid item xs={12} sm={4} className={classes.content} >
        <Paper style={{height:'100%'}}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        {tool} 
        </Typography>
        {tool === 'rooms' && (<Join name={name}/>)}
        {tool === 'dictionary' && (<VocabAPI />)}
      </Paper>
      </Grid>
      <Divider orientation="vertical" style={{height:'100%'}}/>
      <Grid item xs={12} sm={7} className={classes.content}>
        <Paper style={{height:'100%'}}>
          <div className={classes.toolbar} />
        <Typography paragraph>
          Chatbox
        </Typography>
          <Chat name={name} room={"English"}/>
        </Paper>
      </Grid>
      </Grid>
      </ThemeProvider>
    </div>
  );
}


export default Dashboard;