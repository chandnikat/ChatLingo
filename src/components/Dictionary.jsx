import React, { useState, Component } from 'react';
import Axios from 'axios';
import Messages from './Messages';
import InputBox from './InputBox';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  table: {
    minWidth: 660,
  },
  chatSection: {
    width: '100%',
    height: '83vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '72vh',
    overflowY: 'auto',
  },
  roomBox: {
    color: '#40637E',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  avatar: {
    color: '#fff',
    backgroundColor: '#40637E',
  },
});

const Dictionary = ({ name, room }) => {
  const classes = useStyles();
   // React Hooks State (Updating state is async)
   const [vocab, setVocab] = useState('');
   const [search, setSearch] = useState('');
   const [definition, setDefinition] = useState(null);
 
 
   // React Hooks Functions
   const handleVocab = (e) => {
     setVocab(e.target.value);
     setSearch(e.target.value.replace(/ /gi, '%20'));
   };
 
 
   // API Functionality
   const handleSubmitVocab = async (e) => {
     e.preventDefault(); //Prevents hot reload upon submit
 
     const currSearch = e.target[0].value;
     const body = { vocab: currSearch};
     try {
       console.log('Logged try block for post request');
       const response = await Axios.post('/dictionary', {
         header: { 'Content-Type': 'Application/JSON' },
         body: body,
       });
       const newData = JSON.stringify(response.data.definition);
       console.log(`reponse: ${newData}`);
       // setDefinition(response.data);
       setDefinition(newData);
     } catch (err) {
       console.log(`Catch block, POST error on /dictionary: ${err}`);
     }
     handleHistory(currSearch);
     console.log('Form Submitted');
   };

  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12} className={classes.borderRight500}>
          <List>
            <ListItem button>
              <Typography className={classes.roomBox}>Dictionary</Typography>
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid container xs={12} direction="column">
          <Grid item>
    
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
//   return (
//     <div className="apiContainer">
//       <div className="tools">ClatLingo Tools</div>
//       <div className="formContainer">
//         <form onSubmit={handleSubmitVocab}>
//           <label className="apiTextBox">
//             <div>
//               <input
//                 type="text"
//                 name="vocab"
//                 placeholder="Vocabulary Word"
//                 value={vocab}
//                 onChange={handleVocab}
//               ></input>
//               <button>Define</button>
//             </div>
//           </label>
//           <div className="defContainer">
//             <p>Definition</p>
//             <div className="definition">{definition}</div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
};
export default Dictionary;

