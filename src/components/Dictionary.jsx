import React, { useState, Component } from 'react';
import Axios from 'axios';


function Dictionary() {
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


  //Render
  return (
    <div className="apiContainer">
      <div className="tools">ClatLingo Tools</div>
      <div className="formContainer">
        <form onSubmit={handleSubmitVocab}>
          <label className="apiTextBox">
            <div>
              <input
                type="text"
                name="vocab"
                placeholder="Vocabulary Word"
                value={vocab}
                onChange={handleVocab}
              ></input>
              <button>Define</button>
            </div>
          </label>
          <div className="defContainer">
            <p>Definition</p>
            <div className="definition">{definition}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dictionary;
