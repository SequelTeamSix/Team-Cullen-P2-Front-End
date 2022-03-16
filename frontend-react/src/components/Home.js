import React from "react";
import '../css/Home.css';
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div className="login-div">
        <h1>Inside Home Page</h1>
        <Link to="/">Go To Login</Link>
      </div>
    );
  }
  
  export default Home;
  