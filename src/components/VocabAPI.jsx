import React, { useState, Component } from 'react';
import Axios from 'axios';
import { Languages } from './language';

function VocabAPI() {
  // React Hooks State (Updating state is async)
  const [vocab, setVocab] = useState('');
  const [search, setSearch] = useState('');
  const [vocabHist, setVocabHist] = useState([]);
  const [definition, setDefinition] = useState(null);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('en');

  // React Hooks Functions
  const handleVocab = (e) => {
    setVocab(e.target.value);
    setSearch(e.target.value.replace(/ /gi, '%20'));
  };

  const handleSourceLang = (e) => {
    setSourceLang(e.target.value);
  };

  const handleTargetLang = (e) => {
    setTargetLang(e.target.value);
  };

  const handleLink = () => {
    let url = `https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${search}&op=translate`;
    if (!vocab == '' && definition !== 'Sorry, we cannot find this word') {
      window.open(url);
      handleHistory(vocab);
    }
  };

  // API Functionality
  const handleSubmitVocab = async (e) => {
    e.preventDefault(); //Prevents hot reload upon submit

    const currSearch = e.target[0].value;
    const body = { vocab: currSearch, sl: sourceLang, tl: targetLang };
    try {
      console.log('Logged try block for post request');
      const response = await Axios.post('/dictionary', {
        header: { 'Content-Type': 'Application/JSON' },
        body: body,
      });
      console.log(`reponse: ${response}`);
      setDefinition(response.data);
    } catch (err) {
      console.log(`Catch block, POST error on /dictionary: ${err}`);
    }
    handleHistory(currSearch);
    console.log('Form Submitted');
  };

  // Vocab History Functionality
  const handleHistory = (v) => {
    if (vocabHist.length <= 18) {
      setVocabHist([' ', v, ...vocabHist]);
    } else {
      const vocabHistCopy = vocabHist.slice(0, vocabHist.length - 2);
      setVocabHist([' ', v, ...vocabHistCopy]);
    }
  };

  //Render
  return (
    <div className="apiContainer">
      <div className="tools">Chationary Tools</div>
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
          <div className="langContainer">
            <p>
              <label htmlFor="sl">Translate from</label>
            </p>
            <select
              name="sl"
              id="sl"
              className="sl"
              value={sourceLang}
              onChange={handleSourceLang}
            >
              {Languages.map((language) => (
                <option key={`l-${language.langId}`} value={language.value}>
                  {language.language}
                </option>
              ))}
            </select>
            <p>
              <label htmlFor="tl">Translate to</label>
            </p>
            <select
              name="tl"
              id="tl"
              className="tl"
              value={targetLang}
              onChange={handleTargetLang}
            >
              {Languages.map((language) => (
                <option key={`l-${language.langId}`} value={language.value}>
                  {language.language}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="transContainer">
        <div className="translation">
          <button id="transBtn" onClick={handleLink}>
            Translate Vocab
          </button>
        </div>
      </div>
      <div className="vocabHistContainer">
        <p>Search History</p>
        <div className="vocabHist"> {vocabHist} </div>
      </div>
    </div>
  );
}

export default VocabAPI;
