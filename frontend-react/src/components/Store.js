import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Store.css';



function Store() {

    const [purchaseDisplay, setPurchaseDisplay] = useState('none');

    function openPurchasePopup(){
        setPurchaseDisplay('block')
      }

      function closePurchasePopup(){
        setPurchaseDisplay('none')
      }

    return (
      <div className="login-div">

            <div className="store-container">
                <h1>Store</h1>
                <Link className="home-link" to="/home">Back To Home</Link>
                <p class="user-points">Your Points: 120</p>

                <div className="store-contents">
                        <h2>Upgrade Your Deck!</h2>
                        <p className="info-paragraph">Choose to spend your game points on new cards to make your deck more competitive! Each pack contains 4 cards of varying rarity.</p>
                        <div className="pack-options-div">
                            <div className="deck-pack common">
                                <div className="deck-pack-image"></div>
                                <h3 className="pack-type">Common Pack</h3>
                                <span className="pack-cost">30 Points</span>
                                <button className="buy-btn" onClick={openPurchasePopup}>Buy Pack</button>
                            </div>
                            <div className="deck-pack rare">
                                <div className="deck-pack-image"></div>
                                <h3 className="pack-type">Rare Pack</h3>
                                <span className="pack-cost">60 Points</span>
                                <button className="buy-btn" onClick={openPurchasePopup}>Buy Pack</button>
                            </div>
                            <div className="deck-pack ultra-rare">
                                <div className="deck-pack-image"></div>
                                <h3 className="pack-type">Ultra-Rare Pack</h3>
                                <span className="pack-cost">120 Points</span>
                                <button className="buy-btn" onClick={openPurchasePopup}>Buy Pack</button>
                            </div>
                        </div>
                </div>

                <div className="purchase-popup-outer-div" style={{display: purchaseDisplay}}>
                    <div className="purchase-popup-inner-div">
                    <span className="close-btn" onClick={closePurchasePopup}>X</span>
                    <div className="purchase-content">
                        <h2>Here's What You Got!</h2>
                        <div className="new-cards-div">
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                        </div>
                        <h3 className="info-paragraph">Nice! These cards will be added to your inventory. Head over to the deck builder to customize your deck for your next game.</h3>
                    </div>
                    </div>
                </div>

            </div>







      </div>
    );
  }
  
  export default Store;
  