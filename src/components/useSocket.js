import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

let socket;
const endpoint = 'localhost:8080';

const useSocket = (name, room) => {
  const [messages, setMessages] = useState([]);
  const [typeMsg, setTypeMsg] = useState(``);
  // const [usersCountByRoom, setUsersCountByRoom] = useState([]);
  let usersCountByRoom = useRef([]);

  useEffect(() => {
    console.log('useSocket fired!');

    // Creates a WebSocket connection
    socket = io(endpoint, {
      query: { name, room },
    });

    // Listens for incoming messages
    socket.on('message', message => {
      console.log('in ON message -> ', message);
      setMessages(messages => [...messages, message]);
    });

    socket.on('getAllRooms', activeUsers => {
      console.log("🚀 ~ file: useSocket.js ~ line 28 ~ useSocket ~ activeUsers", activeUsers)
        // setUsersCountByRoom([...activeUsers])
        usersCountByRoom =[...activeUsers];

        Object.keys(activeUsers).forEach(roomName => {
          console.log(roomName, activeUsers[roomName]);
        });
      }),

    socket.on('sendTypingMsg', data => {
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
  }, [name, room]);

  

  useEffect(
    () => {
      console.log('in useEffect userCountByRooms -> ', usersCountByRoom);
      socket.emit('getAllRooms');
    },[usersCountByRoom]);

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


  return {messages, typeMsg, usersCountByRoom, sendNewMessage, sendTypingMsg};
};

export default useSocket;
