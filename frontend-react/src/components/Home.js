import React from "react";
import '../css/Home.css';
import { Link } from 'react-router-dom';


function Home() {
    return (
    <div>
        <div className="home-div">
            <h1>Inside Home Page</h1>
            <Link to="/">Go To Login</Link>
            <Link to="/game">Go To Game</Link>
            <Link to="/store">Go To Store</Link>
            <Link to="/deckbuilder">Go To Deck Builder</Link>
      </div>
    </div>
    
    );
  }
  
  export default Home;
  