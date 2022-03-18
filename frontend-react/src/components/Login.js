import React from "react";
import { useState, useEffect } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';


  export default function Login() {

    const [players, setPlayers] = useState(null);
    const [popupDisplay, setPopupDisplay] = useState('none');
    

    //Get All The Saved Players 
    useEffect(() => {
      fetch('http://localhost:8000/player')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setPlayers(data)
        })
    }, []);
    
    function ValidateLogin(e){
      
      e.preventDefault();
      let providedUsername = document.getElementById("login-username").value;
      let providedPassword = document.getElementById("login-password").value;
      let homeBtn = document.getElementById('home-btn');
      
      let matchingUser = players.filter(player => player.username === providedUsername);
      if (matchingUser.length === 0){
        alert('Incorrect Username/Password')
        return;
      } else if (matchingUser[0].password === providedPassword){
        console.log('working')
        homeBtn.click();
      } 
    }

    function openNewAccountDiv(){
      setPopupDisplay('block')
    }

    function closeAccountDiv(){
      setPopupDisplay('none')
    }

    function confirmNewAccount(){

    }
    

    return (    
      <div>
        <Link id="home-btn" to="/home">Go To Home</Link>
        <div className="container">
          <form className="login-form" onSubmit={ValidateLogin} method="post">
              <div className="form-field-div">
                <label htmlFor="username">Username</label>
                <input id="login-username" type="text" placeholder="Enter Username" name="username" required/>
              </div>
              
              <div className="form-field-div">
                <label htmlFor="password">Password</label>
                <input id="login-password" type="password" placeholder="Enter Password" name="password" required/>
              </div>
            
              <button type="submit">Login</button>
              <button id="new-account-btn" type="button" onClick={openNewAccountDiv}>Create New Account</button>
          </form>

            <div id="new-account-div" style={{display: popupDisplay}}>
              <div className="new-account-content">
                <h2>Create New Account</h2>
                <span className="close-btn" onClick={closeAccountDiv}>X</span>
                <form className="new-account-form" action="" method="post">
                  <div className="form-field-div">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username"/>
                  </div>
                  
                  <div className="form-field-div">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" />
                  </div>

                  <div className="form-field-div">
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input type="password" placeholder="Confirm Your Password" name="password-confirm" />
                  </div>

                  <button id="confirm-account-btn" type="submit" onClick={confirmNewAccount}>Create New Account</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }


  