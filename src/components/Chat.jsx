import React from "react";
import Messages from "./Messages";
import InputBox from "./InputBox";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Avatar,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '83vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '72vh',
    overflowY: 'auto',
  },
  roomBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  avatar: {
    color: '#fff',
    backgroundColor: '#40637E',
  },
});

const Chat = ({ name, room, socket}) => {
  const classes = useStyles();
  const {messages, typeMsg, sendNewMessage, sendTypingMsg} = socket

  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button>
              <Typography className={classes.roomBox}>{room}</Typography>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{name[0]}</Avatar>
              </ListItemIcon>
              <ListItemText>{name} </ListItemText>
            </ListItem>
          </List>
        </Grid>
        {/* <Grid container direction="column"> */}
        <Grid item xs={9} >
          <Grid item className={classes.messageArea}>
          <Messages
            // style={{ height: '25vh' }}
            messages={messages}
            name={name}
            typeMsg={typeMsg}
          />
        </Grid>

          <Divider />
        <Grid item >
          <InputBox
            // style={{ height: '15vh' }}
            sendNewMessage={sendNewMessage}
            sendTypingMsg={sendTypingMsg}
          />
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Chat;
