import './NewsCard.css'
import React, {useState} from "react";
import Informer from "../Informer/Informer";

function NewsCard({savedNews, ...article}) {

  const date = new Date(article.publishedAt)
  const bookmark = 'card__button_type_bookmark'
  const bookmark_active = 'card__button_type_bookmark-active'
  const trashIcon = 'card__button_type_trash'
  const infoText = savedNews ? 'Убрать из сохраненных' : 'Войдите для сохранения'
  const infoTag = 'Театр'

  const [isBookmarked, setIsBookmarked] = useState(bookmark)

  function handleBookmarked(event) {
    event.stopPropagation()
    if (isBookmarked === bookmark) {
      setIsBookmarked(bookmark_active);
    } else {
      setIsBookmarked(bookmark)
    }
  }

  return (
    <div className="card">
      <div className="card__control">
        {savedNews ?
          <button className={`card__button ${trashIcon}`} type="button"/> :
          <button className={`card__button ${isBookmarked}`} type="button" onClick={handleBookmarked}/>
        }
        <Informer text={infoText} isTooltip/>
        {savedNews && <Informer text={infoTag}/>}

      </div>
      <img className="card__image" src={article.urlToImage} alt={article.title}/>
      <a className="card__data" href={article.url}>
        <p className="card__date">{`
          ${date.toLocaleString('ru', {day: 'numeric', month: 'long'})}
          ${date.getFullYear()}`}</p>
        <h4 className="card__title">{article.title}</h4>
        <p className="card__description">{article.description}</p>
        <p className="card__source">{article.source.name}</p>
      </a>
    </div>

  );
}

export default NewsCard
