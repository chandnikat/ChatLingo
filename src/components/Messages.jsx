import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

const Messages = ({ messages, name, typeMsg, toUpperFirst }) => {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => (
        <div key={`message-${i}`}>
          <Message message={message} name={name} toUpperFirst={toUpperFirst}/>
        </div>
      ))}
      <p>{typeMsg}</p>
    
     
    </ScrollToBottom>
  );
};

export default Messages;
