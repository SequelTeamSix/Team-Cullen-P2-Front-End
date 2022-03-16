import '../css/App.css';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import Store from './Store';
import DeckBuilder from './DeckBuilder';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/game">
              <Game />
            </Route>

            <Route path="/store">
              <Store />
            </Route>

            <Route path="/deckbuilder">
              <DeckBuilder />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  
  );
}

export default App;
