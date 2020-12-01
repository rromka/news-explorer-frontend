import React, {useCallback, useEffect, useState} from "react";
import {Switch, Route, useHistory} from 'react-router-dom';
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PopupWithInformer from "../PopupWithInformer/PopupWithInformer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import newsApi from "../../utils/NewsApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";


function App() {
  const [openedPopup, setOpenedPopup] = useState({})
  const [hideBurger, setHideBurger] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [savedNews, setSavedNews] = useState(JSON.parse(localStorage.getItem('savedNews')) || [])
  const [showResult, setShowResult] = useState(false)
  const [keyWord, setKeyWord] = useState(JSON.parse(localStorage.getItem('keyword')) || '')
  const [showPreloader, setShowPreloader] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)
  const [newsData, setNewsData] = useState(JSON.parse(localStorage.getItem('news')) || [])
  const [onError, setOnError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  // Вызовы форм
  function handleRegisterFormClick() {
    setOpenedPopup({isRegisterFormOpen: true});
    setHideBurger(true)
    setOnError(false)
  }

  function handleLoginFormClick() {
    setOpenedPopup({isLoginFormOpen: true});
    setHideBurger(true)
    setOnError(false)
  }

  function handleSuccessPopupOpen() {
    setOpenedPopup({isSuccessPopupOpen: true});
    setHideBurger(true)
  }

  function closeAllPopups() {
    setOpenedPopup({isRegisterFormOpen: false})
    setOpenedPopup({isLoginFormOpen: false})
    setHideBurger(false)
  }

  //Проверка токена и загрузка начальной инофрмации с сервера
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUserInfo()
        .then((data) => {
          if (data) {
            setCurrentUser(data)
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err)
        });
      api.getInitialCards()
        .then((data) => {
          setSavedNews(data)
          localStorage.setItem('savedNews', JSON.stringify(data))
        })
        .catch((err) => {
          console.error(err)
        });
    }
  }, [history]);


  useEffect(() => {
    tokenCheck();
  }, [tokenCheck, loggedIn]);

  useEffect(() => {
    filterNews(newsData, savedNews)
  }, [savedNews])

  //Регистрация пользователя
  const handleRegister = (email, password, name) => {
    api.register(email, password, name)
      .then((res) => {
        if (res) {
          handleSuccessPopupOpen()
        } else {
          setOnError(true);
          setErrorMessage('Такой пользователь уже есть');
        }
      })
      .catch((err) =>
        console.log(err)
      );
  }

  //Авторизация пользователя
  const handleLogin = (email, password) => {
    api.authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setOpenedPopup({isLoginFormOpen: false})
        } else {
          setOnError(true);
          setErrorMessage('Неверное имя пользователя или пароль');
        }
      })
      .catch(err => console.log(err))
  };

  //Деавторизация пользователя с удалением информации из localstorage
  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('news');
    localStorage.removeItem('savedNews');
    localStorage.removeItem('keyword');
    setLoggedIn(false);
    history.push('/');
  }

  //Добавление карточки с новостью
  function handleCardSave(article) {
    api.postCard(article)
      .then((newCard) => {
        setSavedNews([...savedNews, newCard])
        localStorage.setItem('savedNews', JSON.stringify([...savedNews, newCard]))
      })
      .catch((err) => {
        console.error(err)
      });
  }

  //Обработчик удаления карточки с новостью
  const handleDeleteNews = (article) => {
    //поиск карточки по url в массиве сохраненных с передачей id карточки на сервер
    if (article.url) {
      let articleId = savedNews.find(card => card.link === article.url)._id
      api.deleteCard(articleId)
        .then(() => {
          const newCards = savedNews.filter(card => card._id !== articleId);
          setSavedNews([]);
          setSavedNews(newCards);
          localStorage.setItem('savedNews', JSON.stringify(savedNews))
        })
        .catch((err) => {
          console.error(err)
        });
    } else {
      api.deleteCard(article._id)
        .then(() => {
          const newCards = savedNews.filter(card => card._id !== article._id);
          setSavedNews([]);
          setSavedNews(newCards);
          localStorage.setItem('savedNews', JSON.stringify(savedNews))
        })
        .catch((err) => {
          console.error(err)
        });
    }
  }

// Поиск
  function handleSearch(keyWord) {
    setShowPreloader(true)
    setShowResult(false)
    setShowNotFound(false)
    newsApi.getNews(keyWord)
      .then((data) => {
        console.log(data);
        setNewsData([])
        filterNews(data.articles, savedNews)
        setKeyWord((keyWord.charAt(0).toUpperCase() + keyWord.slice(1).toLowerCase()).trim())
        localStorage.setItem('keyword', JSON.stringify((keyWord.charAt(0).toUpperCase() + keyWord.slice(1).toLowerCase()).trim()))
      })
      .then(() => {
        setShowPreloader(false)
        setShowResult(true)
        setShowNotFound(false)
      })
      .catch(() => {
        setShowPreloader(false)
        setShowNotFound(true)
      })
  }

  //Обработчик массива карточек с сервера News c поиском соттветвия срди сохраненных
  const filterNews = (newsData, savedData) => {
    const filteredNews = newsData.map((item) => {
      const match = savedData.find((item2) => {
        return item.url === item2.link
      })
      item.saved = match !== undefined;
      return item
    })
    if (newsData.length > 0) {
      setNewsData(filteredNews)
      localStorage.setItem('news', JSON.stringify(filteredNews))
      setShowResult(true)
    } else{
    setShowResult(false)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          hideBurger={hideBurger}
          onLogin={handleLoginFormClick}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route exact path="/">
            <Main
              newsData={newsData}
              loggedIn={loggedIn}
              onCardSave={handleCardSave}
              onCardDelete={handleDeleteNews}
              onSearch={handleSearch}
              showPreloader={showPreloader}
              showResult={showResult}
              showNotFound={showNotFound}
              keyWord={keyWord}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
            savedNews={savedNews}
            onCardDelete={handleDeleteNews}
          />
        </Switch>
        <Footer/>
        {openedPopup.isRegisterFormOpen && <Register
          onClose={closeAllPopups}
          onLogin={handleLoginFormClick}
          onRegister={handleRegister}
          onError={onError}
          errorMessage={errorMessage}
        />}
        {openedPopup.isLoginFormOpen && <Login
          onClose={closeAllPopups}
          onRegister={handleRegisterFormClick}
          onLogin={handleLogin}
          onError={onError}
          errorMessage={errorMessage}
        />}
        {openedPopup.isSuccessPopupOpen && <PopupWithInformer
          onClose={closeAllPopups}
          title="Пользователь успешно зарегистрирован!"
        >
          <button onClick={handleLoginFormClick} className="form__link">Войти</button>
        </PopupWithInformer>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
