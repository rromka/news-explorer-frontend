import './SearchForm.css';
import {useEffect, useState} from "react";

function SearchForm({sendWord}) {

  const [word, setWord] = useState('')

  const wordHandler = (e) => {
    setWord(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendWord(word)
  }

  return (
    <section className="search page__section">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.</p>
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__input"
               type="search"
               placeholder="Введите тему новости"
               required
               value={word}
               onChange={wordHandler}
        />
        <button className="search__button button" type="submit">Искать</button>
      </form>
    </section>
  );
}

export default SearchForm;
