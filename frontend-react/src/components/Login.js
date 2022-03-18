import React from "react";
import axios from 'axios';
// import { useState, useEffect } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
// import { render } from "react-dom";


 export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     allPlayers: [],
     newUserPopupDisplay: 'none',
     currentUser: []
    }
  }

  //Get all the saved players from the database and store them
  componentDidMount(){
    this.getAllUsers();
  }
  
  getAllUsers(){
    axios.get('http://localhost:8000/player')
    .then(response => {
      let returnedPlayers = response.data;
      this.setState({allPlayers : returnedPlayers})
    })
  }
   
    //Logging in to a saved account
    validateLogin(e){
      e.preventDefault();
      let providedUsername = document.getElementById("login-username").value;
      let providedPassword = document.getElementById("login-password").value;
      let homeBtn = document.getElementById('home-btn');
      console.log(this.state.allPlayers)
      let matchingUser = this.state.allPlayers.filter(player => player.username === providedUsername);
      console.log(matchingUser)
      if (matchingUser.length === 0){
        alert('Incorrect Username/Password')
        return;
      } else if (matchingUser[0].password === providedPassword){
        console.log('working')
        homeBtn.click();
      } 
    }

    //Creating a new account
    confirmNewAccount(e){
      e.preventDefault();
      let newUsername = document.getElementById('new-account-username');
      let newPassword1 = document.getElementById('new-account-password1');
      let newPassword2 = document.getElementById('new-account-password2');

      if(newPassword1 !== newPassword2){
        alert("Oops, your passwords don't match")
        return;
      }
      this.AddNewPlayerToDatabase(newUsername, newPassword1);
    }

    //Add new player to the database 
      AddNewPlayerToDatabase(username, password){
        const newUser = {
          'username': username,
          'password': password,
          'points': 0,
          'wins': 0,
          'loses': 0
        }

        axios.put('http://localhost:8000/player/add', newUser)
          .then(response => {
            let newPlayer = response.data;
            this.setState({currentUser : newPlayer})
          })
          
      }
    
      //Popup Menu Hiding and Displaying
      openNewAccountDiv(){
       this.setState({ newUserPopupDisplay : 'block'})
      }
  
      closeNewAccountDiv(){
        this.setState({ newUserPopupDisplay : 'none'})
      }

    render(){
      return (
       <div>
        <Link id="home-btn" to="/home">Go To Home</Link>
        <div className="container">
          <form className="login-form" onSubmit={(e) => this.validateLogin(e)} method="post">
              <div className="form-field-div">
                <label htmlFor="username">Username</label>
                <input id="login-username" type="text" placeholder="Enter Username" name="username" required/>
              </div>
              
              <div className="form-field-div">
                <label htmlFor="password">Password</label>
                <input id="login-password" type="password" placeholder="Enter Password" name="password" required/>
              </div>
            
              <button type="submit">Login</button>
              <button id="new-account-btn" type="button" onClick={() => this.openNewAccountDiv()}>Create New Account</button>
          </form>

            <div id="new-account-div" style={{display: this.state.newUserPopupDisplay}}>
              <div className="new-account-content">
                <h2>Create New Account</h2>
                <span className="close-btn" onClick={() => this.closeNewAccountDiv()}>X</span>
                <form className="new-account-form" action="" method="post">
                  <div className="form-field-div">
                    <label htmlFor="username">Username</label>
                    <input id="new-account-username" type="text" placeholder="Enter Username" name="username"/>
                  </div>
                  
                  <div className="form-field-div">
                    <label htmlFor="password">Password</label>
                    <input id="new-account-password1" type="password" placeholder="Enter Password" name="password" />
                  </div>

                  <div className="form-field-div">
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input id="new-account-password2" type="password" placeholder="Confirm Your Password" name="password-confirm" />
                  </div>

                  <button id="confirm-account-btn" type="submit" onClick={(e) => this.confirmNewAccount(e)}>Create New Account</button>

                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }
}