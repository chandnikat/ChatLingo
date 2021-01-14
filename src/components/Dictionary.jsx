import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Grid, Divider, Typography, List, ListItem } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  dictionarySection: {
    width: '100%',
    height: '83vh',
  },

  titleBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  word: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingTop: "18px"
  },
  partOfSpeech: {
    color: '#3caea3',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingTop: "7px",
    paddingBottom: "7px"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));



const Dictionary = ({ name, room }) => {
  const classes = useStyles();
  const [vocab, setVocab] = useState('');
  const [search, setSearch] = useState('');
  const [definition, setDefinition] = useState(null);
  const [partOfSpeech, setPartOfSpeech] = useState(null)
  let [word, setWord] = useState('');

  //Capitalizes word:
  word = word.toLowerCase().replace(/\b\w{3,}/g, function (l) {
    return l.charAt(0).toUpperCase() + l.slice(1);
  });

  // React Hooks Functions
  const handleVocab = (e) => {
    setVocab(e.target.value);
    setSearch(e.target.value.replace(/ /gi, '%20'));
  };


  // API Functionality
  const handleSubmitVocab = async (e) => {
    e.preventDefault(); //Prevents hot reload upon submit
    //add token
    let token = localStorage.getItem('currentUser');
    console.log('token', token);

    const currSearch = e.target[0].value;
    const body = { vocab: currSearch };
    try {
      console.log('Logged try block for post request');
      //add authorization header
      const response = await Axios.post('/dictionary',
        body, {
        headers: {
          'Content-Type': 'Application/JSON', 'Authorization': `${token}`,
        }
      });
      const definition = JSON.stringify(response.data.definition);
      const partOfSpeech = JSON.stringify(response.data.partOfSpeech);
      setPartOfSpeech(partOfSpeech)
      setDefinition(definition);
      setWord(currSearch);
      setVocab("")
    } catch (err) {
      console.log(`Catch block, POST error on /dictionary: ${err}`);
    }


  };

  return (
    <div>
      <Grid container component={Paper} className={classes.dictionarySection}>
        <Grid item xs={12} >
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
                <Button fullWidth
                  variant="contained"
                  color="primary" style={{ fontWeight: '700' }} type="submit">Define</Button>
                <Typography className={classes.word}>{word}</Typography>
                <Typography className={classes.partOfSpeech}>{partOfSpeech}</Typography>
                <Typography>{definition}</Typography>

              </form>

            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );

};
export default Dictionary;

