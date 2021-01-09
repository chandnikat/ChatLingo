import React from 'react';
import Messages from './Messages';
import InfoBar from './InfoBar';
import InputBox from './InputBox';
import useSocket from './useSocket';
import API from './VocabAPI';

const Chat = ({name, room}) => {
  // const { name, room } = match.params;
  // console.log(match.params);
  const [messages, typeMsg, sendNewMessage, sendTypingMsg] = useSocket(
    name,
    room
  );

  return (
    <div className="chatOuterContainer">
      {/* <div>
        <API />
      </div> */}
      <div className="chatInnerContainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} typeMsg={typeMsg} />
        <InputBox
          sendNewMessage={sendNewMessage}
          sendTypingMsg={sendTypingMsg}
        />
      </div>
    </div>
  );
};
export default Chat;
