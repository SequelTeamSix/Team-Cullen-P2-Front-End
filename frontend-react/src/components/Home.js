import React from "react";
import '../css/Home.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import Leaderboard from "./Leaderboard";

export default function Home() {

    const location = useLocation();
    const { userId } = location.state;

    const [currentUser, setCurrentUser] = useState();
    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [currentUsersCards, setCurrentUsersCards] = useState();
    const [previewDisplay, setPreviewDisplay] = useState('flex');

    // if(currentUser.wins === 0 && currentUser.loses === 0){
    //     setPreviewDisplay('flex')
    // }

    useEffect(() => {
        getUserById(userId);
        getUsersCards(userId)
    
        function getUserById(id){
            let url = 'http://localhost:8000/player/id/' + id;
            axios.get(url)
            .then(response => {
              let returnedUser = response.data;
              setCurrentUser(returnedUser);
            })
          }

        function getUsersCards(id){
            let url = 'http://localhost:8000/ownedcards/player/' + id;
            axios.get(url)
            .then(response => {
            let returnedUsersCards = response.data;
            setCurrentUsersCards(returnedUsersCards);
            })
        }
        }, [userId])

 
      function openRulesPopup(){
        setRulesDisplay('block')
      }

      function closeRulesPopup(){
        setRulesDisplay('none')
      }

      function closePreviewPopup(){
        setPreviewDisplay('none')
      }
      
      

return ( currentUser && currentUsersCards ? 
    
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
                    <p className="info current-cards">Cards: {currentUsersCards.length} of 80</p>
                </div>
                <h1 className="main-title">Superhero Card Duel</h1>
                <div className="menu">
                    <Link className="menu-link" to="/game" state={{userId:currentUser.player_id}}>Play Game</Link>
                    <Link className="menu-link" to="/store" state={{userId:currentUser.player_id}}>Visit Store</Link>
                    <Link className="menu-link" to="/deckbuilder" state={{userId:currentUser.player_id}}>My Deck Builder</Link>
                    <p className="menu-link" onClick={() => openRulesPopup()}>Read Rules</p>
                </div>

                <div className="new-deck-outer" style={{display: previewDisplay}}>
                <div className="new-deck-preview" >
                    <h2 className="preview-heading">Welcome to the Fight!</h2>
                    <p className="preview-paragraph">Here's a starting deck of 20 cards. The power level of each character is 
                        indicated on the top right. More cards can be purchased as you earn points. 
                        Try to collect them all!</p>
                    <span className="close-btn" onClick={() => closePreviewPopup()}>X</span>
                    <div className="new-cards-grid">
                    {
                        currentUsersCards.map(arrayOfCards => (
                            <div className="preview-card" key={arrayOfCards.set_id} style={{backgroundImage: `url(${arrayOfCards.card.image_url})`}}>
                               <div className="preview-card-banner">
                                <p className="preview-card-title">{arrayOfCards.card.card_name}</p>
                               </div>
                               <p className="preview-card-power">{arrayOfCards.card.power}</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
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
  
  