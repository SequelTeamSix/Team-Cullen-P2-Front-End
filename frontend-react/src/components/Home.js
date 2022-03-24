import React from "react";
import '../css/Home.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import gift from "../images/gift.png";



export default function Home() {


    const location = useLocation();
    const { userId } = location.state;

    const [currentUser, setCurrentUser] = useState();
    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [currentUsersCards, setCurrentUsersCards] = useState();
    const [previewDisplay, setPreviewDisplay] = useState('none');
    const [giftDisplay, setGiftDisplay] = useState('block');


    useEffect(() => {
        getUserById(userId);
        getUsersCards(userId)
    
        function getUserById(id){
            let url = 'https://teamcullenwebapp2.azurewebsites.net/player/id/' + id;
            axios.get(url)
            .then(response => {
              let returnedUser = response.data;
              setCurrentUser(returnedUser);
            })
          }

        function getUsersCards(id){
            let url = 'https://teamcullenwebapp2.azurewebsites.net/ownedcards/player/' + id;
            axios.get(url)
            .then(response => {
            let returnedUsersCards = response.data;
            setCurrentUsersCards(returnedUsersCards);
            })
        }
        }, [userId])


            function triggerCardPreview(){
            currentUser.has_logged_in = "true"
            console.log(currentUser)
            axios.put('https://teamcullenwebapp2.azurewebsites.net/player/update/' + userId, currentUser)
            .then(response => {
            let returnedPlayer = response.data;
            setCurrentUser(returnedPlayer)
            })
            setPreviewDisplay('flex')
            setGiftDisplay('none')
        }
        
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
        {console.log(currentUser)}
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

                    {currentUser.has_logged_in !== 'true' ? 
                    <div className="gift-div" onClick={() => triggerCardPreview()} style={{display: giftDisplay}}>
                        <img className="gift" src={gift} alt="gift box"></img>
                    </div> : ''
                    }
                    
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
                        Each player draws 5 cards at the start of the game. Each turn, both players
                    choose which card to play to the center at the same time. The cards fight each other
                    and the one with the higher power value wins. The winning player will then get +1 to their score
                    and both cards are discarded (regardless of whether they won or lost). Ties reward no score
                    to either player. Each player then draws a new card from their deck and they keep playing. 
                    First player to get a score of 10 wins.
                        </p>
                    </div>
                </div>
                
                <Leaderboard />
            
            </div>
        </div>
    </div> : <div className="loading-screen">
                    <div className="loading-overlay"></div>
                 <h1 className="loading">Loading...</h1>
                 </div>
    )
  }
  
  