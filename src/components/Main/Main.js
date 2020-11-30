import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import React from "react";

function Main({loggedIn,
                onCardSave,
                onCardDelete,
                onSearch,
                showNotFound,
                showPreloader,
                showResult,
                newsData,
                keyWord})
{
  return (
      <main className="main">
        <SearchForm
          onSearch={onSearch}
          keyWord = {keyWord}
        />
        {showPreloader && <Preloader/>}
        {showNotFound && <NotFound/>}
        {showResult && <NewsCardList
          keyWord = {keyWord}
          loggedIn = {loggedIn}
          data={newsData}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
        />}
        <About/>
      </main>
  );
}

export default Main;
