import React from "react";
import './SavedNews.css';
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";


function SavedNews({loggedIn, savedNews, onCardDelete}) {

  const tags = savedNews.map(data => data.keyword)

  return (
    <main className="saved-news">
      <SavedNewsHeader
        newsTags={tags}
        newsCount={savedNews.length}
      />
      <section className="news-card-list page__section">
        <div className="news-card-list__container">
          <div className="news-card-list__cards">
            {savedNews.map((article) => <NewsCard
              {...article}
              savedNews ={true}
              key={article._id}
              loggedIn={loggedIn}
              onCardDelete={onCardDelete} // Удалялка карточек
            />)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
