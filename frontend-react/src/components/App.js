import '../css/App.css';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import Store from './Store';
import DeckBuilder from './DeckBuilder';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>

            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/deckbuilder" element={<DeckBuilder/>} />

          </Routes>
        </div>
      </div>
    </Router>
  
  );
}

export default App;
