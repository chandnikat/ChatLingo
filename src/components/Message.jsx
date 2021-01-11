import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({
  messageArea: {
    height: '71vh',
    overflowY: 'auto'
  },
});

var date = new Date();
var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

const Message = ({ message, name }) => {
  const classes = useStyles();
  // return message.name === name ? (
  //   <div className='message flexstart'>
  //     <p className='sentTextUser'>{message.name}</p>
  //     <div className='textBox'>
  //       <p className='text pr'>{message.text}</p>
  //     </div>
  //   </div>
  // ) : (
  //   <div className='message flexend'>
  //     <div className='textBox lt'>
  //       <p className='text dk'>{message.text}</p>
  //     </div>
  //     <p className='sentTextUser pl'>{message.name}</p>
  //   </div>
  // );
  return (
    <List className={classes.messageArea}>
    <ListItem key="1">
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align="right" primary={"Hey man, What's up ?"}></ListItemText>
            </Grid>
            <Grid item xs={12}>
                <ListItemText align="right" secondary={`${name}- ${time}`}></ListItemText>
            </Grid>
        </Grid>
    </ListItem>
    <ListItem key="2">
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
            </Grid>
            <Grid item xs={12}>
                <ListItemText align="left" secondary="09:31"></ListItemText>
            </Grid>
        </Grid>
    </ListItem>
</List>
  )
};

export default Message;
