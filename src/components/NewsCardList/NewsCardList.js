import React, {useEffect, useState} from "react";
import './NewsCardList.css'
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({isSavedNews, data, loggedIn, onCardSave}) {
  console.log(data)

  const articles = data // временно для вывода новостей
  const [searchResult, setSearchResult] = useState([...articles.slice(0, 3)])
  const [showButton, setShowButton] = useState(true)

  const buttonToggle = () => {
    if (isSavedNews || articles.length === searchResult.length) {
      setShowButton(false)
    }
  }

  const addMoreResults = () => {
    setSearchResult([...searchResult, ...articles.slice(searchResult.length, searchResult.length + 3)]);
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
            key={article.publishedAt}
            loggedIn={loggedIn}
            onCardSave={onCardSave} //Сохранялка карточек
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
