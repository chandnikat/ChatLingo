import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;
const endpoint = 'localhost:8080';

const useSocket = (name, room) => {
  const [messages, setMessages] = useState([]);
  const [typeMsg, setTypeMsg] = useState(``);
  const [usersCountByRoom, setUsersCountByRoom] = useState([
    { roomName: 'English', userCount: 0 },
    { roomName: 'French', userCount: 0 },
    { roomName: 'Spanish', userCount: 0 },
    { roomName: 'German', userCount: 0 },
  ]);

  useEffect(() => {
    console.log('useSocket fired!');

    // Creates a WebSocket connection
    socket = io(endpoint, {
      query: { name, room },
    });

    // Listens for incoming messages
    socket.on('message', message => {
      // setTypeMsg('');
      // console.log(message);
      setMessages(messages => [...messages, message]);
    });
    // console.log('receiving message from the backend socket');

    socket.on('sendTypingMsg', data => {
      // console.log(message);
      setTypeMsg(data);

      setTimeout(() => {
        setTypeMsg('');
      }, 1000);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socket.close();
    };
  }, [name, room, usersCountByRoom]);

  useEffect(
    () =>
      socket.on('getAllRooms', activeUsers => {
        Object.keys(activeUsers).forEach(roomName => {
          console.log(roomName, activeUsers[roomName]);
        });
      }),
    [usersCountByRoom]
  );

  // client sends a message to the server
  // Server forwards it to all users in the same room
  const sendNewMessage = newMessage => {
    if (newMessage) {
      socket.emit('sendNewMessage', {
        id: socket.id,
        name,
        room,
        text: newMessage,
      });
    }
  };

  const sendTypingMsg = () => {
    socket.emit('sendTypingMsg', `${name} is typing...`);
  };

  // const ucbr = useRef(usersCountByRoom);

  // useEffect(async () => {
  //   console.log('in useEffect');
  //   console.log(
  //     'file: Dashboard.jsx ~ line 174 ~ Dashboard ~ tool, room, open,',
  //     tool,
  //     room,
  //     open
  //   );
  //   try {
  //     const response = await axios.get('/activerooms', {
  //       header: { 'Content-Type': 'Application/JSON' },
  //     });
  //     console.log('response => ', response);

  //     ucbr.current = response.data;

  //     console.log('file: Dashboard.jsx ~ line 158 ~ Dashboard ~ ucbr', ucbr);
  //   } catch (error) {
  //     console.log('Error in getActiveRooms of Join component:', error);
  //   }
  // }, [name, tool, room, open, ucbr]);

  return [messages, typeMsg, sendNewMessage, sendTypingMsg, getActiveUsers];
};

export default useSocket;
