import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import './Header.css';
import NavBar from "../NavBar/NavBar";

function Header({loggedIn, hideBurger, onLogin, onSignOut}) {

  const location = useLocation()
  const [isSavedNews, setIsSavedNews] = useState(false)
  const light = isSavedNews ? 'header__logo_black' : ''
  const headerLight = isSavedNews ? 'header_theme_light' : 'header_theme_dark'

  const headerHandler = () => {
    if (location.pathname === '/saved-news'
    ) {
      setIsSavedNews(true)
    } else {
      setIsSavedNews(false)
    }
  }

  useEffect(() => {
    headerHandler()
  }, [location])

  return (
    <header className={`page__section header ${headerLight}`}>
      <div className="header__elements">
        <Link to='/' className={`header__logo ${light}`}>NewsAnalyzer</Link>
        <NavBar
          loggedIn={loggedIn}
          isSavedNews={isSavedNews}
          hideBurger={hideBurger}
          onLogin={onLogin}
          onSignOut={onSignOut}
        />
      </div>
    </header>
  );
}

export default Header;
