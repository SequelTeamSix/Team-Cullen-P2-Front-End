import React from "react";
import { Link } from 'react-router-dom';


function Store() {
    return (
      <div className="login-div">
        <h1>Inside Store Page</h1>
        <Link to="/home">Go To Home</Link>
      </div>
    );
  }
  
  export default Store;
  