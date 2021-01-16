import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Button,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ToggleButtonGroup } from '@material-ui/lab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  converstionSection: {
    width: '100%',
    height: '83vh',
  },
  titleBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
}));

const Conversations = ({ name, socket }) => {
  const classes = useStyles();
  const [ConversationArray, setConversationArray] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { messages } = socket;

  //GET all conversations useEffect:
  useEffect(async () => {
    let token = localStorage.getItem(name);
    try {
      const response = await Axios.get('/history/getAllConversations', {
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `${token}`,
        },
      });
      const data = response.data.reverse();
      console.log('CONVERSATIONS DATA', data);
      setConversationArray(data);
    } catch (err) {
      console.log(
        `Catch block, GET error on /history/getAllConversations: ${err}`,
      );
    }
  }, [toggle]);

  const handleDeleteConversation = async (word) => {
    let token = localStorage.getItem(name);
    const body = { word };
    console.log(body);
    try {
      let response = await Axios.delete('/history/deleteConversation', {
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `${token}`,
        },
        data: body,
      });
      response = JSON.stringify(response.data);
      // console.log(response);
      setConversationArray(
        ConversationArray.filter((item) => item !== body.word),
      );
      setToggle(true);
    } catch (err) {
      console.log(
        `Catch block, DELETE error on /history/deleteConversation: ${err}`,
      );
    }
  };

  const handleSaveConversation = async (e) => {
    let token = localStorage.getItem(name);
    const body = { messages };
    console.log(
      'file: Conversations.jsx ~ line 101 ~ handleSaveConversation ~ body',
      body,
    );

    try {
      let response = await Axios.post('/history/saveConversation', body, {
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `${token}`,
        },
      });
      response = JSON.stringify(response.data);
      console.log('handleSaveConversation response ->', response);
    } catch (err) {
      console.log(
        `Catch block, POST error on /history/saveConversation: ${err}`,
      );
    }
  };

  return (
    <div>
      <Grid container component={Paper} className={classes.converstionSection}>
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>
                Conversations
              </Typography>
            </ListItem>
            <Divider />

            {/* Conversation: */}
            <ListItem>
              <Paper
                style={{
                  paddingLeft: '5px',
                  height: '65vh',
                  width: '100%',
                  overflowY: 'auto',
                }}
              >
                {ConversationArray.map((conversation, idx) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{conversation.language}</Typography>
                      <DeleteOutlineIcon
                        style={{ padding: '2px', color: '#40637E' }}
                        // onClick={(e) => handleDeleteConversation(vocab.word)}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <ListItem>
                        <ListItemText>
                          <Typography>
                            <span
                              style={{ color: '#40637E', fontWeight: 'bold' }}
                            >
                              Participants:
                            </span>{' '}
                            {conversation.participants}
                            {/* {conversation.participants.reduce((acc, cv) => {
                              acc.concat(`${cv}, `);
                            })} */}
                          </Typography>

                          <Typography>
                            <span
                              style={{ color: '#40637E', fontWeight: 'bold' }}
                            >
                              Messages:
                            </span>{' '}
                          </Typography>

                          {conversation.messages.map((msg) => (
                            <Typography>
                              {JSON.parse(msg).author}:{' '}
                              {JSON.parse(msg).message}
                            </Typography>
                          ))}
                        </ListItemText>
                      </ListItem>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </ListItem>
            <ListItem style={{ justifyContent: 'center', paddingTop: '7px' }}>
              <Button
                variant='contained'
                fullWidth
                color='primary'
                style={{ fontWeight: '700' }}
                type='submit'
                onClick={(e) => handleSaveConversation()}
              >
                Save Conversation
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Conversations;
