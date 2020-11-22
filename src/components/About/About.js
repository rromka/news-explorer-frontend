import './About.css';
import about from '../../images/about.png'

function About() {
  return (
    <section className="about page__section">
      <img className="about__img" src={about} alt="Фотография автора"/>
      <div className="about__description">
        <h3 className="page__title">Об авторе</h3>
        <p className="about__text">Тьма, пришедшая со Средиземного моря, накрыла ненавидимый прокуратором
          город.
        </p>
        <p className="about__text">Исчезли висячие мосты, соединяющие храм со страшной Антониевой башней, опустилась с неба бездна и
          залила крылатых богов над гипподромом, Хасмонейский дворец с бойницами, базары, караван-сараи, переулки,
          пруды...
        </p>
        <p className="about__text">Пропал Ершалаим - великий город, как будто не существовал на свете. Все пожрала тьма, напугавшая все
          живое в Ершалаиме и его окрестностях. Странную тучу принесло со стороны моря к концу дня, четырнадцатого дня
          весеннего месяца нисана.
        </p>
        <p className="about__text">Моряк Кусто</p>
      </div>
    </section>
  );
}

export default About;
