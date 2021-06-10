import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import List from './components/List';
import get from './client';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [allVotes, setVotes] = useState(0);

  useEffect(() => {
      async function fetchQuotes() {
        let response = await get('quotes/10');
        setQuotes(response);
      }
  
      fetchQuotes()
    }, []);

  return (
    <div className="App">
      <Header totalCount={allVotes}/>
      <List items={quotes} onVoteChange={() => setVotes(allVotes + 1)}></List>
    </div>
  );
}

export default App;
