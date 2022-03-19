import React from "react";
import '../css/Home.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { ThemeContext } from "./App";



export default function Home() {
    const location = useLocation();
    const { userId } = location.state;
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        console.log(userId)
        getUserById(userId);

        function getUserById(id){
            let url = 'http://localhost:8000/player/id/'+id
            console.log(url)
            axios.get(url)
            .then(response => {
              let returnedUser = response.data;
              console.log(returnedUser)
              setCurrentUser(returnedUser);
            })
          }
     }, [])
    
       

    function openRulesPopup(){
        // setRulesDisplay('block')
      }

      function closeRulesPopup(){
        // setRulesDisplay('none')
      }


   
return (
    <div>
        <div className="main-page">
        <p className="current-user">Welcome, {currentUser.username}</p>
        <Link to="/">Go To Login</Link>
            <div className="container">
                <h3 className="main-title">Superhero Card Duel</h3>
                <div className="menu">
                    <Link className="menu-link" to="/game">Play Game</Link>
                    <Link className="menu-link" to="/store">Visit Store</Link>
                    <Link className="menu-link" to="/deckbuilder">My Deck Builder</Link>
                    <p className="menu-link" onClick={() => openRulesPopup()}>Read Rules</p>
                </div>

                <div className="rules-outer-div" style={{display: 'none'}}>
                    <div className="rules-inner-div">
                        <span className="close-btn" onClick={() => closeRulesPopup()}>X</span>
                        <p className="rules-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                        mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                <div className="leaderboard-div">
                    <h3>Leaderboard</h3>
                </div>
            </div>
        </div>
    </div>
    )
  }
  
  