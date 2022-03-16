import React from "react";
import { Link } from 'react-router-dom';


function Game() {
    return (
      <div className="login-div">
        <h1>Inside Game Page</h1>
        <Link to="/home">Go To Home</Link>
      </div>
    );
  }
  
  export default Game;
  