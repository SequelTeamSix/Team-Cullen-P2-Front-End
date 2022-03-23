import React, { useEffect, Fragment } from "react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Game.css';
import axios from 'axios';
import _ from 'lodash';


function Game() {

    const location = useLocation();
    const { userId } = location.state;

    const [currentUser, setCurrentUser] = useState();
    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [winDisplay, setWinDisplay] = useState('none');
    const [loseDisplay, setLoseDisplay] = useState('none');
   
    const [fiveDisplayedCards, setFiveDisplayedCards] = useState([]);
    const [playerCardInPlay, setPlayerCardInPlay] = useState([]);
    const [ComputerCardInPlay, setComputerCardInPlay] = useState([]);
    const [allCardsForComputer, setAllCardsForComputer] = useState([])
    const [computerScore, setComputerScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    // const [randomizedDeck, setRandomizedDeck] = useState();

    let allPossibleCards = []
    let playersRandomizedDeck = [];
    let fiveCards =[];
   
    useEffect(() => {
        let currentUserUrl = 'http://localhost:8000/player/id/' + userId;
        axios.get(currentUserUrl)
        .then(response => { 
          let userObj = response.data;
          setCurrentUser(userObj)
        })

        let playerDeckUrl = 'http://localhost:8000/deck/player/' + userId;
        axios.get(playerDeckUrl)
        .then(response => { 
          let playerDeck = response.data;
          randomizeDeck(playerDeck)
        })

        let computerDeckUrl = 'http://localhost:8000/card';
        axios.get(computerDeckUrl)
        .then(response => { 
          let allCards = response.data;
          allCards.map(card => (
            allPossibleCards.push(card)
          )) 
          setAllCardsForComputer(allPossibleCards)
        })  
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
          drawCard(5)
        }, 1500);
        return () => clearTimeout(timer);
      }, []);

        function randomizeDeck(cards) {
            playersRandomizedDeck = cards.sort(() => Math.random() - 0.5)
            }
      

      function drawCard(amount){
        for(let i = 0; i < amount; i++){
          let newCard = playersRandomizedDeck.pop();
          fiveCards.push(newCard)
        }
        console.log(playersRandomizedDeck)
        setFiveDisplayedCards(fiveCards)
    }

    function playCard(e){   
        let randomIndex = Math.floor(Math.random() * 80)
        let computerPower = allCardsForComputer[randomIndex].power;
        let playerPower = e.target.getElementsByClassName('play-card-power')[0].innerHTML;
        let characterName = e.target.getElementsByClassName('play-card-title')[0].innerHTML;
        let imageUrl = e.target.lastElementChild.innerHTML;
        let uniqueId = e.target.getAttribute("data-key")
        console.log(playersRandomizedDeck)
      
        let playerCard = (
            <Fragment>
               <div className="card-in-play" data-key={uniqueId} key={Math.random()} style={{backgroundImage: `url(${imageUrl})`}}>
                    <div className="play-card-banner">
                        <p className="play-card-title">{characterName}</p>
                    </div>
                <p className="play-card-power">{playerPower}</p>
                </div>
            </Fragment>
          )
        setPlayerCardInPlay(playerCard)

        let computerCard = (
            <Fragment>
               <div className="card-in-play" key={Math.random()} style={{backgroundImage: `url(${allCardsForComputer[randomIndex].image_url})`}}>
                    <div className="play-card-banner">
                        <p className="play-card-title">{allCardsForComputer[randomIndex].card_name}</p>
                    </div>
                <p className="play-card-power">{allCardsForComputer[randomIndex].power}</p>
                </div>
            </Fragment>
          )
        setComputerCardInPlay(computerCard)
        compareCards(computerPower, playerPower);
        // removeCardFrom5(uniqueId)
    }

    function compareCards(computerPower, playerPower){
        if(computerPower > playerPower){
            document.getElementById('computer-card-in-play').classList.add('winning-card');
            setComputerScore(computerScore + 1)
        } else if (playerPower > computerPower){
            document.getElementById('player-card-in-play').classList.add('winning-card')
            setPlayerScore(playerScore + 1)
        } else {
            //They're equal, power tie animation?
        }
        setTimeout(function(){
            document.getElementById('computer-card-in-play').classList.remove('winning-card')
            document.getElementById('player-card-in-play').classList.remove('winning-card')
        }, 1000);
        checkForWin()
    }

    function checkForWin(){
        //Add Win To Database
        if(playerScore >= 9){
            setWinDisplay('flex')
            currentUser.wins += 1;
            currentUser.points += 15;
            axios.put('http://localhost:8000/player/update/' + userId, currentUser)
            .then(response => {
                let updatedResponseObj = response.data;
                console.log(updatedResponseObj)
                setCurrentUser(updatedResponseObj)
              })
            //Add Loss To Database
        } else if (computerScore >= 9) {
            setLoseDisplay('flex')
             currentUser.loses += 1;
             currentUser.points += 5;
             axios.put('http://localhost:8000/player/update/' + userId, currentUser)
             .then(response => {
               let updatedResponseObj = response.data;
               setCurrentUser(updatedResponseObj)
             })
        } else {
            return
        }
    }

    function removeCardFrom5(id){
     let indexToRemove;
     let fiveCards = Array.from(document.getElementsByClassName('card'));
        console.log(fiveCards)
        fiveCards.map(card => {
            
            let attribute = card.getAttribute('data-key');
            console.log(attribute)
            console.log('id: ' + id)
            if(attribute == id){
                let cardWeNeed;
                let dataId = card.getAttribute('data-id')

              for(let i = 0; i < allCardsForComputer.length; i++){
                  if(allCardsForComputer[i].card_id == dataId){
                      cardWeNeed = allCardsForComputer[i]
                  }
              }
                console.log(cardWeNeed)

                for(let j = 0; j < fiveDisplayedCards.length; j++){
                    console.log(fiveDisplayedCards[j].card)
                    if(JSON.stringify(fiveDisplayedCards[j].card) === JSON.stringify(cardWeNeed)){
                        indexToRemove = j
                        console.log(indexToRemove)
                    }
                }
            }
            console.log(playersRandomizedDeck)
            let poppedCard = playersRandomizedDeck.pop()
            console.log(poppedCard)

            let poppedCardFragment = (
                <Fragment>
                      <div 
                            className="card" 
                            onClick={(e)=>playCard(e)} 
                            key={Math.random()} 
                            style={{backgroundImage: `url(${poppedCard.image_url})`}}
                            data-key={Math.random()}
                            data-id={poppedCard.card_id}
                            >
                                <div className="play-card-banner">
                                 <p className="play-card-title">{poppedCard.card_name}</p>
                                </div>
                            <p className="play-card-power">{poppedCard.power}</p>
                            <p className="hidden-image-url">{poppedCard.image_url}</p>
                            </div>
                </Fragment>
              )
            fiveDisplayedCards[indexToRemove] = poppedCardFragment;
        })

        //Add another card from Player Deck
        // setFiveDisplayedCards(fiveCards)
    }

    function startNewGame(){
        setWinDisplay('none')
        setLoseDisplay('none')
        console.log("New Game Started")
    }
      
    function openRulesPopup(){
        setRulesDisplay('block')
      }

      function closeRulesPopup(){
        setRulesDisplay('none')
      }

return ( fiveDisplayedCards && currentUser ? 
      <div>
          <div className="main-game-div">
              <div className="main-overlay"></div>
            <div className="toggle-container">
                <div className="rules-toggle" onClick={openRulesPopup}>
                    <p>Rules</p>
                </div>
                <Link className="quit-btn" to="/home" state={{userId: userId}}>Quit</Link>
            </div>

            {/* Rules Popup */}
            <div className="rules-outer-div" style={{display: rulesDisplay}}>
                <div className="rules-inner-div">
                    <span className="close-btn" onClick={closeRulesPopup}>X</span>
                    <h2 className="rules-header">Rules</h2>
                    <p className="rules-paragraph">
                    Each player draws 5 cards at the start of the game. Each turn, both players
                    choose which card to play to the center at the same time. The cards fight each other
                    and the one with the higher power value wins. The winning player will then get +1 to their score
                    and both cards are discarded (regardless of whether they won or lost). Ties reward no score
                    to either player. Each player then draws a newcard from their deck and they keep playing. 
                    First player to get a score of 10 wins. 
                    </p>
                </div>
            </div>
           
            <div className="game-container">
                <div className="computer-field">
                    <div className="five-cards-div">
                        <div className="deck-container">
                            <div className="card" id="computer-deck"></div>
                            <div className="card undercard1"></div>
                            <div className="card undercard2"></div>
                        </div>
                        
                        <div className="card computer-card"></div>
                        <div className="card computer-card"></div>
                        <div className="card computer-card"></div>
                        <div className="card computer-card"></div>
                        <div className="card computer-card"></div>

                    </div>
                </div>

                <div className="dueling-field">
                    <div id="computer-card-in-play" className="computer-card-in-play">
                        {ComputerCardInPlay}
                    </div>
                    <div id="player-card-in-play" className="player-card-in-play">
                        {playerCardInPlay}
                    </div>
                    <div className="scoring-container">
                        <p className="computer-score">Computer: {computerScore}</p>
                        <p className="player-score">Player: {playerScore}</p>
                    </div>
                </div>

                <div className="player-field">
                    <div className="five-cards-div">
                        {fiveDisplayedCards.map(card => (
                            <div 
                            className="card" 
                            
                            onClick={(e)=>playCard(e)} 
                            key={Math.random()} 
                            style={{backgroundImage: `url(${card.card.image_url})`}}
                            data-key={Math.random()}
                            data-id={card.card.card_id}
                            >
                                <div className="play-card-banner">
                                 <p className="play-card-title">{card.card.card_name}</p>
                                </div>
                            <p className="play-card-power">{card.card.power}</p>
                            <p className="hidden-image-url">{card.card.image_url}</p>
                            </div>
                        ))}
                        <div className="deck-container">
                            <div className="card" id="player-deck"></div>
                            <div className="card undercard1"></div>
                            <div className="card undercard2"></div>
                        </div>
                    </div>
                </div>
            </div>

             {/* End Game Popup */}
             <div className="end-game-outer-div" style={{display: winDisplay}}>
                <div className="win-game-inner-div">
                <div className="end-screen-overlay"></div>
                    <div className="end-screen-content">
                        <h3 className="end-screen-header">You Win!</h3>
                        <p className="end-screen-btn" onClick={()=>startNewGame()}>Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div>
            </div>

            <div className="end-game-outer-div" style={{display: loseDisplay}}>
                <div className="lose-game-inner-div" >
                    <div className="end-screen-overlay"></div>
                    <div className="end-screen-content win">
                        <h3 className="end-screen-header">You Lose!</h3>
                        <p className="end-screen-btn" onClick={()=>startNewGame()}>Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div>
            </div>

          </div>
    </div> : <div> Loading...</div>
      )}
  
  export default Game;
  