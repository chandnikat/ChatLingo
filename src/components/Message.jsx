import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles({
  messageArea: {
    overflowY: "auto",
  },
});

var date = new Date();
var time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Message = ({ message, name }) => {
  const classes = useStyles();

  return message.name === name.toLowerCase() ? (
    <List className={classes.messageArea}>
      <ListItem key="1">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="right" primary={message.text}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align="right"
              secondary={`${message.name}- ${time}`}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  ) : (
    <List className={classes.messageArea}>
      <ListItem key="2">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="left" primary={message.text}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align="left"
              secondary={`${message.name}- ${time}`}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export default Message;
