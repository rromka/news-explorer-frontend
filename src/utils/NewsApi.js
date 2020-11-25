class NewsApi {
  constructor() {
    this._baseUrl = 'https://newsapi.org/v2/everything';
    this._apiKey = '80a5bbd1a6174d7ab41ced042f5327d2';
    this._period = 7;
  }

_formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;

    const yy = date.getFullYear();

    return `${yy}-${mm}-${dd}`;
  }


  async getNews(keyWord) {
    let response;
    let json;
    let to = new Date();
    let from = new Date();

    from.setDate(from.getDate() - this._period);
    to = this._formatDate(to);
    from = this._formatDate(from);

    const url = `${this._baseUrl}?q=${encodeURIComponent(keyWord)}&from=${from}&to=${to}&apiKey=${this._apiKey}&pageSize=100`;
    try {
      response = await fetch(url);
    } catch (err) {
      throw new Error('Проверьте подключение к сети.');
    }

    try {
      json = await response.json();
    } catch (err) {
      throw new Error('Сервер передал некорректные данные.');
    }

    if (!response.ok) throw new Error(`Сервер вернул ошибку ${response.status} (${response.statusText}).`);

    if (!json.articles.length) throw new Error('Ничего не найдено');

    return json;
  }
}

const newsapi = new NewsApi()

export default newsapi
