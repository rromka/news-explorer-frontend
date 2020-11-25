import React, {useCallback, useEffect, useState} from "react";
import {Switch, Route, useHistory} from 'react-router-dom';
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";
import PopupSignup from "../PopupSignup/PopupSignup";
import PopupSignin from "../PopupSignin/PopupSignin";
import PopupWithInformer from "../PopupWithInformer/PopupWithInformer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {

  const [openedPopup, setOpenedPopup] = useState({})
  const [hideBurger, setHideBurger] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);

  const newsData = JSON.parse(localStorage.getItem('news'))
  const [currentUser, setCurrentUser] = useState({})
  const history = useHistory();

  // Вызовы форм
  function handleSignupFormClick() {
    setOpenedPopup({isSignupFormOpen: true});
    setHideBurger(true)
  }

  function handleSigninFormClick() {
    setOpenedPopup({isSigninFormOpen: true});
    setHideBurger(true)
  }

  function handleSuccessPopupOpen() {
    setOpenedPopup({isSuccessPopupOpen: true});
    setHideBurger(true)
  }


  function closeAllPopups() {
    setOpenedPopup({isSignupFormOpen: false})
    setOpenedPopup({isSigninFormOpen: false})
    setHideBurger(false)
  }


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
    }
  }, [history]);


  useEffect(() => {
    tokenCheck();
  }, [tokenCheck, loggedIn]);



  const handleRegister = (email, password, name) => {
    api.register(email, password, name)
      .then((res) => {

        if (res) {
          handleSuccessPopupOpen()
        } else {
          // setOnError(true);
          // setInfoTooltipMessage('Что-то пошло не так! Попробуйте еще раз');
          // setIsInfoTooltipOpen(true)
        }
      })
      .catch(err => console.log(err));
  }

  const handleLogin = (email, password) => {

    api.authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setOpenedPopup({isSigninFormOpen: false})
        } else {
          console.error('Ошибка');
          return
        }
      })
      .catch(err => console.log(err))
  };

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main
          data={newsData}
          onLogout={handleSignOut}
          loggedIn={loggedIn}
          onLogin={handleLogin}
          onSignupFormClick={handleSignupFormClick}
          />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          loggedIn={loggedIn}
          component={SavedNews}
          onLogout={handleSignOut}
        />
      </Switch>
      <Footer/>
      {openedPopup.isSignupFormOpen && <PopupSignup
        onClose={closeAllPopups}
        onSignIn={handleSigninFormClick}
        onSubmit={handleRegister}
      />}
      {openedPopup.isSigninFormOpen && <PopupSignin
        onClose={closeAllPopups}
        onSignUp={handleSignupFormClick}
        onSubmit={handleLogin}
      />}
      {openedPopup.isSuccessPopupOpen && <PopupWithInformer
        onClose={closeAllPopups}
        title="Пользователь успешно зарегистрирован!"
      >
        <button onClick={handleSigninFormClick} className="form__link">Войти</button>
      </PopupWithInformer>}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
