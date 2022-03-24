import React, { useEffect, useState, Fragment } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../css/DeckBuilder.css';

function DeckBuilder() {
    const location = useLocation();
    const { userId } = location.state;
    const [innactiveDisplay, setInnactiveDisplay] = useState('none');
    const [currentUsersCards, setCurrentUsersCards] = useState();
    const [gameplaySlotsArray, setGameplaySlotsArray] = useState();
    const [availableSlots, setAvailableSlots] = useState(20);
    const [nextInsertIndex, setNextInsertIndex] = useState(0);
    const [deckCardIds, setDeckCardIds] = useState([]);
    const [saveButtonText, setSaveButtonText] = useState('Save This Deck')

    var gameplaySlots = [];
    var deckCardIdArray = []

    for(let i = 0; i < 20; i++){
        gameplaySlots.push(<div className="gameplay-card-slot" key={i}><p>Choose a Card</p></div>)
    }

    useEffect(() => {
      getUsersCards(userId);      
      setGameplaySlotsArray(gameplaySlots)

      function getUsersCards(id){
        let url = 'https://teamcullenwebapp2.azurewebsites.net/ownedcards/player/' + id;
        axios.get(url)
        .then(response => {
          let returnedUsersCards = response.data;
          setCurrentUsersCards(returnedUsersCards);
        })
      }
    }, [userId])

   
    function addCardToGameplayDeck(e){
      deckCardIds.map(id => (deckCardIdArray.push(id)))
      let id = e.target.getElementsByClassName('hidden-id')[0].innerHTML;
      deckCardIdArray.push(id)
      setDeckCardIds(deckCardIdArray)
      let power = e.target.getElementsByClassName('owned-card-power')[0].innerHTML;
      let name = e.target.getElementsByClassName('owned-card-title')[0].innerHTML;
      let imageUrl = e.target.getElementsByClassName('hidden-image-url')[0].innerHTML;
      toggleInnactiveOn(id)
      let card = (
        <Fragment>
           <div className="deck-card" onClick={() => removeCard(id)} key={Math.random()} style={{backgroundImage: `url(${imageUrl})`}}>
                <div className="deck-card-banner">
                    <p className="deck-card-title">{name}</p>
                </div>
            <p className="deck-card-power">{power}</p>
            </div>
        </Fragment>
      )
    
    if(availableSlots > 0){
      setInnactiveDisplay('block')
      gameplaySlotsArray[nextInsertIndex] = card;
      setNextInsertIndex(nextInsertIndex + 1)
      setAvailableSlots(availableSlots - 1)
    } else {
      alert("Sorry, your gameplay deck is full!")
    }
    }

    function removeCard(cardId){
      deckCardIds.map(id => (
        deckCardIdArray.push(id)
      ))
      let index = deckCardIdArray.indexOf(cardId)
      deckCardIdArray.splice(index, 1)
      setDeckCardIds(deckCardIdArray)
      let slot = (
        <Fragment>
          <div className="gameplay-card-slot"key={Math.random}><p>Choose a Card</p></div>
        </Fragment>
      )
      console.log('clicked')
      toggleInnactiveOff(cardId)
      setNextInsertIndex(nextInsertIndex - 1)
      gameplaySlotsArray[nextInsertIndex] = slot;
      setAvailableSlots(availableSlots + 1)
      setNextInsertIndex(nextInsertIndex)
    }

    function toggleInnactiveOn(cardId){
      //we need a card object
      let matchingCard = null;
      for(let i = 0; i<currentUsersCards.length;i++){
        if(currentUsersCards[i].card.card_id == cardId){
          matchingCard = currentUsersCards[i]
        }
      }
      
      let counter = 1;

      for(let i = 0; i < deckCardIds.length; i++){
        if(deckCardIds[i] == cardId){
          counter++
        }
      }

      if(counter == matchingCard.quantitiy){
        let cardToTarget = document.getElementById(cardId);
        let overlay = cardToTarget.lastElementChild;
        overlay.style.display = 'block'
      }
    }

    function toggleInnactiveOff(cardId){
      let cardToTarget = document.getElementById(cardId);
      let overlay = cardToTarget.lastElementChild;
      overlay.style.display = 'none'
    }

    async function saveDeckToDatabase(ids){

      setSaveButtonText('Deck Saved!')

      let playerDeck;
      let user;
      let returnedCard;

      let playerUrl = ('https://teamcullenwebapp2.azurewebsites.net/player/id/' + userId);
      await axios.get(playerUrl)
      .then(response => {
        user = response.data;
      })

      let url = ('https://teamcullenwebapp2.azurewebsites.net/deck/player/' + userId);
        await axios.get(url)
        .then(response => {
          playerDeck = response.data;
        })

        for(let i = 0; i < playerDeck.length; i++){
          let cardUrl = ('https://teamcullenwebapp2.azurewebsites.net/card/id/' + ids[i])
            await axios.get(cardUrl)
            .then(response => {
              returnedCard = response.data;
            })

            const finalPlayerDeck = {
              rel_id : playerDeck[i].rel_id,
              player : user ,
              card : returnedCard
           }

            await axios.put('https://teamcullenwebapp2.azurewebsites.net/deck/update/'+ playerDeck[i].rel_id  , finalPlayerDeck)
          
          }
      
    }

    return ( currentUsersCards ? 
      <div>
        <div className="builder-bg">
          <div className="builder-overlay"></div>
          <div className="padding">
        <div className="builder-container">
            <Link className="home-link" to="/home" state={{userId: userId}}>Back To Home</Link>
            <h1 className="builder-title">Deck Builder</h1>
        <div className="flex-container">
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
                         <div className="owned-card-slot" id={card.card.card_id} key={card.card.card_id} style={{backgroundImage: `url(${card.card.image_url})`}} onClick={(e)=> addCardToGameplayDeck(e)}>
                            <div className="owned-card-banner">
                              <p className="owned-card-title">{card.card.card_name}</p>
                            </div>
                            <p className="owned-card-power">{card.card.power}</p>
                            <p className="hidden-image-url">{card.card.image_url}</p>
                            <p className="hidden-id">{card.card.card_id}</p>
                            <div className="innactive-overlay"></div>
                        </div>
                      ))
                    }
               </div>
               </div>
            </div>
            <button className="save-deck-btn" onClick={()=> {saveDeckToDatabase(deckCardIds)}}>{saveButtonText}</button>

            </div>
            </div>
        </div>
        </div> : <div className="loading-screen">
                    <div className="loading-overlay"></div>
                 <h1 className="loading">Loading...</h1>
                 </div>
    );
  }
  
  export default DeckBuilder;
  