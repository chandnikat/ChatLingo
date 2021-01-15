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
  ListSubheader,
  Box
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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
  const [definitionArray, setDefinitionArray] =  useState([])

  return (
    <div>
      <Grid container component={Paper} className={classes.dictionarySection}>
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Favorites</Typography>
            </ListItem>
            <Divider />

            {/* Translation: */}
            <ListItem>
              <Paper
                style={{
                  paddingLeft: "5px",
                  height: "35vh",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <ListSubheader
                  style={{
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  <Typography style={{ color: "#3caea3", fontWeight: "bold" }}>
                    Translation:
                  </Typography>
                  <Divider />
                </ListSubheader>

                {definitionArray.map((vocab) => (
                <ListItem style={{ padding: "0px", margin: "0px" }}>
                  <ListItemText>
                    <Typography style={{ fontSize: "13px" }}>
                      Word: <span style={{fontStyle:"italic"}}>partOfSpeech</span> "definition"
                    </Typography>
                  </ListItemText>
                  <DeleteOutlineIcon
                    style={{ padding: "2px", color: "#40637E" }}
                  />
                </ListItem>
                ))}
              </Paper>
            </ListItem>

            {/* Dictionary: */}

            <ListItem>
              <Paper
                style={{
                  paddingLeft: "5px",
                  height: "35vh",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <ListSubheader
                  style={{
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  <Typography style={{ color: "#3caea3", fontWeight: "bold" }}>
                    Dictionary:
                  </Typography>
                  <Divider />
                </ListSubheader>

                <ListItem style={{ padding: "0px", margin: "0px" }}>
                  <ListItemText>
                    <Typography style={{ fontSize: "13px" }}>
                      Word: <span style={{fontStyle:"italic"}}>partOfSpeech</span> "definition"
                    </Typography>
                  </ListItemText>
                  <DeleteOutlineIcon
                    style={{ padding: "2px", color: "#40637E" }}
                  />
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
