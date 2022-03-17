import React from "react";
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/DeckBuilder.css';


function DeckBuilder() {

    const gameplayCardSlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const gameplayCardsArray = [];

    const allOwnedCardSlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const allOwnedCardsArray = [];

    for (let slot of gameplayCardSlots){
        gameplayCardsArray.push(<div className="gameplay-card-slot"key={slot}>Card {slot}</div>)
    }

    for (let slot of allOwnedCardSlots){
        allOwnedCardsArray.push(<div className="owned-card-slot"key={slot}>Card {slot}</div>)
    }

    return (
      <div>
        <div className="builder-container">
            <Link className="home-link" to="/home">Back To Home</Link>
            <h1>Deck Builder</h1>
            <div className="gameplay-build">
               <h2 className="deck-title">Gameplay Deck</h2>
               <p className="deck-description">These are the cards that you will take with you into your next game. Click on one to move it back to your inventory deck.</p>
               <div className="gameplay-cards">
                    {gameplayCardsArray}
               </div>
            </div>
            <div className="all-cards-container">
               <h2 className="deck-title">All Owned Cards</h2>
               <p className="deck-description">These are all the cards you own. Click on one to move it to your gameplay deck.</p>
               <div className="all-cards">
                    {allOwnedCardsArray}
               </div>
            </div>

            <button className="save-deck-btn">Save This Deck</button>

        </div>
      </div>
    );
  }
  
  export default DeckBuilder;
  