const axios = require('axios');
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItemIcon,
  Grid,
  ListItemText,
  List,
  Divider,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React from "react";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Badge from "@material-ui/core/Badge";
import { ListItem } from "@material-ui/core";

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
  const { usersCountByRoom } = socket;
  const classes = useStyles();
  const [Chatrooms, setChatrooms] = useState([]);

  // make fetch request to database to get chatrooms and then populate it in an array


  useEffect(() => {
    axios.get('/chatroom/getAllChatrooms')
      .then(response => {
        const chatroomArray = [];
        response.data.forEach(el => {
          const { chatroom_name: roomName, chatroom_id: roomId } = el;
          chatroomArray.push({ roomName, roomId });
        })
        setChatrooms([...Chatrooms, ...chatroomArray]);
      })
  }, []);

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
            <ListItem
              button
              style={{ padding: "15px" }}
              key={`room-${idx}`}
              onClick={(e) => handleRoomNameChange(room.roomName)}
            >
              <ListItemIcon>
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}

                  badgeContent={
                    usersCountByRoom.length > 0
                      ? usersCountByRoom.find(
                        (rm) => rm.roomName == room.roomName
                      ).userCount
                      : null
                  }
                  color="primary"
                >
                  <PeopleAltIcon
                    style={{ color: "#3caea3", fontSize: "30px" }}
                  />
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
