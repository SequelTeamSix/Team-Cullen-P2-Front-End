import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../css/DeckBuilder.css';


function DeckBuilder() {
    const location = useLocation();
    const { userId } = location.state;
    const [currentUsersCards, setCurrentUsersCards] = useState();
    const [gameplayCardsArray, setGameplayCardsArray] = useState();

    useEffect(() => {
      getUsersCards(userId);      

      function getUsersCards(id){
        let url = 'http://localhost:8000/ownedcards/player/' + id;
        axios.get(url)
        .then(response => {
          let returnedUsersCards = response.data;
          setCurrentUsersCards(returnedUsersCards);
        })
      }

    }, [userId])

    const gameplayCardSlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
   
    function addCardToGameplayDeck(e){
      let card = e.target;
      // setGameplayCardsArray([...gameplayCardsArray, {card}])
      console.log(gameplayCardsArray)
    }

    return ( currentUsersCards ? 
      <div>
        <div className="builder-bg">
          <div className="builder-overlay"></div>
          <div className="padding">
        <div className="builder-container">
            <Link className="home-link" to="/home" state={{userId: userId}}>Back To Home</Link>
            <h1 className="builder-title">Deck Builder</h1>
            <div className="gameplay-build">
               <h2 className="deck-title">Gameplay Deck</h2>
               <p className="deck-description">These are the cards that you will take with you into your next game. Click on one to move it back to your inventory deck.</p>
               <div className="gameplay-cards">
               {
                      gameplayCardSlots.map(card => (
                        <div className="gameplay-card-slot" key={card}>
                          <p>Choose a Card</p>
                        </div>
                      ))
                    }
               </div>
            </div>
            <div className="all-cards-container">
               <h2 className="deck-title">All Owned Cards</h2>
               <p className="deck-description">These are all the cards you own. Click on one to move it to your gameplay deck.</p>
               <div className="all-cards">
                    {
                      currentUsersCards.map(card => (
                        <div className="owned-card-slot" key={card.set_id} style={{backgroundImage: `url(${card.card.image_url})`}} onClick={(e)=> addCardToGameplayDeck(e)}>
                            <div className="owned-card-banner">
                              <p className="owned-card-title">{card.card.card_name}</p>
                            </div>
                            <p className="owned-card-power">{card.card.power}</p>
                        </div>
                        
                      ))
                    }
               </div>
               </div>
            <button className="save-deck-btn">Save This Deck</button>
            </div>

            </div>
        </div>
        </div> : <div> Loading...</div>
    );
  }
  
  export default DeckBuilder;
  