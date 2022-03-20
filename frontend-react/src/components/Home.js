import React from "react";
import '../css/Home.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { ThemeContext } from "./App";
import Leaderboard from "./Leaderboard";

export default function Home() {

    const location = useLocation();
    const { userId } = location.state;
    
    const [currentUser, setCurrentUser] = useState();
    const [rulesDisplay, setRulesDisplay] = useState('none')

    useEffect(() => {
        console.log(userId)
        getUserById(userId);

        function getUserById(id){
            let url = 'http://localhost:8000/player/id/' + id;
            console.log(url)
            axios.get(url)
            .then(response => {
              let returnedUser = response.data;
              console.log(returnedUser)
              setCurrentUser(returnedUser);
            })
          }
    }, [userId])

    function openRulesPopup(){
        setRulesDisplay('block')
      }

      function closeRulesPopup(){
        setRulesDisplay('none')
      }


return ( currentUser ? 
    <div>
        <div className="main-page-bg">
        <div className="main-page-overlay"></div>
            <div className="home-container">
                <Link className="login-link" to="/">Return to Login</Link>
                <div id="current-user-info">
                    <p className="info current-user-name">Welcome, {currentUser.username}</p>
                    <p className="info current-points">Points: {currentUser.points}</p>
                    <p className="info current-wins">Wins: {currentUser.wins}</p>
                    <p className="info current-loses">Losses: {currentUser.loses}</p>
                    <p className="info current-cards">Cards: </p>
                </div>
                <h1 className="main-title">Superhero Card Duel</h1>
                <div className="menu">
                    <Link className="menu-link" to="/game" state={{userId:currentUser.player_id}}>Play Game</Link>
                    <Link className="menu-link" to="/store" state={{userId:currentUser.player_id}}>Visit Store</Link>
                    <Link className="menu-link" to="/deckbuilder" state={{userId:currentUser.player_id}}>My Deck Builder</Link>
                    <p className="menu-link" onClick={() => openRulesPopup()}>Read Rules</p>
                </div>

                <div className="rules-outer-div" style={{display: rulesDisplay}}>
                    <div className="rules-inner-div">
                        <span className="close-btn" onClick={() => closeRulesPopup()}>X</span>
                        <h2 className="rules-header">Rules</h2>
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
                
                <Leaderboard />
            
            </div>
        </div>
    </div> : <div> Loading...</div>
    )
  }
  
  