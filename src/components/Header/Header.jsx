import React from "react";
import foodImage from "../../assets/food.png";
import "./Header.scss";

const Header = () => {
  return (
    <header id='header'>
      <img id='logo' src={foodImage} alt='Apple Image' />
      <h2>SNAKE RACE</h2>
    </header>
  );
};

export default Header;
