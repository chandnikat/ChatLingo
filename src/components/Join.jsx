import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { Chatrooms } from './Chatrooms';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
  joinSection: {
    width: '100%',
    height: '83vh',
  },

  titleBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
});



const Join = ({ handleRoomNameChange, socket }) => {
  const {usersCountByRoom} = socket;

  return (
    <Paper>
      <MenuList>
        {Chatrooms.map((room, idx) => (
          <MenuItem
            key={`room-${idx}`}
            onClick={e => handleRoomNameChange(room.roomName)}
          >
            <ListItemIcon>
              <Badge
                badgeContent={usersCountByRoom.length > 0
                  ? usersCountByRoom.find(rm => rm.roomName == room.roomName)
                      .userCount
                  : null}
                color="primary"
              >
                <SendIcon fontSize="small" />
              </Badge>
            </ListItemIcon>
            <Typography variant="inherit">
              {room.roomName}
              {usersCountByRoom.length > 0
                ? usersCountByRoom.find(rm => rm.roomName == room.roomName)
                    .userCount
                : null}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );

export default Join;
