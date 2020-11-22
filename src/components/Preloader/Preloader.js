import './Preloader.css';
import React from "react";

function Preloader() {
  return (
    <section className="preloader page__section">
      <i className="circle-preloader"/>
      <p className="preloader__subtitle">Идет поиск новостей...</p>
    </section>

  );
}

export default Preloader;
