import React from "react";
import { Link } from 'react-router-dom';


function DeckBuilder() {
    return (
      <div className="login-div">
        <h1>Inside Deck Builder Page</h1>
        <Link to="/home">Go To Home</Link>
      </div>
    );
  }
  
  export default DeckBuilder;
  