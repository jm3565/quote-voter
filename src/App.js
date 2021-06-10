import React, {useState, useEffect, useMemo} from 'react';
import Header from './components/Header'
import List from './components/List';
import get from './client';
import useSessionStorage from './use-session-storage';
import './styles/app.css';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const [quotes, setQuotes] = useState([]);
  const [allVotes, setVotes] = useSessionStorage('total-count', '0');
  const [darkState, setDarkState] = useState(false);
  const [numQuotes, setNumQuotes] = useState(10);
  const classes = useStyles();

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
        let response = await get(`quotes/${numQuotes}`);
        setQuotes(response);
      }
  
      fetchQuotes()
    }, [numQuotes]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header totalCount={allVotes} darkState={darkState} onDarkStateChange={()=>setDarkState(!darkState)}/>
        <div className="controls-container">
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="num-quotes-select">Num Quotes</InputLabel>
            <Select
              native
              value={numQuotes}
              onChange={(event) => setNumQuotes(event.target.value)}
              label="Num Quotes"
              inputProps={{
                name: 'num-quotes',
                id: 'num-quotes-select',
              }}
            >
              <option value={''}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Select>
          </FormControl>
        </div>
        <List items={quotes} onVoteChange={() => setVotes(`${parseInt(allVotes, 10) + 1}`)}></List>
      </div>
    </ThemeProvider>
  );
}

export default App;
