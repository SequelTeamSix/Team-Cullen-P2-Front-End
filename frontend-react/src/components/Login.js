import React from "react";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { render } from "react-dom";
import { ThemeContext } from "./App";
import stan from "../images/stan-lee.png";  






 export default function Login() {

    // const [allUsers, setAllUsers] = useState([]);
    const [mainLoginDisplay, setMainLoginDisplay] = useState('flex');
    const [popupDisplay, setPopupDisplay] = useState('none');
    const [newAccountFormDisplay, setNewAccountFormDisplay] = useState('flex');
    const [confirmDivDisplay, setConfirmDivDisplay] = useState('none');

    const [currentUserId, setCurrentUserId] = useState('0');
    const contextUsers = useContext(ThemeContext);
    const [allUsers, setAllUsers] = useState();
    const [homeBtnDisplay, setHomeBtnDisplay] = useState('none');


    useEffect(() => {
        setAllUsers(contextUsers);
    }, [contextUsers])

    //Logging in to a saved account
    function validateLogin(e){
      e.preventDefault();
      let providedUsername = document.getElementById("login-username").value;
      let providedPassword = document.getElementById("login-password").value;
    
      let matchingUser = allUsers.filter(user => user.username === providedUsername);
      if (matchingUser.length === 0){
        alert('Username not found')
        return;
      } else if (matchingUser[0].password !== providedPassword){
        alert('Incorrect Password')
        return;
      } else if (matchingUser[0].password === providedPassword){
        setCurrentUserId(matchingUser[0].player_id);
        setMainLoginDisplay('none')
        setHomeBtnDisplay('block')
      } 
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

        axios.post('https://teamcullenwebapp2.azurewebsites.net/player/add', newUser)
          .then(response => {
            let newUser = response.data;
            setCurrentUserId(newUser.player_id)
            setNewAccountFormDisplay('none')
            setConfirmDivDisplay('block');
            getAllUsers()
          })
      }

      function getAllUsers(){
        axios.get('https://teamcullenwebapp2.azurewebsites.net/player')
        .then(response => {
          let returnedUsers = response.data;
          setAllUsers(returnedUsers);
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
          <form className="login-form" onSubmit={(e) => validateLogin(e)} method="post" style={{display: mainLoginDisplay}}>
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
        
        <div style={{display: homeBtnDisplay}}>
          <h3 className="assemble">Players, Assemble!</h3>
          <img className="stan-lee" alt="Stan Lee" src={stan}></img>
          <Link style={{display: homeBtnDisplay}} id="home-btn" to={"/home"} state={{userId:currentUserId}}>Enter</Link>
        </div>

            <div id="new-account-div" style={{display: popupDisplay}}>
              <div className="new-account-content">
                <h2 className="new-account-header">Create New Account</h2>
                <span className="close-btn" onClick={() => closeNewAccountDiv()}>X</span>

                <form className="new-account-form" style={{display: newAccountFormDisplay}} onSubmit={(e) => confirmNewAccount(e)} method="post">
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
                <div className="new-user-approval-div" style={{display: confirmDivDisplay}}>
                    <h2 className="new-account-header">You're Confirmed!</h2>
                    <button onClick={() => setPopupDisplay('none')}>Return to Login</button>
                </div>
              </div>
            </div>
        </div>
      </div>
      
    )
  }