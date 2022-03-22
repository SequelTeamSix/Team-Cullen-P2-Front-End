import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import '../css/Store.css';

export default function Store() {
    const location = useLocation();
    const { userId } = location.state;

    const [storeUser, setStoreUser] = useState();
    const [purchaseDisplay, setPurchaseDisplay] = useState('none');
    const [allCommonCards, setAllCommonCards] = useState();
    const [allRareCards, setAllRareCards] = useState();
    const [allUltraRareCards, setAllUltraRareCards] = useState();

    const [fourChosenCards, setFourChosenCards] = useState([]);

    useEffect(() => {

        getStoreUserDetails(userId)
        getAllCardsFromDB()
 
        function getAllCardsFromDB(){
            let commonUrl = 'http://localhost:8000/card/rarity/1';
            let rareUrl = 'http://localhost:8000/card/rarity/2';
            let ultraRareUrl = 'http://localhost:8000/card/rarity/3';

            axios.get(commonUrl)
            .then(response => {
              let allCommonCards = response.data;
              setAllCommonCards(allCommonCards);
            })
            axios.get(rareUrl)
                .then(response => {
                let allRareCards = response.data;
                setAllRareCards(allRareCards);
            })
            axios.get(ultraRareUrl)
                .then(response => {
                let allUltraRareCards = response.data;
                setAllUltraRareCards(allUltraRareCards);
            })
        }

        function getStoreUserDetails(id){
            let url = 'http://localhost:8000/player/id/' + id;
            axios.get(url)
            .then(response => {
              let returnedUser = response.data;
              setStoreUser(returnedUser);
            })
        }
    }, [userId])

            function closePurchasePopup(){
                setPurchaseDisplay('none')
            }

            function buyCommonPack(){
                    let cost = 30;
                    if(storeUser.points >= 30){
                        subtractPoints(cost);
                        get4CommonCards();
                        setPurchaseDisplay('block')
                } else {
                    alert("You can't afford that!")
                }
            }
            function buyRarePack(){
                let cost = 60;
                if(storeUser.points >= cost){
                    subtractPoints(cost);
                    get4RareCards();
                    setPurchaseDisplay('block')
            } else {
                alert("You can't afford that!")
            }
        }
        function buyUltraRarePack(){
            let cost = 120;
            if(storeUser.points >= cost){
                subtractPoints(cost);
                get4UltraRareCards();
                setPurchaseDisplay('block')
        } else {
            alert("You can't afford that!")
            }
        }

       async function get4CommonCards(){
              for(let i = 0; i < 4; i++){
                let randomIndex = Math.floor(Math.random() * allCommonCards.length);
                fourChosenCards.push(allCommonCards[randomIndex]);
                const newOwnedCard = {
                        "card": {
                            "card_id": allCommonCards[randomIndex].card_id,
                            "card_name": allCommonCards[randomIndex].card_name,
                            "power": allCommonCards[randomIndex].power,
                            "image_url": "n/a",
                            "rarity": allCommonCards[randomIndex].rarity
                        },
                        "player": {
                            "player_id": storeUser.player_id,
                            "username": storeUser.username,
                            "password": storeUser.password,
                            "points": storeUser.points,
                            "wins": storeUser.wins,
                            "loses": storeUser.loses
                        }
                }
             await axios.put('http://localhost:8000/ownedcards/update', newOwnedCard)
              console.log(newOwnedCard)
          } 
        }

        async function get4RareCards(){
            for(let i = 0; i < 4; i++){
              let randomIndex = Math.floor(Math.random() * allRareCards.length);
              fourChosenCards.push(allRareCards[randomIndex]);
              const newOwnedCard = {
                      "card": {
                          "card_id": allRareCards[randomIndex].card_id,
                          "card_name": allRareCards[randomIndex].card_name,
                          "power": allRareCards[randomIndex].power,
                          "image_url": "n/a",
                          "rarity": allRareCards[randomIndex].rarity
                      },
                      "player": {
                          "player_id": storeUser.player_id,
                          "username": storeUser.username,
                          "password": storeUser.password,
                          "points": storeUser.points,
                          "wins": storeUser.wins,
                          "loses": storeUser.loses
                      }
              }
            await axios.put('http://localhost:8000/ownedcards/update', newOwnedCard)
            console.log(newOwnedCard)
        } 
      }

     async function get4UltraRareCards(){
        for(let i = 0; i < 4; i++){
          let randomIndex = Math.floor(Math.random() * allUltraRareCards.length);
          fourChosenCards.push(allUltraRareCards[randomIndex]);
          const newOwnedCard = {
                  "card": {
                      "card_id": allUltraRareCards[randomIndex].card_id,
                      "card_name": allUltraRareCards[randomIndex].card_name,
                      "power": allUltraRareCards[randomIndex].power,
                      "image_url": "n/a",
                      "rarity": allUltraRareCards[randomIndex].rarity
                  },
                  "player": {
                      "player_id": storeUser.player_id,
                      "username": storeUser.username,
                      "password": storeUser.password,
                      "points": storeUser.points,
                      "wins": storeUser.wins,
                      "loses": storeUser.loses
                  }
          }
       await axios.put('http://localhost:8000/ownedcards/update', newOwnedCard)
        console.log(newOwnedCard)
    } 
  }

          function subtractPoints(cost){
            storeUser.points -= cost;
            console.log(storeUser.points)
            axios.put('http://localhost:8000/player/update/' + storeUser.player_id, storeUser)
          }
        
        
    

return ( storeUser ? 
      <div className="store-bg">
          <div className="store-overlay"></div>
          <div className="padding">
            <div className="store-container">
                <h1 className="store-header">Store</h1>
                <Link className="home-link" to="/home" state={{userId: userId}}>Back To Home</Link>
                <p className="user-points">Your Points: {storeUser.points}</p>

                <div className="store-contents">
                        <h2>Upgrade Your Deck!</h2>
                        <p className="info-paragraph">Choose to spend your game points on new cards to make your deck more competitive! Each pack contains 4 cards of varying rarity.</p>
                        <div className="pack-options-div">
                            <div className="deck-pack common">
                                <div className="deck-pack-image">
                                    <p className="question-mark">?</p>
                                </div>
                                <h3 className="pack-type">Common Pack</h3>
                                <span className="pack-cost">30 Points</span>
                                <button className="buy-btn" onClick={() => buyCommonPack()}>Buy Pack</button>
                            </div>
                            <div className="deck-pack rare">
                                <div className="deck-pack-image">
                                    <p className="question-mark">?</p>
                                </div>
                                <h3 className="pack-type">Rare Pack</h3>
                                <span className="pack-cost">60 Points</span>
                                <button className="buy-btn" onClick={() => buyRarePack()}>Buy Pack</button>
                            </div>
                            <div className="deck-pack ultra-rare">
                                <div className="deck-pack-image">
                                    <p className="question-mark">?</p>
                                </div>
                                <h3 className="pack-type">Ultra-Rare Pack</h3>
                                <span className="pack-cost">120 Points</span>
                                <button className="buy-btn" onClick={() => buyUltraRarePack()}>Buy Pack</button>
                            </div>
                        </div>
                </div>

                <div className="purchase-popup-outer-div" style={{display: purchaseDisplay}}>
                    <div className="purchase-popup-inner-div">
                    <span className="close-btn" onClick={closePurchasePopup}>X</span>
                    <div className="purchase-content">
                        <h2 className="popup-header">Here's What You Got!</h2>
                        <div className="new-cards-div">
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                            <div className="new-card"></div>
                        </div>
                        <h3 className="purchase-paragraph">Nice! These cards will be added to your inventory. Head over to the deck builder to customize your deck for your next game.</h3>
                    </div>
                    </div>
                </div>

            </div>
            </div>
            </div> : <div> Loading...</div>
    )
  }
