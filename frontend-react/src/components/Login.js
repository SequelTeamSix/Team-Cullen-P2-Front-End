import React from "react";
import { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';

  export default function Login() {
    
    const [popupDisplay, setPopupDisplay] = useState('none');

    function openNewAccountDiv(){
      setPopupDisplay('block')
    }

    function closeAccountDiv(){
      setPopupDisplay('none')
    }

    return (
      <div>
        <h1>Inside Login Page</h1>
        <Link to="/home">Go To Home</Link>
        <div className="container">
          <form className="login-form" action="action_page.php" method="post">
              <div className="form-field-div">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter Username" name="username"/>
              </div>
              
              <div className="form-field-div">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" name="password" />
              </div>
            
              <button type="submit">Login</button>
              <button id="new-account-btn" type="button" onClick={openNewAccountDiv}>Create New Account</button>
          </form>

          <div id="new-account-div" style={{display: popupDisplay}}>
            <div className="new-account-content">
              <h2>Create New Account</h2>
              <span className="close-btn" onClick={closeAccountDiv}>X</span>
            </div>
           

          </div>
        </div>
      </div>
    );
  }


  