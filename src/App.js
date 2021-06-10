import React, {useState, useEffect, useMemo} from 'react';
import Header from './components/Header'
import List from './components/List';
import get from './client';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [allVotes, setVotes] = useState(0);
  const [darkState, setDarkState] = useState(false);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkState ? 'dark' : 'light',
          primary: {
            main: darkState ? '#346751' : '#0f3460'
          },
          secondary: {
            main: darkState ? '#c84b31' : '#e94560'
          }
        },
      }),
    [darkState],
  );

  useEffect(() => {
      async function fetchQuotes() {
        let response = await get('quotes/10');
        setQuotes(response);
      }
  
      fetchQuotes()
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header totalCount={allVotes} darkState={darkState} onDarkStateChange={()=>setDarkState(!darkState)}/>
        <List items={quotes} onVoteChange={() => setVotes(allVotes + 1)}></List>
      </div>
    </ThemeProvider>
  );
}

export default App;
