
import { makeStyles } from '@material-ui/core/styles';
import {ListItemIcon, Grid, ListItemText, List, Divider} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

import { Chatrooms } from './Chatrooms';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Badge from '@material-ui/core/Badge';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles({
  joinSection: {
    width: "100%",
    height: "83vh",
  },

  titleBox: {
    color: "#40637E",
    fontWeight: "bold",
    fontSize: "25px",
  },
});



const Join = ({ handleRoomNameChange, socket }) => {
  const {usersCountByRoom} = socket;
  const classes = useStyles();

  return (
      <Grid container component={Paper} className={classes.joinSection}>
      <Grid item xs={12}>
        <List>
          <ListItem button>
            <Typography className={classes.titleBox}>
              Join a Chatroom
            </Typography>
          </ListItem>
          <Divider />
        {Chatrooms.map((room, idx) => (
          <ListItem button
            key={`room-${idx}`}
            onClick={e => handleRoomNameChange(room.roomName)}
          >
            <ListItemIcon>
              <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
                badgeContent={usersCountByRoom.length > 0
                  ? usersCountByRoom.find(rm => rm.roomName == room.roomName)
                      .userCount
                  : null}
                color="primary"
              >
                <PeopleAltIcon  style={{color: "#3caea3", fontSize:"30px" }}/>
              </Badge>
            </ListItemIcon>
            <ListItemText variant="inherit">
              {room.roomName}
              {/* {usersCountByRoom.length > 0
                ? usersCountByRoom.find(rm => rm.roomName == room.roomName)
                    .userCount
                : null} */}
            </ListItemText>
          </ListItem>
        ))}
</List>
      </Grid>
    </Grid>
  );
};

export default Join;
