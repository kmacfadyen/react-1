import { useState } from 'react'

import './App.css'

type Synonym = { // States that all Synonyms will be assigned this type
  word: string;
  score: number;
};

const BASE_URL =  import.meta.env.VITE_BASE_URL ?? `https://api.datamuse.com`; // process.env.BASE_URL ??

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const fetchSynonyms = (word: string) => {
    fetch(`${BASE_URL}/words?rel_syn=${word}`) // fetches unique words from api
      .then((response) => response.json()) 
      .then(setSynonyms);
  }

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSynonyms(word);
  }

  const handleSynonymClicked = (newWord: string) => {
    // e.preventDefault();
    setWord(newWord);
    fetchSynonyms(newWord);
  }

  return (
   <div className='App'>
    <form onSubmit={handleFetchSynonyms}>
      <label htmlFor='word-input'>Your word</label>
      <input 
        onChange={(e) => setWord(e.target.value)} 
        id='word-input'
        value={word}  
      ></input>
      <button>Submit</button>
    </form>

    <ul>
      {synonyms.map(synonym => (
      <li 
        onClick={() => handleSynonymClicked(synonym.word)}
        key={synonym.word}> {/** creates a key for each individual item recieved */}
        {synonym.word}
      </li>))}
    </ul> 

   </div>
  )
}

export default App
