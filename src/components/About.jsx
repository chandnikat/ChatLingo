import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {CardContent, CardActionArea,CardMedia, AppBar, Toolbar, CssBaseline, Typography,  Button, Card, List, ListItemAvatar, ListItemText, ListItem, Avatar} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';

import theme from '../styles/theme.js';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontWeight: '800',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
    fontWeight: '800',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 140,
  },
  color: {
    color: '#fff',
    backgroundColor: "#3caea3",
  }
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
         <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <ChatIcon style={{ marginRight: '10px' }} />
          <Typography variant="h6" noWrap className={classes.title}>
            ChatLingo
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button color="inherit" className={classes.menuButton}>
              Home
            </Button>
            </Link>
        </Toolbar>
      </AppBar>


      <div className={classes.paper}>
          <Typography
            variant="h3"
            color="primary"
            style={{ fontWeight: '800', margin: '10px' }}
          >
            Team Heelys
          </Typography>
          <Card >
      <CardActionArea>
        <CardContent>
        <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.color}>
                    <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Logan Thies"
                    secondary="Git Master & Testing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.color}>
                    <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Anika Mustafiz"
                    secondary="Scrum Master & Backend"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.color}>
                    <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Trevor Carr"
                    secondary="Backend"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.color}>
                    <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Damon Alfaro"
                    secondary="Frontend"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar >
                    <Avatar className={classes.color}>
                      <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Chandni Patel"
                    secondary="Frontend"
                  />
                </ListItem>
          </List>
     
        </CardContent>
      </CardActionArea>

    </Card>
        </div>
 
      </ThemeProvider>
    </div>
  );
}



export default About;