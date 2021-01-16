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
  Alert,
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

const Dictionary = ({ name, room }) => {
  const classes = useStyles();
  const [vocab, setVocab] = useState("");
  const [definition, setDefinition] = useState(null);
  const [partOfSpeech, setPartOfSpeech] = useState(null);
  let [word, setWord] = useState("");
  // const [add, setAdd] = useState(false);



  //Capitalizes word:
  word = word.charAt(0).toUpperCase() + word.slice(1);

  // React Hooks Functions
  const handleVocab = (e) => {
    setVocab(e.target.value);
  };

  // API Functionality
  const handleSubmitVocab = async (e) => {
    e.preventDefault(); //Prevents hot reload upon submit
    //add token
    let token = localStorage.getItem(name);
    console.log("token", token);

    const currSearch = e.target[0].value;
    const body = { vocab: currSearch };
    try {
      console.log("Logged try block for post request");
      //add authorization header
      const response = await Axios.post("/dictionary", body, {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
      });
      const definition = JSON.stringify(response.data.definition);
      const partOfSpeech = JSON.stringify(response.data.partOfSpeech);
      setPartOfSpeech(partOfSpeech);
      setDefinition(definition);
      setWord(currSearch);
      setVocab("");
    } catch (err) {
      console.log(`Catch block, POST error on /dictionary: ${err}`);
    }
  };

  const handleSaveDictionary = async (e) => {
    let token = localStorage.getItem(name); 
    const body = { word, definition, partOfSpeech };
    try {
      console.log('INSIDE SAVE DEFINITION')
      let response = await Axios.post("/history/saveDefinition", body, {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
      });
      console.log('RESPONSE  ->  ', response.data);
      response = JSON.stringify(response.data);
    } catch (err) {
      console.log(`Catch block, POST error on /history/saveDefinition: ${err}`);
    }
  };



  return (
    <div>
      <Grid container component={Paper} className={classes.dictionarySection}>
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Dictionary</Typography>
            </ListItem>
            <Divider />

            <ListItem style={{ paddingTop: "20px" }} alignItems="center">
              <form className={classes.form} onSubmit={handleSubmitVocab}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="dictionary"
                  label="Vocabulary Word"
                  autoFocus
                  type="text"
                  name="vocab"
                  value={vocab}
                  onChange={handleVocab}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: "700" }}
                  type="submit"
                >
                  Define
                </Button>
                <Typography className={classes.word}>{word}</Typography>
                <Typography className={classes.partOfSpeech}>
                  {partOfSpeech}
                </Typography>
                <Typography>{definition}</Typography>
                {word ? (
                  <ListItem
                    style={{ justifyContent: "center", paddingTop: "7px" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ fontWeight: "700" }}
                      type="submit"
                      onClick={(e) => handleSaveDictionary()}
                    >
                      <StarIcon style={{ paddingRight: "5px" }} />
                      Favorite
                    </Button>
                  </ListItem>
                ) : null}
                {/* {add && (<Alert severity="success">Added!</Alert>)} */}
              </form>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Dictionary;
