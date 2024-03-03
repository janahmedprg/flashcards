// Header.js
import React from "react";
import "../styles/headerStyle.css";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" style={{ width: "15%", height: "auto" }} />
      <h1 className="headerText"> HoloFlash </h1>
    </header>
  );
};

export default Header;
