import React, {useEffect, useState} from "react";
import './SavedNews.css';
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Header from "../Header/Header";
import api from "../../utils/MainApi";

function SavedNews({loggedIn, onLogout}) {

  const [savedData, setSavedData] = useState([])

  const renderCards = () =>{
    api.getInitialCards()
      .then((data) => {
        setSavedData(data)
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      });
  }

  useEffect(()=>{
    renderCards()
  }, [])


  return (
    <main className="">
      <Header
        loggedIn={loggedIn}
        onSignOut={onLogout}
        isSavedNews={true}
      />
      <SavedNewsHeader
        newsTags={['котейки', 'песики']}
        newsCount={savedData.length}
      />
      <NewsCardList
        isSavedNews={true}
        data={savedData}
      />
    </main>
  );
}

export default SavedNews;
