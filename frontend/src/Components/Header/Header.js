import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Home from "./Home";

const HomePage = () => {
  return(
    <div>
    <div className="header">
    <div className="nav">
      <span>Logo</span>
      <span>Home</span>
      <span><Link to={'/list'} style={{textDecoration:'none',color:'black'}}>Employee List</Link></span>
    </div>
    <div className="user-info">
      <span>Hukum-Gupta</span>
      <span className="logout">Logout</span>
    </div>
  </div>
  <Home/>
  </div>
  )
};

export default HomePage;
