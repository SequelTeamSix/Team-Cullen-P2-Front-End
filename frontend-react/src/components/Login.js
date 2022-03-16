import React from "react";
import { Link } from 'react-router-dom';
import '../css/Login.css';


function Login() {
    return (
      <div className="login-div">
        <h1>Inside Login Page</h1>
        <Link to={"./Home"}>Home Page</Link>
      </div>
    );
  }
  
  export default Login;
  