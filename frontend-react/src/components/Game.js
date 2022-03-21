import React from "react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Game.css';


function Game() {

    const location = useLocation();
    const { userId } = location.state;

    const [rulesDisplay, setRulesDisplay] = useState('none');
    const [endDisplay, setEndDisplay] = useState('none');

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

    return (
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
                {/* <div className="win-game-inner-div">
                <div className="end-screen-overlay"></div>
                    <span className="close-btn" onClick={closeEndPopup}>X</span>
                    <div className="end-screen-content">
                        <h3 className="end-screen-header">You Win!</h3>
                        <p className="end-screen-btn">Play Again With Same Deck</p>
                        <Link className="end-screen-btn" to="/home" state={{userId: userId}}>Quit</Link>
                    </div>
                </div> */}
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
                            <div className="card" id="computer-deck">
                                <p>Computer Deck</p>
                            </div>
                            <div className="card undercard1"></div>
                            <div className="card undercard2"></div>
                        </div>
                        
                        <div className="card" id="computer-card-1">
                            <p>Computer Card 1</p>
                        </div>
                        <div className="card" id="computer-card-2">
                            <p>Computer Card 2</p>
                        </div>
                        <div className="card" id="computer-card-3">
                            <p>Computer Card 3</p>
                        </div>
                        <div className="card" id="computer-card-4">
                            <p>Computer Card 4</p>
                        </div>
                        <div className="card" id="computer-card-5">
                            <p>Computer Card 5</p>
                        </div>
                    </div>
                </div>

                <div className="dueling-field">
                    <div className="computer-card-in-play card">
                        <p>Computer card in play</p>
                    </div>
                    <div className="player-card-in-play card">
                        <p>Player card in play</p>
                    </div>
                    <div className="scoring-container">
                        <p className="computer-score">Computer: 3</p>
                        <p className="player-score">Player: 5</p>
                    </div>
                </div>

                <div className="player-field">
                    <div className="five-cards-div">
                        <div className="card right" id="computer-card-1">
                            <p>Player Card 1</p>
                        </div>
                        <div className="card right" id="computer-card-2">
                            <p>Player Card 2</p>
                        </div>
                        <div className="card right" id="computer-card-3">
                            <p>Player Card 3</p>
                        </div>
                        <div className="card right" id="computer-card-4">
                            <p>Player Card 4</p>
                        </div>
                        <div className="card right" id="computer-card-5">
                            <p>Player Card 5</p>
                        </div>
                        <div className="deck-container">
                            <div className="card" id="player-deck">
                                <p>Player Deck</p>
                            </div>
                            <div className="card undercard1"></div>
                            <div className="card undercard2"></div>
                        </div>
                    </div>
                </div>



            </div>

          </div>
      </div>
    );
  }
  
  export default Game;
  