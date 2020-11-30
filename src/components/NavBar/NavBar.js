import React, {useContext, useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import {useWindowWidth} from '@react-hook/window-size'
import './NavBar.css';
import exitIcon from '../../images/exit.svg'
import exitIcon_light from '../../images/exit_light.svg'
import MobileMenu from "../MobileMenu/MobileMenu";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function NavBar({loggedIn, isSavedNews, hideBurger, onLogin, onSignOut}) {
  const lightButton = isSavedNews ? 'main__menu-button_light' : ''
  const [burgerActive, setBurgerActive] = useState(false)
  const savedNewsMenu = !!isSavedNews
  const onlyWidth = useWindowWidth(10)
  const currentUser = useContext(CurrentUserContext)



  useEffect(() => {
    if (onlyWidth <= 767) {
      setBurgerActive(true)
    } else {
      setBurgerActive(false)
    }
  }, [onlyWidth])

  return (
    <nav className="nav-wrapper">

      <ul className="nav">
        <li className={`nav__item ${isSavedNews ? '' : 'nav__item_active'}`}>
          <NavLink exact to='/' className={`nav__link ${isSavedNews ? 'nav__link_theme-light' : ''}`}>
            Главная
          </NavLink>
        </li>
        {loggedIn && <li className={`nav__item ${isSavedNews ? 'nav__item_active-light' : ''}`}>
          <NavLink to='/saved-news' className={`nav__link ${isSavedNews ? 'nav__link_theme-light' : ''}`}>
            Сохраненные статьи
          </NavLink>
        </li>}
        <li className="nav__item">
          {loggedIn && <button onClick={onSignOut} className={`main__menu-button ${lightButton}`}>
            {currentUser.name}
            <img className="main__menu-button-icon" src={`${isSavedNews ? exitIcon : exitIcon_light}`} alt="Выход"/>
          </button>}
          {!loggedIn &&
          <button onClick={onLogin} className={`main__menu-button ${lightButton}`}>Авторизоваться</button>}
        </li>
      </ul>

      {(burgerActive && !hideBurger) && <MobileMenu
        savedNewsMenu={savedNewsMenu}
        loggedIn={loggedIn}
        onLogin={onLogin}
        onSignOut={onSignOut}
        userName={currentUser.name}
      />}
    </nav>
  );
}

export default NavBar;
