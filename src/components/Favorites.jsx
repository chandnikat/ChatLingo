import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
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

const Favorites = ({ room }) => {
  const classes = useStyles();
  const [definitionArray, setDefinitionArray] = useState([]);
  const [translationArray, setTranslationArray] = useState([]);

  //GET all definition useEffect:
  useEffect(async () => {
    let token = localStorage.getItem("currentUser");
    try {
      const defintionResponse = await Axios.get("/history/getAllDefinitions", {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
      });
      const data = defintionResponse.data;
      setDefinitionArray(data);
    } catch (err) {
      console.log(
        `Catch block, GET error on /history/getAllDefinitions: ${err}`
      );
    }
  }, []);

  //GET all translation useEffect:
  useEffect(async () => {
    let token = localStorage.getItem("currentUser");
    try {
      const response = await Axios.get("/history/getAllTranslations", {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
      });
      const data = response.data;
      // console.log("DATA Trans->", data)
      setTranslationArray(data);
    } catch (err) {
      console.log(
        `Catch block, GET error on /history/getAllDefinitions: ${err}`
      );
    }
  }, []);

  const handleDeleteDictionary = async (word) => {
    let token = localStorage.getItem("currentUser");
    const body = {word: word}
    console.log(body)
    try {
      let response = await Axios.delete("/history/deleteDefinition",  {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
        data : {
          body
        }
      });
      response = JSON.stringify(response.data);
      console.log(response)
    } catch (err) {
      console.log(`Catch block, POST error on /history/deleteDefinition: ${err}`);
    }
  };

  const handleDeleteTranslation = async (word) => {
    let token = localStorage.getItem("currentUser");
    const body = {word: word}
    console.log(body)
    try {
      let response = await Axios.delete("/history/deleteDefinition",  {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
        data : {
          body
        }
      });
      response = JSON.stringify(response.data);
      console.log(response)
    } catch (err) {
      console.log(`Catch block, POST error on /history/deleteDefinition: ${err}`);
    }
  };


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

                {translationArray.map((phrase, idx) => (
                  <ListItem button style={{ padding: "0px", margin: "0px" }} key={idx}>
                    <ListItemText>
                      <Typography style={{ fontSize: "13px" }}>
                        <span style={{ color: "#40637E", fontWeight: "bold" }}>
                          {phrase.language_from}:
                        </span>{" "}
                        {phrase.word}
                      </Typography>
                      <Typography style={{ fontSize: "13px" }}>
                        <span style={{ color: "#40637E", fontWeight: "bold" }}>
                          {phrase.language_to}:
                        </span>{" "}
                        {phrase.translation.replace(/^"(.+(?="$))"$/, "$1")}
                      </Typography>
                    </ListItemText>
                    <DeleteOutlineIcon
                      style={{ padding: "2px", color: "#40637E" }}
                      // onClick={(e) => handleDeleteTranslation(phrase.)}
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

                {definitionArray.map((vocab, idx) => (
                  <ListItem button style={{ padding: "0px", margin: "0px" }} key={idx}>
                    <ListItemText>
                      <Typography style={{ fontSize: "13px" }}>
                        <span style={{ color: "#40637E", fontWeight: "bold" }}>
                          {vocab.word}
                        </span>{" "}
                        <span style={{ fontStyle: "italic" }}>
                          (
                          {vocab.part_of_speech.replace(/^"(.+(?="$))"$/, "$1")}
                          ):
                        </span>{" "}
                        {vocab.definition.replace(/^"(.+(?="$))"$/, "$1")}
                      </Typography>
                    </ListItemText>
                    <DeleteOutlineIcon
                      style={{ padding: "2px", color: "#40637E" }}
                      onClick={(e) => handleDeleteDictionary(vocab.word)}
                    />
                  </ListItem>
                ))}
              </Paper>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Favorites;
