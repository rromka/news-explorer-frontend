import './SavedNewsHeader.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext} from "react";



function SavedNewsHeader({newsTags, newsCount}) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <section className="savednews page__section">
      <p className="savednews__subtitle">Сохраненные статьи</p>
      <h3 className="page__title">{`${currentUser.name}, у вас ${newsCount} сохраненных статей`}</h3>
      <p className="savednews__description">По ключевым словам: <span
        className="savednews__description-span">{newsTags.join(', ')}</span></p>
    </section>
  );
}

export default SavedNewsHeader;
