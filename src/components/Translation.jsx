import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, TextField, Button, Grid, Divider, Typography, List, ListItem} from '@material-ui/core';


const useStyles = makeStyles(theme =>({
dictionarySection: {
    width: '100%',
    height: '83vh',
  },

  titleBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  definition: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingTop: "17px"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));



const Translation = () => {
  const classes = useStyles();
   

  return (
    <div>
      <Grid container component={Paper} className={classes.dictionarySection}>
        <Grid item xs={12} >
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Translation</Typography>
            </ListItem>
            <Divider />
            <ListItem style={{paddingTop: "20px"}} alignItems="center">
       
            {/* <form className={classes.form} onSubmit={handleSubmitVocab}>

          
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
          
          <Typography className={classes.definition}>{word}</Typography>
            <Typography>{definition}</Typography>
       
        </form> */}

            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );

};
export default Translation;

