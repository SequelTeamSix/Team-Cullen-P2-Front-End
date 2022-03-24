import React, { useEffect, Fragment, useCallback } from "react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Game.css';
import axios from 'axios';
import _ from 'lodash';
import pow from "../images/pow.png";



function Game() {

    const location = useLocation();
    const { userId } = location.state;

    const [currentUser, setCurrentUser] = useState();
    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [winDisplay, setWinDisplay] = useState('none');
    const [loseDisplay, setLoseDisplay] = useState('none');
    const [resetGame, setResetGame] = useState('false')
   
    const [fiveDisplayedCards, setFiveDisplayedCards] = useState([]);
    const [playerCardInPlay, setPlayerCardInPlay] = useState([]);
    const [ComputerCardInPlay, setComputerCardInPlay] = useState([]);
    const [allCardsForComputer, setAllCardsForComputer] = useState([])
    const [computerScore, setComputerScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [randomizedDeck, setRandomizedDeck] = useState([]);

    let allPossibleCards = []
    let playersRandomizedDeck = [];
    let fiveCards =[];
   
    useEffect(() => {
        fetchData()

        async function fetchData(){
            let currentUserUrl = 'https://teamcullenwebapp2.azurewebsites.net/player/id/' + userId;
            await axios.get(currentUserUrl)
            .then(response => { 
              let userObj = response.data;
              setCurrentUser(userObj)
            })
    
            let playerDeckUrl = 'https://teamcullenwebapp2.azurewebsites.net/deck/player/' + userId;
            await axios.get(playerDeckUrl)
            .then(response => { 
              let playerDeck = response.data;
              randomizeDeck(playerDeck)
            })
    
            let computerDeckUrl = 'https://teamcullenwebapp2.azurewebsites.net/card';
            await axios.get(computerDeckUrl)
            .then(response => { 
              let allCards = response.data;
              allCards.map(card => (
                allPossibleCards.push(card)
              )) 
              setAllCardsForComputer(allPossibleCards)
            }) 
        }
        
    }, [resetGame])

    useEffect(() => {
        const timer = setTimeout(() => {
          drawCardInitialCards(5)
        }, 1500);
        return () => clearTimeout(timer);
      }, []);
    
        

        function randomizeDeck(cards) {
            let randomizedArray = cards.sort(() => Math.random() - 0.5)
            for(let i = 0; i < randomizedArray.length; i++){
                setRandomizedDeck((randomizedDeck) => { return [randomizedArray[i], ...randomizedDeck];})
             }
            }
      
            function drawCardInitialCards(amount){
                setRandomizedDeck((randomizedDeck) => {
                    let deckArray = [...randomizedDeck];
                    for(let i = 0; i < amount; i++){
                        fiveCards[i] = deckArray[i]
                        deckArray.splice(deckArray[i], 1);
                    }
                    setRandomizedDeck(deckArray)
                    setFiveDisplayedCards(fiveCards)
            })
        }

        function drawCard(indexToReplace){
                let deckArray = randomizedDeck;
                if(deckArray.length > 0){
                    console.log(deckArray)
                    let fiveCards = fiveDisplayedCards;
                    fiveCards[indexToReplace] = deckArray[deckArray.length - 1]
                    console.log(deckArray[deckArray.length - 1])
                    deckArray.splice(deckArray.length - 1, 1);
                    setRandomizedDeck(deckArray)
                    setFiveDisplayedCards(fiveCards)
                }
                else if(playerScore > computerScore) {
                    setWinDisplay('flex')
                    currentUser.wins += 1;
                    currentUser.points += 15;
                    axios.put('https://teamcullenwebapp2.azurewebsites.net/player/update/' + userId, currentUser)
                    .then(response => {
                        let updatedResponseObj = response.data;
                        setCurrentUser(updatedResponseObj)
                      })
                } else {
                    setLoseDisplay('flex')
                    currentUser.loses += 1;
                    currentUser.points += 5;
                    axios.put('https://teamcullenwebapp2.azurewebsites.net/player/update/' + userId, currentUser)
                    .then(response => {
                      let updatedResponseObj = response.data;
                      setCurrentUser(updatedResponseObj)
                    })
                }
    }

    function playCard(e){   
        let randomIndex = Math.floor(Math.random() * 80)
        let computerPower = allCardsForComputer[randomIndex].power;
        let playerPower = e.target.getElementsByClassName('play-card-power')[0].innerHTML;
        let characterName = e.target.getElementsByClassName('play-card-title')[0].innerHTML;
        let imageUrl = e.target.lastElementChild.innerHTML;
        let uniqueId = e.target.getAttribute("data-key")
      
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

        if(playerScore <= 9 || computerScore <= 9){
            removeCardFrom5(uniqueId)
        }
    }

    function compareCards(computerPower, playerPower){
        
        if(computerPower > playerPower){
            document.getElementById('computer-card-in-play').classList.add('winning-card');
            setComputerScore(computerScore + 1)
        } else if (playerPower > computerPower){
            document.getElementById('player-card-in-play').classList.add('winning-card')
            setPlayerScore(playerScore + 1)
        } else {
            document.getElementById('tie').classList.add('tie-animation')
        }
        setTimeout(function(){
            document.getElementById('computer-card-in-play').classList.remove('winning-card')
            document.getElementById('player-card-in-play').classList.remove('winning-card')
            document.getElementById('tie').classList.remove('tie-animation')
        }, 1000);
        checkForWin()
    }

    function checkForWin(){
        //Add Win To Database
        if(playerScore >= 9){
            setWinDisplay('flex')
            currentUser.wins += 1;
            currentUser.points += 15;
            axios.put('https://teamcullenwebapp2.azurewebsites.net/player/update/' + userId, currentUser)
            .then(response => {
                let updatedResponseObj = response.data;
                setCurrentUser(updatedResponseObj)
              })
            //Add Loss To Database
        } else if (computerScore >= 9) {
            setLoseDisplay('flex')
             currentUser.loses += 1;
             currentUser.points += 5;
             axios.put('https://teamcullenwebapp2.azurewebsites.net/player/update/' + userId, currentUser)
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
        fiveCards.map(card => {
            let attribute = card.getAttribute('data-key');
            
            if(attribute == id){
                let cardWeNeed;
                let dataId = card.getAttribute('data-id')
                
              for(let i = 0; i < allCardsForComputer.length; i++){
                  if(allCardsForComputer[i].card_id == dataId){
                      cardWeNeed = allCardsForComputer[i]
                  }
              }
                for(let j = 0; j < fiveDisplayedCards.length; j++){
                    if(JSON.stringify(fiveDisplayedCards[j].card) === JSON.stringify(cardWeNeed)){
                        indexToRemove = j
                    }
                }
            }

            // let poppedCardFragment = (
            //     <Fragment>
            //           <div 
            //                 className="card" 
            //                 onClick={(e)=>playCard(e)} 
            //                 key={Math.random()} 
            //                 style={{backgroundImage: `url(${poppedCard.image_url})`}}
            //                 data-key={Math.random()}
            //                 data-id={poppedCard.card_id}
            //                 >
            //                     <div className="play-card-banner">
            //                      <p className="play-card-title">{poppedCard.card_name}</p>
            //                     </div>
            //                 <p className="play-card-power">{poppedCard.power}</p>
            //                 <p className="hidden-image-url">{poppedCard.image_url}</p>
            //                 </div>
            //     </Fragment>
            //   )
            // fiveDisplayedCards[indexToRemove] = poppedCardFragment;
        })
        drawCard(indexToRemove)
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
                    <img className="pow" alt="comic pow" src={pow}></img>
                    <p class="pow-text">Rules</p>
                </div>
                <div className="quit">
                    <img className="pow" alt="comic pow" src={pow}></img>
                    <Link className="quit-btn" to="/home" state={{userId: userId}}>Quit</Link>
                </div>
            </div>

            {/* Rules Popup */}
            <div className="rules-outer-div" style={{display: rulesDisplay}}>
                <div className="game-rules-inner-div">
                    <span className="close-btn" onClick={closeRulesPopup}>X</span>
                    <h2 className="rules-header">Rules</h2>
                    <p className="game-rules-paragraph">
                    Each player draws 5 cards at the start of the game. Each turn, both players
                    choose which card to play to the center at the same time. The cards fight each other
                    and the one with the higher power value wins. The winning player will then get +1 to their score
                    and both cards are discarded (regardless of whether they won or lost). Ties reward no score
                    to either player. Each player then draws a new card from their deck and they keep playing. 
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
                        <div className="computer-score-container">
                            <p className="computer-score">Computer:</p>
                            <p className="computer-score number">{computerScore}</p>
                        </div>
                        <div className="player-score-container">
                            <p className="player-score">Player:</p>
                            <p className="player-score number">{playerScore}</p>
                        </div>
                        <h2 id="tie">Tie!</h2>
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
                        <p className="end-game-paragraph">You've earned 15 points! Head over to the store to redeem them for new cards.</p>
                        <p className="end-screen-btn" onClick={() => window.location.reload()}>Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div>
            </div>

            <div className="end-game-outer-div" style={{display: loseDisplay}}>
                <div className="lose-game-inner-div" >
                    <div className="end-screen-overlay"></div>
                    <div className="end-screen-content win">
                        <h3 className="end-screen-header">You Lose!</h3>
                        <p className="end-game-paragraph">Nice try! Here's 5 points to save up and get new heroes.</p>
                        <p className="end-screen-btn" onClick={() => window.location.reload()}>Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div>
            </div>

          </div>
    </div> : <div className="loading-screen">
                    <div className="loading-overlay"></div>
                 <h1 className="loading">Loading...</h1>
                 </div>
)}
  
  export default Game;
  