import React, { useEffect, Template, Fragment } from "react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Game.css';
import axios from 'axios';

function Game() {

    const location = useLocation();
    const { userId } = location.state;

    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [endDisplay, setEndDisplay] = useState('none');
   
    const [fiveDisplayedCards, setFiveDisplayedCards] = useState([]);
    const [playerCardInPlay, setPlayerCardInPlay] = useState([]);
    const [ComputerCardInPlay, setComputerCardInPlay] = useState([]);

    let allCardsForComputer = [];
    let playersRandomizedDeck = [];
    let fiveCards =[];
   
    useEffect(() => {
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
            allCardsForComputer.push(card)
          )) 
          
        })

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
          drawCard(5)
          console.log(allCardsForComputer)
        }, 1500);
        return () => clearTimeout(timer);
      }, []);


    function randomizeDeck(cards){
        for(let i = 0; i < cards.length; i++){
            let randomIndex = Math.floor(Math.random() * cards.length);
            playersRandomizedDeck.push(cards[randomIndex]);
        }
      }

      function drawCard(amount){
        for(let i = 0; i < amount; i++){
          let newCard = playersRandomizedDeck[i];
          fiveCards.push(newCard)
          playersRandomizedDeck.splice(i, 1)
        }
        setFiveDisplayedCards(fiveCards)
    }

    function playCard(e){
        console.log(e.target)
        let playerCard = (
            <Fragment>
               <div className="card-in-play" key={Math.random()} style={{backgroundImage: `url(${e.target.lastElementChild.innerHTML})`}}>
                    <div className="play-card-banner">
                        <p className="play-card-title">{e.target.firstElementChild.firstElementChild.innerHTML}</p>
                    </div>
                <p className="play-card-power">{e.target.getElementsByClassName('play-card-power')[0].innerHTML}</p>
                </div>
            </Fragment>
          )
        setPlayerCardInPlay(playerCard)

        let randomIndex = Math.floor(Math.random() * allCardsForComputer.length)
        let computerCard = (
            <Fragment>
               <div className="card-in-play" key={Math.random()} style={{backgroundImage: `url(${allCardsForComputer[randomIndex]})`}}>
                    <div className="play-card-banner">
                        <p className="play-card-title">{e.target.firstElementChild.firstElementChild.innerHTML}</p>
                    </div>
                <p className="play-card-power">{e.target.getElementsByClassName('play-card-power')[0].innerHTML}</p>
                </div>
            </Fragment>
          )
        setComputerCardInPlay(computerCard)
    }
      
    function openRulesPopup(){
        setRulesDisplay('block')
      }

      function closeRulesPopup(){
        setRulesDisplay('none')
      }

      function openEndPopup(){
        setEndDisplay('block')
      }

      function closeEndPopup(){
        setEndDisplay('none')
      }
    
return ( fiveDisplayedCards && fiveCards ? 
      <div>
          <div className="main-game-div">
              <div className="main-overlay"></div>
            <div className="toggle-container">
                <div className="rules-toggle" onClick={openRulesPopup}>
                    <p>Rules</p>
                </div>
                <Link className="quit-btn" to="/home" state={{userId: userId}}>Quit</Link>
                <p className="test-p"onClick={openEndPopup}>Test End Screen</p>
            </div>

            {/* Rules Popup */}
            <div className="rules-outer-div" style={{display: rulesDisplay}}>
                <div className="rules-inner-div">
                    <span className="close-btn" onClick={closeRulesPopup}>X</span>
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
            </div>{/* End Game Popup */}
            <div className="end-game-outer-div" style={{display: endDisplay}}>
                <div className="win-game-inner-div">
                <div className="end-screen-overlay"></div>
                    <span className="close-btn" onClick={closeEndPopup}>X</span>
                    <div className="end-screen-content">
                        <h3 className="end-screen-header">You Win!</h3>
                        <p className="end-screen-btn">Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div>

                <div className="lose-game-inner-div">
                    <div className="end-screen-overlay"></div>
                    <span className="close-btn" onClick={closeEndPopup}>X</span>
                    <div className="end-screen-content win">
                        <h3 className="end-screen-header">You Lose!</h3>
                        <p className="end-screen-btn">Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
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
                    <div className="computer-card-in-play">
                        {ComputerCardInPlay}
                    </div>
                    <div className="player-card-in-play">
                        {playerCardInPlay}
                    </div>
                    <div className="scoring-container">
                        <p className="computer-score">Computer: 3</p>
                        <p className="player-score">Player: 5</p>
                    </div>
                </div>

                <div className="player-field">
                    <div className="five-cards-div">
                        {fiveDisplayedCards.map(card => (
                            <div className="card" onClick={(e)=>playCard(e)} key={Math.random()} style={{backgroundImage: `url(${card.card.image_url})`}}>
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

          </div>
    </div> : <div> Loading...</div>
      )}
  
  export default Game;
  