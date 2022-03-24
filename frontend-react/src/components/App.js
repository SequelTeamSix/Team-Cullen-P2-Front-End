import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/App.css';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import Store from './Store';
import DeckBuilder from './DeckBuilder';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const ThemeContext = React.createContext();

function App() {

  const [allUsers, setAllUsers] = useState();

  //Get all the saved players from the database and store them
  useEffect(() => {
    getAllUsers();
 }, [])

   function getAllUsers(){
     axios.get('https://teamcullenwebapp2.azurewebsites.net/player')
     .then(response => {
       let returnedUsers = response.data;
       setAllUsers(returnedUsers);
     })
   }

  return (
    <ThemeContext.Provider value={allUsers}>   
    <Router>
      <div className="App"> 
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/store" element={<Store/>} />
            <Route path="/deckbuilder" element={<DeckBuilder/>} />
          </Routes>
      </div>
    </Router>
    </ThemeContext.Provider>
  );
}

export default App;
