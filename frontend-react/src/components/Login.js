import React from "react";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { render } from "react-dom";
import { ThemeContext } from "./App";



 export default function Login() {

    // const [allUsers, setAllUsers] = useState([]);
    const [popupDisplay, setPopupDisplay] = useState('none');
    const [currentUserId, setCurrentUserId] = useState('0');
    const contextUsers = useContext(ThemeContext);
    const [allUsers, setAllUsers] = useState();
    const [homeBtnDisplay, setHomeBtnDisplay] = useState('none');


    useEffect(() => {
        setAllUsers(contextUsers);
    }, [contextUsers])
   
    function checkAllUsers(){
      console.log(allUsers)
    }

    //Logging in to a saved account
    function validateLogin(e){
      e.preventDefault();
      let providedUsername = document.getElementById("login-username").value;
      let providedPassword = document.getElementById("login-password").value;
    
      let matchingUser = allUsers.filter(user => user.username === providedUsername);
      if (matchingUser.length === 0){
        alert('Incorrect Username/Password')
        return;
      } else if (matchingUser[0].password === providedPassword){
        setCurrentUserId(matchingUser[0].player_id);
        setHomeBtnDisplay('block')
      } 
    }

    function checkIfUserIsReady() {

    }

    //Creating a new account
    function confirmNewAccount(e){
      e.preventDefault();
      let newUsername = document.getElementById('new-account-username').value;
      let newPassword1 = document.getElementById('new-account-password1').value;
      let newPassword2 = document.getElementById('new-account-password2').value;

      console.log(newPassword1);
      console.log(newPassword2);

      if(newPassword1 !== newPassword2){
        alert("Oops, your passwords don't match")
        return;
      } else {
        AddNewPlayerToDatabase(newUsername, newPassword1);
      }
    }

    //Add new player to the database 
      function AddNewPlayerToDatabase(username, password){
        const newUser = {
          'username': username,
          'password': password,
          'points': 0,
          'wins': 0,
          'loses': 0
        }

        axios.post('http://localhost:8000/player/add', newUser)
          .then(response => {
            let newUser = response.data;
            setCurrentUserId(newUser.player_id)
            
          })

      }
    
      //Popup Menu Hiding and Displaying
      function openNewAccountDiv(){
       setPopupDisplay('block');
      }
  
      function closeNewAccountDiv(){
       setPopupDisplay('none');
      }

      return (
        
       <div className="login-bg">
         <div className="bg-overlay"></div>
        <h1 className="main-title">Superhero Dueling Cards</h1>
        <div className="login-container">
          <form className="login-form" onSubmit={(e) => validateLogin(e)} method="post">
              <div className="form-field-div">
                <label htmlFor="username">Username</label>
                <input id="login-username" type="text" name="username" required/>
              </div>
              
              <div className="form-field-div">
                <label htmlFor="password">Password</label>
                <input id="login-password" type="password" name="password" required/>
              </div>
            
              <button type="submit">Login</button>
              <button id="new-account-btn" type="button" onClick={() => openNewAccountDiv()}>Create New Account</button>
          </form>

        <Link id="home-btn" to={"/home"} state={{userId:currentUserId}} style={{display: homeBtnDisplay}}>Go To Home</Link>

            <div id="new-account-div" style={{display: popupDisplay}}>
              <div className="new-account-content">
                <h2>Create New Account</h2>
                <span className="close-btn" onClick={() => closeNewAccountDiv()}>X</span>

                <form className="new-account-form" onSubmit={(e) => confirmNewAccount(e)} method="post">
                  <div className="form-field-div">
                    <label htmlFor="username">Username</label>
                    <input id="new-account-username" type="text" name="username" required/>
                  </div>
                  
                  <div className="form-field-div">
                    <label htmlFor="password">Password</label>
                    <input id="new-account-password1" type="password" name="password" required/>
                  </div>

                  <div className="form-field-div">
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input id="new-account-password2" type="password" name="password-confirm" required/>
                  </div>

                  <button id="confirm-account-btn" type="submit">Create New Account</button>

                </form>
                
              </div>
            </div>
        </div>
      </div>
      
    )
  }