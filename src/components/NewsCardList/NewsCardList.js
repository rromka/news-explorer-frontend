import React, {useEffect, useState} from "react";
import './NewsCardList.css'
import NewsCard from "../NewsCard/NewsCard";
import data from '../../utils/data.json'

function NewsCardList({isSavedNews}) {

  const articles = data.articles // временно для вывода новостей
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
            key={article.publishedAt}/>)}
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
