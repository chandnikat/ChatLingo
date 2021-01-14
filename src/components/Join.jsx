import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Chatrooms } from './Chatrooms';
import useInputState from './useInputState';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import useSocket from './useSocket';

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

const Join = ({ name, room, handleRoomNameChange }) => {
  const {usersCountByRoom} = useSocket();

  console.log("usersCountByRoom - > ", usersCountByRoom);
  
  // const { name } = match.params;
  // const [room, handleChangeRoom] = useInputState('');
  // const [usersCountByRoom, setUsersCountByRoom] = useState([]);
  // const usersCountByRoom = getActiveRooms();
  // const getActiveRooms = () => {
  //   async () => {
  //     try {
  //       const response = await axios.get('/activerooms', {
  //         header: { 'Content-Type': 'Application/JSON' },
  //       });
  //       console.log('response => ', response);

  //       const usersCountByRoom = response.data;

  //       console.log('usersCountByRoom => ', usersCountByRoom);

  //       setUsersCountByRoom([...usersCountByRoom]);
  //     } catch (error) {
  //       console.log('Error in getActiveRooms of Join component:', error);
  //     }
  //   };
  // };

  // useEffect(() => {
  //   console.log('useEffect in Join Component fired');
  //   getActiveRooms();
  // }, []);

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

  // return (
  //   <div className="joinOuterContainer">
  //     <div className="joinInnerContainer">
  //       <h1 className="heading">Welcome</h1>
  //       <>
  //         <select
  //           className="joinInput"
  //           value={room}
  //           onChange={e => handleRoomNameChange(e.target.value)}
  //         >
  //           <option>Choose A Chatroom</option>
  //           {Chatrooms.map((room, idx) => (
  //             <option key={`room-${idx}`} value={room.roomName}>
  //               {room.roomName}
  //             </option>
  //           ))}
  //         </select>
  //       </>
  //       <>
  //         {/* <Link
  //           onClick={(e) =>
  //             !name || !room || room === 'Choose A Chatroom'
  //               ? e.preventDefault()
  //               : null
  //           }
  //           to={`/chat/${name}/${room}`}
  //         >
  //           <button className="joinButton" type="submit">
  //             Join
  //           </button>
  //         </Link> */}
  //       </>
  //       <>
  //         <div className="usersCountByRoom">
  //           <div className="usersCountByRoom-heading">
  //             {usersCountByRoom.some(room => room.userCount !== 0)
  //               ? 'Active Chatrooms'
  //               : null}
  //           </div>
  //           <div className="usersCountByRoom-content">
  //             {usersCountByRoom.map((room, i) =>
  //               room.userCount ? (
  //                 <div key={`room-${i}`} className="room">
  //                   <img
  //                     alt="Online Icon"
  //                     src={'../assets/images/onlineIcon.png'}
  //                   />
  //                   <>
  //                     {`${room.roomName}: ${room.userCount} ${
  //                       room.userCount === 1 ? 'User' : 'Users'
  //                     }`}
  //                   </>
  //                 </div>
  //               ) : null
  //             )}
  //           </div>
  //         </div>
  //       </>
  //     </div>
  //   </div>
  // );
};

export default Join;
