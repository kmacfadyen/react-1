import { useState } from 'react'

import './App.css'

type Synonym = { // States that all Synonyms will be assigned this type
  word: string;
  score: number;
};

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`https://api.datamuse.com/words?rel_syn=${word}`) // fetches unique words from api
      .then((response) => response.json()) 
      .then(setSynonyms);
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
      <li key={synonym.word}> {/** creates a key for each individual item recieved */}
        {synonym.word}
      </li>))}
    </ul> 

   </div>
  )
}

export default App
