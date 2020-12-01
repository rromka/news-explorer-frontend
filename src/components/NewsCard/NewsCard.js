import './NewsCard.css'
import React, {useEffect, useState} from "react";
import Informer from "../Informer/Informer";
import {NEWS_IMAGE_PLACEHOLDER} from "../../utils/constants";


function NewsCard({savedNews, loggedIn, onCardSave, keyWord, onCardDelete, ...article}) {

  const date = new Date(article.publishedAt || article.date)
  const bookmark = 'card__button_type_bookmark'
  const bookmark_active = 'card__button_type_bookmark-active'
  const trashIcon = 'card__button_type_trash'
  const infoText = savedNews ? 'Убрать из сохраненных' : 'Войдите для сохранения'

  const [saved, setSaved] = useState(false)
  const [bookmarked, setBookmarked] = useState(bookmark)

  const savedCheck = () => {
    if (article.saved === true) {
      setSaved(true)
      setBookmarked(bookmark_active)
    } else {
      setSaved(false)
      setBookmarked(bookmark)
    }
  }

  function handleSaveCard() {
    onCardSave(
      {
        keyword: keyWord,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage || NEWS_IMAGE_PLACEHOLDER,
      }
    );
    setSaved(true);
    setBookmarked(bookmark_active)
  }

  function handleDeleteCard() {
    onCardDelete(article)
    setSaved(false)
    setBookmarked(bookmark)
  }

  useEffect(() => {
    savedCheck()
  }, [])

  return (
    <div className="card">
      <div className="card__control">
        {savedNews ?
          <button className={`card__button ${trashIcon}`} type="button" onClick={handleDeleteCard}/> :
          <button className={`card__button ${bookmarked}`} type="button"
                  onClick = {!saved ? handleSaveCard : handleDeleteCard} disabled={!loggedIn}/>
        }
        {!loggedIn && <Informer text={infoText} isTooltip/>}
        {savedNews && <Informer text={article.keyword}/>}

      </div>
      <img className="card__image" src={article.image || article.urlToImage || NEWS_IMAGE_PLACEHOLDER}
           alt={article.title}/>
      <a className="card__data" href={article.url || article.link}>
        <p className="card__date">{`
          ${date.toLocaleString('ru', {day: 'numeric', month: 'long'})}
          ${date.getFullYear()}`}</p>
        <h4 className="card__title">{article.title}</h4>
        <p className="card__description">{article.description || article.text}</p>
        <p className="card__source">{article.source.name || article.source}</p>
      </a>
    </div>

  );
}

export default NewsCard
