import React, { useEffect, useState, Fragment } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../css/DeckBuilder.css';

function DeckBuilder() {
    const location = useLocation();
    const { userId } = location.state;
    const [currentUsersCards, setCurrentUsersCards] = useState();
    const [gameplaySlotsArray, setGameplaySlotsArray] = useState();
    const [availableSlots, setAvailableSlots] = useState(20);
    const [nextInsertIndex, setNextInsertIndex] = useState(0)

    var gameplaySlots = [];

    for(let i = 0; i < 20; i++){
        gameplaySlots.push(<div className="gameplay-card-slot" key={i}><p>Choose a Card</p></div>)
    }

    useEffect(() => {
      getUsersCards(userId);      
      setGameplaySlotsArray(gameplaySlots)
      console.log(gameplaySlots)


      function getUsersCards(id){
        let url = 'http://localhost:8000/ownedcards/player/' + id;
        axios.get(url)
        .then(response => {
          let returnedUsersCards = response.data;
          setCurrentUsersCards(returnedUsersCards);
        })
      }
    }, [userId])

   
    function addCardToGameplayDeck(e){
      let power = e.target.getElementsByClassName('owned-card-power')[0].innerHTML;
      let name = e.target.getElementsByClassName('owned-card-title')[0].innerHTML;
      let imageUrl = e.target.lastElementChild.innerHTML;
      let card = (
        <Fragment>
           <div className="deck-card" onClick={() => removeCard()} key={Math.random()} style={{backgroundImage: `url(${imageUrl})`}}>
                <div className="deck-card-banner">
                    <p className="deck-card-title">{name}</p>
                </div>
            <p className="deck-card-power">{power}</p>
            </div>
        </Fragment>
      )
    
    if(availableSlots > 0){
      gameplaySlotsArray[nextInsertIndex] = card;
      setNextInsertIndex(nextInsertIndex + 1)
      setAvailableSlots(availableSlots - 1)
    } else {
      alert("Sorry, your gameplay deck is full!")
    }
    }

    function removeCard(){
      let slot = (
        <Fragment>
          <div className="gameplay-card-slot"key={Math.random}><p>Choose a Card</p></div>
        </Fragment>
      )
      console.log('clicked')
      setNextInsertIndex(nextInsertIndex - 1)
      gameplaySlotsArray[nextInsertIndex] = slot;
      setAvailableSlots(availableSlots + 1)
      setNextInsertIndex(nextInsertIndex)
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
                {gameplaySlotsArray}
              </div>
            </div>
            <div className="all-cards-container">
               <h2 className="deck-title">All Owned Cards</h2>
               <p className="deck-description">These are all the cards you own. Click on one to move it to your gameplay deck.</p>
               <div className="all-cards">
                    {
                      currentUsersCards.map(card => (
                        <div className="owned-card-slot" key={Math.random()} style={{backgroundImage: `url(${card.card.image_url})`}} onClick={(e)=> addCardToGameplayDeck(e)}>
                            <div className="owned-card-banner">
                              <p className="owned-card-title">{card.card.card_name}</p>
                            </div>
                            <p className="owned-card-power">{card.card.power}</p>
                            <p className="hidden-image-url">{card.card.image_url}</p>
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
  