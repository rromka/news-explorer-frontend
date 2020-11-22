import React, {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import {useWindowWidth} from '@react-hook/window-size'
import './Navigation.css';
import exitIcon from '../../images/exit.svg'
import exitIcon_light from '../../images/exit_light.svg'
import MobileMenu from "../MobileMenu/MobileMenu";

function Navigation({isAutorized, isSavedNews, userName, hideBurger, onSignUp}) {
  const lightButton = isSavedNews ? 'main__menu-button_light' : ''
  const [burgerActive, setBurgerActive] = useState(false)
  const savedNewsMenu = !!isSavedNews
  const onlyWidth = useWindowWidth(10)

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
        {isAutorized && <li className={`nav__item ${isSavedNews ? 'nav__item_active-light' : ''}`}>
          <NavLink to='/saved-news' className={`nav__link ${isSavedNews ? 'nav__link_theme-light' : ''}`}>
            Сохраненные статьи
          </NavLink>
        </li>}
        <li className="nav__item">
          <button onClick={onSignUp}
                  className={`main__menu-button ${lightButton}`}>{isAutorized ? `${userName}` : 'Авторизоваться'}
            {isAutorized ? <img className="main__menu-button-icon"
                                src={`${isSavedNews ? exitIcon : exitIcon_light}`} alt="Выход"/> : ''}</button>
        </li>
      </ul>

      {(burgerActive && !hideBurger) && <MobileMenu
        savedNewsMenu={savedNewsMenu}
        isAutorized={isAutorized}
        userName={userName}
        onSignUp={onSignUp}
      />}
    </nav>
  );
}

export default Navigation;
