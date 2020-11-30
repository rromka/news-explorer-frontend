import {API_KEY, BASE_NEWS_API_URL, NEWS_API_PERIOD} from "./constants";

class NewsApi {
  constructor() {
    this._baseUrl = BASE_NEWS_API_URL;
    this._apiKey = API_KEY;
    this._period = NEWS_API_PERIOD;
  }

//  Приведем дату к нужному формату
  _formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = `0${dd}`;
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = `0${mm}`;
    const yy = date.getFullYear();
    return `${yy}-${mm}-${dd}`;
  }

  getNews(keyWord) {
    let to = new Date();
    let from = new Date();

    from.setDate(from.getDate() - this._period);
    to = this._formatDate(to);
    from = this._formatDate(from);

    return fetch(`${this._baseUrl}/v2/everything?` +
      `q=${encodeURIComponent(keyWord)}&` +
      `from=${from}&` +
      `to=${to}&` +
      `apiKey=${this._apiKey}&` +
      `pageSize=100`)
      .then(res => this._checkServerResponse(res)
      )
  }
}

const newsApi = new NewsApi()

export default newsApi
