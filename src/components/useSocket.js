import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;
const endpoint = 'localhost:8080';

const useSocket = (name, room) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('useEffect fired!');

    // Creates a WebSocket connection
    socket = io(endpoint, {
      query: { name, room },
    });

    // Listens for incoming messages
    socket.on('message', (message) => {
      // console.log(message);
      setMessages((messages) => [...messages, message]);
      // console.log('receiving message from the backend socket');
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socket.close();
    };
  }, [endpoint, name, room]);

  // client sends a message to the server
  // Server forwards it to all users in the same room
  const sendNewMessage = (newMessage) => {
    if (newMessage) {
      socket.emit('sendNewMessage', {
        id: socket.id,
        name,
        room,
        text: newMessage,
      });
    }
  };

  return [messages, sendNewMessage];
};

export default useSocket;
