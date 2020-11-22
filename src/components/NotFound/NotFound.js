import './NotFound.css';
import notfound from '../../images/not-found.svg'
import React from "react";

function NotFound() {
  return (
    <section className="not-found page__section">
      <img className="not-found__img" src={notfound} alt="Ничего не найдено"/>
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">К сожалению по вашему запросу
        ничего не найдено.</p>
    </section>
  );
}

export default NotFound;
