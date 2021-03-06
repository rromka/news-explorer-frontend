import React, {useState} from "react";
import {Link, NavLink} from 'react-router-dom';
import './MobileMenu.css';
import exitIcon_light from '../../images/exit_light.svg'

function MobileMenu({savedNewsMenu, userName, loggedIn, onLogin, onSignOut}) {
  const [changeIcon, setChangeIcon] = useState('')
  const [openMenu, setOpenMenu] = useState('')
  const savedNewsButton = savedNewsMenu ? 'menu__icon-line_light' : ''

  function handleMobileMenu() {
    if (changeIcon === '') {
      setChangeIcon('menu__icon_active')
      setOpenMenu('mobile-nav_active')

    } else {
      setChangeIcon('')
      setOpenMenu('')
    }
  }

  return (
    <>
      <div className={`menu__icon ${changeIcon}`} onClick={handleMobileMenu}>
        <div className={`menu__icon-line ${savedNewsButton}`}/>
      </div>
      <div className={`mobile-nav ${openMenu} `}>
        <Link to='/' className={`header__logo mobile-nav__logo`}>NewsAnalyzer</Link>
        <div className="mobile-nav__divider"/>
        <ul className="mobile-nav__list">
          <li className="mobile-nav__item"><NavLink to='/' className="mobile-nav__link">Главная</NavLink></li>
          {loggedIn && <li className="mobile-nav__item"><NavLink to='/saved-news' className="mobile-nav__link">Сохраненные
            статьи</NavLink></li>}
          <div className="mobile-nav__item">
            {loggedIn && <button onClick={onSignOut} className={`mobile-nav__menu-button`}>
              {userName}
              <img className="main__menu-button-icon" src={exitIcon_light} alt="Выход"/>
            </button>}
            {!loggedIn &&
            <button onClick={onLogin} className={`mobile-nav__menu-button`}>Авторизоваться</button>}
          </div>
        </ul>
      </div>
    </>
  );
}

export default MobileMenu;
