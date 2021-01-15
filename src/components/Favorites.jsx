import React, { useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dictionarySection: {
    width: "100%",
    height: "83vh",
  },

  titleBox: {
    color: "#40637E",
    fontWeight: "bold",
    fontSize: "25px",
  },
  word: {
    color: "#40637E",
    fontWeight: "bold",
    fontSize: "20px",
    paddingTop: "18px",
  },
  partOfSpeech: {
    color: "#3caea3",
    fontWeight: "bold",
    fontSize: "16px",
    paddingTop: "7px",
    paddingBottom: "7px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const Favorites = ({ name, room }) => {
    const classes = useStyles();

  return (
    <div>
      <Grid container component={Paper} className={classes.dictionarySection}>
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Favorites</Typography>
            </ListItem>
            <Divider />
            <ListItem style={{ paddingTop: "20px" }} alignItems="center">
              <form className={classes.form} >
       
              </form>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Favorites;
