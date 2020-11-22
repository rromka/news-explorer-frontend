import React from "react";
import {Link} from "react-router-dom";
import './Footer.css';
import github from '../../images/github.png'
import facebook from '../../images/iconmonstr-facebook-6.png'

function Footer() {
  return (
    <footer className="footer page__section">
      <div className="footer__elements">
        <p className="footer__copyright">&copy; 2020 Romashka</p>
        <div className="footer__menu">
          <ul className="footer__links">
            <li className="footer__links-item">
              <Link to='/' className="footer__link">Главная</Link>
            </li>
            <li className="footer__links-item">
              <a className="footer__link" target="_blank" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
            </li>
          </ul>
          <ul className="footer__logos">
            <li className="footer__logo-item"><a className="footer__link"><img
              src={github} alt="Логотип Гитхаба"/></a></li>
            <li className="footer__logo-item"><a className="footer__link"><img
              src={facebook} alt="Логотип Фейсбука"/></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
