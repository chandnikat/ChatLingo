import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, TextField, ListItemIcon, ListItemText, Button, Grid, Divider, Typography, List, ListItem} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useInputState from './useInputState';

const useStyles = makeStyles(theme =>({
translateSection: {
    width: '100%',
    height: '83vh',
  },

  titleBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  translate: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingTop: "17px"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
  },

}));



const Translation = () => {
  const classes = useStyles();
  let [search, handleSearch] = useInputState("")
  const [sourceLang, handleSourceLang] = useInputState("")
  const [targetLang, handleTargetLang] = useInputState("")
  const [translation, setTranslation] = useState(null)
   
  search = search.toLowerCase()

const handleSubmitTranslation = async (e) => {
  e.preventDefault();

  const body = {search, sourceLang, targetLang}
  console.log("TRANSLATION BODY", body)
  try {
    const response = await Axios.post('/translate', {
      header: { 'Content-Type': 'Application/JSON' },
      body: body,
    });
    const data = JSON.stringify(response.data)
   console.log("RESPONSE TRANSLATION", data)
 
    handlePhrase("")
  } catch (err) {
    console.log(`Catch block, POST error on /translate: ${err}`);
  }
 

}
  return (
    <div>
      <Grid container component={Paper} className={classes.translateSection}>
        <Grid item xs={12} >
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Translation</Typography>
            </ListItem>
            <Divider />
            <ListItem style={{paddingTop: "20px"}} alignItems="center">
            <form className={classes.form} onSubmit={handleSubmitTranslation}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="translation"
              label="Word/Phrase"
              name="translation"
              autoFocus
              value={search}
              onChange={handleSearch}
            />
          
          <ListItem>

      
          <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel >Source</InputLabel>
            <Select
              native
              value={sourceLang}
              onChange={handleSourceLang}
              fullWidth
              label="from"    
            >
              <option aria-label="None" value="" />
              <option value={"en"}>English</option>
              <option value={"es"}>Spanish</option>
              <option value={"fr"}>French</option>
              <option value={"de"}>German</option>
            </Select>
            </FormControl>
            <Typography style={{color: '#40637E', fontWeight: "bold"}}>To</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel >Target</InputLabel>
            <Select
              native
              value={targetLang}
              onChange={handleTargetLang}
              fullWidth
              label="from"   
            >
              <option aria-label="None" value="" />
              <option value={"en"}>English</option>
              <option value={"es"}>Spanish</option>
              <option value={"fr"}>French</option>
              <option value={"de"}>German</option>
            </Select>
            </FormControl>
            </ListItem>
            <Button fullWidth
                  variant="contained"
                  color="primary" style={{ fontWeight: '700' }} type="submit">Translate</Button>
        </form> 

            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );

};
export default Translation;

