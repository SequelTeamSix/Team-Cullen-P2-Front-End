import '../css/App.css';
import Login from './Login';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div class="content">
          <Switch>

            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  
  );
}

export default App;
