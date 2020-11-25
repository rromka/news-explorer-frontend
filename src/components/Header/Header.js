import React from "react";
import {Link} from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header({loggedIn, isSavedNews, hideBurger, onSignUp, onSignOut}) {
  const light = isSavedNews ? 'header__logo_black' : ''
  const headerLight = isSavedNews ? 'header_theme_light' : 'header_theme_dark'

  return (
    <header className={`header ${headerLight} page__section`}>
      <div className="header__elements">
        <Link to='/' className={`header__logo ${light}`}>NewsAnalyzer</Link>
        <Navigation
          loggedIn={loggedIn}
          isSavedNews={isSavedNews}
          hideBurger={hideBurger}
          onSignUp={onSignUp}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  );
}

export default Header;
