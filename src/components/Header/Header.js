import React from "react";
import {Link} from "react-router-dom";
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header({isAutorized, isSavedNews, userName, hideBurger, onSignUp}) {
  const light = isSavedNews ? 'header__logo_black' : ''
  const headerLight = isSavedNews ? 'header_theme_light' : 'header_theme_dark'

  return (
    <header className={`header ${headerLight} page__section`}>
      <div className="header__elements">
        <Link to='/' className={`header__logo ${light}`}>NewsAnalyzer</Link>
        <Navigation
          isAutorized={isAutorized}
          isSavedNews={isSavedNews}
          userName={userName}
          hideBurger={hideBurger}
          onSignUp={onSignUp}
        />
      </div>
    </header>
  );
}

export default Header;
