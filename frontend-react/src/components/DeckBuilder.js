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
          console.log(id)
          console.log(returnedUsersCards)
          setCurrentUsersCards(returnedUsersCards);
        })
      }

    }, [userId])

    const gameplayCardSlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
   


    // for (let slot of gameplayCardSlots){
    //     gameplayCardsArray.push(<div className="gameplay-card-slot"key={slot}>Card {slot}</div>)
    // }

    // function generateGameplayDeck(e){
    //   <div className="gameplay-card-slot"key={slot}>Card {slot}</div>
    // }

    function addCardToGameplayDeck(e){
      console.log(e.target)
      gameplayCardsArray.push(e)
      // generateGameplayDeck()
    }

    // for (let slot of allOwnedCardSlots){
    //     allOwnedCardsArray.push(<div className="owned-card-slot"key={slot}>Card {slot}</div>)
    // }

    return ( currentUsersCards ? 
      <div>
        <div className="builder-container">
            <Link className="home-link" to="/home" state={{userId: userId}}>Back To Home</Link>
            <h1>Deck Builder</h1>
            <div className="gameplay-build">
               <h2 className="deck-title">Gameplay Deck</h2>
               <p className="deck-description">These are the cards that you will take with you into your next game. Click on one to move it back to your inventory deck.</p>
               <div className="gameplay-cards">
               {
                      gameplayCardsArray.map(card => (
                        <div className="owned-card-slot">
                          <p>Test</p>
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
                        <div className="owned-card-slot" key={card.card.card_id} onClick={(e) => addCardToGameplayDeck(e)}>
                          <p>{card.card.card_name}</p>
                          <p>{card.card.power}</p>
                        </div>
                      ))
                    }
               </div>
            </div>

            <button className="save-deck-btn">Save This Deck</button>

        </div>
        </div> : <div> Loading...</div>
    );
  }
  
  export default DeckBuilder;
  