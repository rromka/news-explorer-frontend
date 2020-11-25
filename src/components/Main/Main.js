import './Main.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import React, {useCallback, useEffect, useState} from "react";

import newsApi from '../../utils/NewsApi'
import api from "../../utils/MainApi";

function Main({data, onLogout, loggedIn, hideBurger, onSignupFormClick}) {
  const [showResult, setShowResult] = useState(true)
  const [keyWord, setKeyWord] = useState('')
  const [showPreloader, setShowPreloader] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)
  const [newsData, setNewsData] = useState(data)

  //todo сделать поиск по новому ключевому слову
  function handleSearch(keyWord) {
    setShowPreloader(true)
    newsApi.getNews(keyWord)
      .then((data) => {
        localStorage.setItem('news', JSON.stringify(data.articles))
      })
      .then(() =>{
        setNewsData(JSON.parse(localStorage.getItem('news')))
        console.log(newsData);
        setShowPreloader(false)
        setShowResult(true)
        setShowNotFound(false)
      })
      .catch(() => {
        setShowPreloader(false)
        setShowNotFound(true)
      })
    setKeyWord(keyWord)
    console.log(keyWord);
  }

  //Добавление карточки
  function handleCardSave(article) {
    // const isLiked = card.likes.includes(currentUser._id);

    api.postCard(article)
      .then((newCard) => {
        console.log(newCard)
      })
      .catch((err) => {
        console.error(err)
      });
  }

  return (
      <main className="main">
        <Header
          loggedIn={loggedIn}
          isSavedNews={false}
          hideBurger={hideBurger}
          onSignUp={onSignupFormClick}
          onSignOut={onLogout}
        />
        <SearchForm
          sendWord={handleSearch}
        />
        {showPreloader && <Preloader/>}
        {showNotFound && <NotFound/>}
        {showResult && <NewsCardList
          loggedIn = {loggedIn}
          data={newsData}
          onCardSave={handleCardSave}// сохранялка карточек
        />}
        <About/>
      </main>
  );
}

export default Main;
