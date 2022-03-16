import React from "react";
import '../css/Login.css';
import { Link } from 'react-router-dom';


function Login() {
    return (
      <div className="login-div">
        <h1>Inside Login Page</h1>
        <Link to="/home">Go To Home</Link>
      </div>
    );
  }
  
  export default Login;
  