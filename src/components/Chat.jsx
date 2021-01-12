import React from 'react';
import Messages from './Messages';
import InfoBar from './InfoBar';
import InputBox from './InputBox';
import useSocket from './useSocket';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  table: {
    minWidth: 660,
  },
  chatSection: {
    width: '100%',
    height: '83vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '100vh',
    overflowY: 'auto'
  },
  roomBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: "25px"
  },
  avatar : {
    color: '#fff',
    backgroundColor: "#40637E",
  }
});

const Chat = ({name, room}) => {
  const classes = useStyles();
  const [messages, typeMsg, sendNewMessage, sendTypingMsg] = useSocket(
    name,
    room
  );



  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
              <List>
                  <ListItem button >
                      <Typography className={classes.roomBox}>{room}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem button >
                      <ListItemIcon>
                          <Avatar className={classes.avatar}>{name[0]}</Avatar>
                      </ListItemIcon>
                      <ListItemText >{name} </ListItemText>
                  </ListItem>
              </List>
          </Grid>
          <Grid item xs={9} className={classes.messageArea}>
                <Messages messages={messages} name={name} typeMsg={typeMsg} />
              <Divider />
     
              <InputBox sendNewMessage={sendNewMessage} sendTypingMsg={sendTypingMsg}/>
          </Grid>
      </Grid>
    </div>
);




};
export default Chat;
