import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

let socket;
const endpoint = 'localhost:8080';

const useSocket = (name, room) => {
  const [messages, setMessages] = useState([]);
  const [typeMsg, setTypeMsg] = useState(``);
  const [userJoined, setUserJoined] = useState(false)
  const [usersCountByRoom, setUsersCountByRoom] = useState([]);
  
  useEffect(() => {
    console.log('USE EFFECT FOR MESSAGING fired!');
    
    // Creates a WebSocket connection
    socket = io(endpoint, {
      query: { name, room },
    });

    socket.on('userJoined', () => {
      setUserJoined(true);
      setTimeout(() => {
        setUserJoined(false);
      }, 500);
    })
    
    // Listens for incoming messages
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
    

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

  useEffect(() => {
    console.log('USE EFFECT FOR ACTIVE USERS fired!');

    socket.on('getAllRooms', activeUsers => {
      console.count("🚀 ~ file: useSocket.js ~ line 45 ~ useEffect ~ activeUsers", activeUsers)
      setUsersCountByRoom(activeUsers => [...activeUsers]) 
      console.count("🚀 ~ file: useSocket.js ~ line 47 ~ socket.on ~ usersCountByRoom", usersCountByRoom)
      
      })
  }, [activeUsers])

  

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
  
  const emitGetRooms = () => {
    socket.emit('getAllRooms')
  }

  return {messages, typeMsg, usersCountByRoom, userJoined, sendNewMessage, sendTypingMsg, emitGetRooms};
};

export default useSocket;
