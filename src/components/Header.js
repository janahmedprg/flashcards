// Header.js
import React from "react";
import "../styles/headerStyle.css";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <div className="headerWrap">
      <header className="header">
        <img src={logo} alt="Logo" className="imgHeader" />
        <h1 className="headerText"> HoloFlash </h1>
      </header>
      <div>
        <h2 className="headerH2">
          Online tool that turns lecture notes into flashcards.
        </h2>
      </div>
    </div>
  );
};

export default Header;
