import React, { useState, useRef } from 'react';
import useToggle from './useToggle';
import { Smile } from 'react-feather';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const InputBox = ({ sendNewMessage, sendTypingMsg }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, toggleShowEmojiPicker] = useToggle(false);
  const inputEl = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    } else {
      sendTypingMsg();
    }
  };

  const handleSendMessage = (e) => {
    // console.log('handleSendMessage!');
    e.preventDefault();
    sendNewMessage(newMessage);
    setNewMessage('');
    inputEl.current.focus();
  };

  const addEmoji = (emoji) => {
    // console.log('emoji => ', emoji);
    setNewMessage(`${newMessage} ${emoji.native} `);
    toggleShowEmojiPicker();
    inputEl.current.focus();
  };

  return (
    <div>
      {/* <div className="emojiPicker">
        {showEmojiPicker && (
          <Picker
            set="apple"
            title="Pick your emoji…"
            emoji="point_up"
            autoFocus={true}
            enableFrequentEmojiSort={true}
            style={{ position: 'absolute', bottom: '80px', right: '300px' }}
            onSelect={addEmoji}
          />
        )}
      </div>
      <div className="inputBoxInnerContainer">
        <div className="emoji-icon" onClick={toggleShowEmojiPicker}>
          <Smile />
        </div>
        <input
          className="inputBox"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          onClick={showEmojiPicker ? toggleShowEmojiPicker : null}
          autoFocus
          ref={inputEl}
        />
        <button className="sendButton" onClick={handleSendMessage}>
          Send
        </button> */}
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            id='outlined-basic-email'
            label='Type a message...'
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onClick={showEmojiPicker ? toggleShowEmojiPicker : null}
            autoFocus
            ref={inputEl}
          ></TextField>
        </Grid>
        <Grid item xs={1} align='right'>
          <Fab color='primary' aria-label='add' onClick={handleSendMessage}>
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

export default InputBox;
