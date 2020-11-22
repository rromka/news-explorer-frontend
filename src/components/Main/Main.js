import './Main.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import React, {useState} from "react";
import PopupSignup from "../PopupSignup/PopupSignup";
import PopupSignin from "../PopupSignin/PopupSignin";
import PopupWithInformer from "../PopupWithInformer/PopupWithInformer";

function Main() {
  const [openedPopup, setOpenedPopup] = useState({})
  const [hideBurger, setHideBurger] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)

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

  // Демонстрация работы прелоадера и вывода новостей. Все работет после сабмита формы запроса
  function handleSearch(keyWord) {
    setShowResult(false)
    setShowNotFound(false)
    setTimeout(() => {
      setShowPreloader(false)

      if (keyWord === 'not') {
        setShowNotFound(true)
        setShowResult(false)
      } else {

        setShowResult(true)
      }

    }, 2000);

    setShowPreloader(true)
  }


  return (
    <main className="main">
      <Header
        isAutorized={false}
        isSavedNews={false}
        userName='Кусто'
        hideBurger={hideBurger}
        onSignUp={handleSignupFormClick}
      />
      <SearchForm
        sendWord={handleSearch}
      />
      {showPreloader && <Preloader/>}
      {showNotFound && <NotFound/>}
      {showResult && <NewsCardList/>}
      <About/>
      {openedPopup.isSignupFormOpen && <PopupSignup
        onClose={closeAllPopups}
        onSignIn={handleSigninFormClick}
        onSubmit={handleSuccessPopupOpen}
      />}
      {openedPopup.isSigninFormOpen && <PopupSignin
        onClose={closeAllPopups}
        onSignUp={handleSignupFormClick}
      />}
      {openedPopup.isSuccessPopupOpen && <PopupWithInformer
        onClose={closeAllPopups}
        title="Пользователь успешно зарегистрирован!"
      >
        <button onClick={handleSigninFormClick} className="form__link">Войти</button>
      </PopupWithInformer>}
    </main>
  );
}

export default Main;
