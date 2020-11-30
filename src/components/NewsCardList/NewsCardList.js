import React, {useEffect, useState} from "react";
import './NewsCardList.css'
import NewsCard from "../NewsCard/NewsCard";
import {NUMBER_ARTICLES_FOR_DISPLAY} from "../../utils/constants";


function NewsCardList({isSavedNews, data, loggedIn, onCardSave, keyWord, onCardDelete}) {

  const articles = data // временно для вывода новостей
  const [searchResult, setSearchResult] = useState([...articles.slice(0, NUMBER_ARTICLES_FOR_DISPLAY)])
  const [showButton, setShowButton] = useState(true)

  const buttonToggle = () => {
    if (isSavedNews || articles.length === searchResult.length) {
      setShowButton(false)
    }
  }

  const addMoreResults = () => {
    setSearchResult([...searchResult,
      ...articles.slice(searchResult.length, searchResult.length + NUMBER_ARTICLES_FOR_DISPLAY)]);
  }

  useEffect(() => {
    buttonToggle()
  }, [addMoreResults])

  return (
    <section className="news-card-list page__section">
      <div className="news-card-list__container">
        {isSavedNews ? '' : <h3 className="page__title">Результаты поиска</h3>}
        <div className="news-card-list__cards">
          {searchResult.map((article) => <NewsCard
            {...article}
            savedNews={isSavedNews}
            key={article.url}
            loggedIn={loggedIn}
            keyWord={keyWord}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
          />)}
        </div>
        {showButton && <button
          className="news-card-list__button button"
          onClick={addMoreResults}>Показать еще</button>
        }
      </div>
    </section>
  );
}

export default NewsCardList
