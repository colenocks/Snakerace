import React from "react";
import foodImage from "../../assets/food.png";
import "./Header.scss";

const Header = (props) => {
  const { user_session, logoutHandler } = props;
  return (
    <header className='header-container'>
      <div className='main-logo'>
        <img src={foodImage} alt='Apple Image' />
        <h2>snake race</h2>
      </div>
      <div className='logout'>
        {user_session ? (
          <a href='/' onClick={logoutHandler}>
            Logout
          </a>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
