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
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function App() {
  const [quotes, setQuotes] = useState([]);
  const [allVotes, setVotes] = useSessionStorage('total-count', '0');
  const [darkState, setDarkState] = useState(false);
  const [numQuotes, setNumQuotes] = useState(10);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState(null);

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
      if(numQuotes > 0){
        let response = await get(`quotes/${numQuotes}`);
        setQuotes(response);
      }else{
        setQuotes([]);
      }
    }

    fetchQuotes()
  }, [numQuotes]);

  useEffect(() => {
    async function performSearch()  {
      if(searchTerm === null){
        return;
      } else if(typeof searchTerm === 'string' && searchTerm.length > 0){
        let response = await get(encodeURI(`quotes/search/${searchTerm}`));

        if(response !== undefined){
          setQuotes(response);
        }else{
          setQuotes([]);
        }
      } else {
        setNumQuotes(0);
      }
    }

    performSearch();
  }, [searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header totalCount={allVotes} darkState={darkState} onDarkStateChange={()=>setDarkState(!darkState)}/>
        <div className="controls-container">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="num-of-quotes">Num of quotes</InputLabel>
            <Select
              labelId="num-of-quotes"
              id="num-quotes-selector"
              value={numQuotes}
              onChange={(event) => setNumQuotes(event.target.value)}
              label="Num of quotes"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField id="searchbox" label="Search quote by term" type="search" variant="outlined" onChange={(event) => {setSearchTerm(event.target.value)}}/>
          </FormControl>
        </div>
        <List items={quotes} onVoteChange={() => setVotes(`${parseInt(allVotes, 10) + 1}`)}></List>
      </div>
    </ThemeProvider>
  );
}

export default App;
