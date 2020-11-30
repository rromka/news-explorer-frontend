import './SavedNewsHeader.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useContext, useEffect, useState} from "react";


function SavedNewsHeader({newsTags, newsCount}) {

  const currentUser = useContext(CurrentUserContext)
  const [tagsInfo, setTagsInfo] = useState('ключевые слова не найдены')
  const [word, setWord] = useState('сохраненных статей')

  //Обработчик вывода информации в блок
  const savedNewsInformer = () => {

    const keysObj = {};
    newsTags.forEach((item) => {
      const key = item;
      keysObj[key] = keysObj[key] + 1 || 1;
    });

    let keysArr = Object.entries(keysObj);
    const keysCounter = keysArr.length;

    if (keysCounter <= 3) {
      keysArr.sort((a, b) => b[1] - a[1]);
      keysArr = keysArr.map((key) => key[0]);

      if (keysCounter === 0) setTagsInfo('ключевые слова не найдены');
      else if (keysCounter === 1) setTagsInfo(`${keysArr[0]}`);
      else if (keysCounter === 2) setTagsInfo(`${keysArr[0]} и ${keysArr[1]}`);
      else if (keysCounter === 3) setTagsInfo(`${keysArr[0]}, ${keysArr[1]} и ${keysArr[2]}`);
    } else {
      let firstKey = ['', 0];
      let secondKey = firstKey.slice();
      keysArr.forEach((currentKey) => {
        if (currentKey[1] > firstKey[1]) {
          secondKey = firstKey;
          firstKey = currentKey;
        } else if (currentKey[1] > secondKey[1]) {
          secondKey = currentKey;
        }
      });
      setTagsInfo(`${firstKey[0]}, ${secondKey[0]} и ${keysCounter - 2} другим`);
    }
  }

  const wordChangeHandler = () => {
    switch (newsCount) {
      case 0:
        setWord('сохраненных статей')
        break
      case 1:
        setWord('сохраненная статья')
        break
      case 2 || 3 || 4:
        setWord('сохраненные статьи')
        break
      case 3:
        setWord('сохраненные статьи')
        break
      case 4:
        setWord('сохраненные статьи')
        break
    }
  }

  useEffect(() => {
    savedNewsInformer()
    wordChangeHandler()
  }, [newsCount, tagsInfo, word])

  return (
    <section className="savednews page__section">
      <p className="savednews__subtitle">Сохраненные статьи</p>
      <h3 className="page__title">{`${currentUser.name}, у вас ${newsCount} ${word} `}</h3>
      <p className="savednews__description">По ключевым словам: <span
        className="savednews__description-span">{tagsInfo}</span></p>
    </section>
  );
}

export default SavedNewsHeader;
