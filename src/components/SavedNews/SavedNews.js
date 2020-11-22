import React from "react";
import './SavedNews.css';
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Header from "../Header/Header";

function SavedNews() {
  return (
    <main className="">
      <Header
        isAutorized={true}
        isSavedNews={true}
        userName='Кусто'
      />
      <SavedNewsHeader
        userName='Кусто'
        newsTags={['котейки', 'песики']}
        newsCount='5'
      />
      <NewsCardList
        isSavedNews={true}
      />
    </main>
  );
}

export default SavedNews;
