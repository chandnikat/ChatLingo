import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

let socket;
const endpoint = 'localhost:8080';

const useSocket = (name, room, toUpperFirst) => {
  const [messages, setMessages] = useState([]);
  const [typeMsg, setTypeMsg] = useState(``);
  const [usersCountByRoom, setUsersCountByRoom] = useState([]);

  useEffect(() => {
    console.log('useEffect fired!');
    setMessages([]);

    // Creates a WebSocket connection
    socket = io(endpoint, {
      query: { name, room },
    });

    // Listens for incoming messages
    socket.on('message', message => {
      message.text = toUpperFirst(message.text);
      setMessages(messages => [...messages, message]);
    });

    socket.on('sendTypingMsg', data => {
      setTypeMsg(data);

      setTimeout(() => {
        setTypeMsg('');
      }, 500);
    });

    socket.on('getAllRooms', activeUsers => {
      console.log("🚀 ~ file: useSocket.js ~ line 45 ~ useEffect ~ activeUsers", activeUsers)
      setUsersCountByRoom([...activeUsers])       
      })

    socket.emit('getAllRooms')
      // Destroys the socket reference
      // when the connection is closed
      return () => {
      socket.close();
    };
  }, [room]);

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