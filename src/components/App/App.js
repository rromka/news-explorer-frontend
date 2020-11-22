import React from "react";
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";


function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/saved-news">
          <SavedNews/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
