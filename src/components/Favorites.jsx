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
  ListItemText,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";

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
            <ListItem>
              <Paper style={{ padding: "5px", height: "35vh", width: "100%" }}>
                <Typography style={{ color: "#3caea3", fontWeight: "bold" }}>
                  Translation:
                </Typography>
                <Divider />
              </Paper>
            </ListItem>
            <ListItem>
              <Paper
                style={{
                  padding: "5px",
                  height: "35vh",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <Typography style={{ color: "#3caea3", fontWeight: "bold" }}>
                  Dictionary:
                </Typography>
                <Divider />
                <ListItem>
                  <StarIcon style={{ fontSize: "medium", padding: "0px" }} />
                  <ListItemText style={{ fontSize: "15px" }}>
                    House:"a building for human habitation, especially one that
                    is lived in by a family or small group of people"
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <StarIcon style={{ fontSize: "medium", padding: "0px" }} />
                  <ListItemText style={{ fontSize: "15px" }}>
                    House:"a building for human habitation, especially one that
                    is lived in by a family or small group of people"
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <StarIcon style={{ fontSize: "medium", padding: "0px" }} />
                  <ListItemText style={{ fontSize: "15px" }}>
                    House:"a building for human habitation, especially one that
                    is lived in by a family or small group of people"
                  </ListItemText>
                </ListItem>
                
              </Paper>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Favorites;
