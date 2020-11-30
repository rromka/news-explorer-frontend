require('dotenv').config();
const { NODE_ENV} = process.env;

const NUMBER_ARTICLES_FOR_DISPLAY = 3;
const BASE_NEWS_API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co/news/' : 'https://newsapi.org/';
const API_KEY = '80a5bbd1a6174d7ab41ced042f5327d2';
const NEWS_API_PERIOD = 7;
const NEWS_IMAGE_PLACEHOLDER = 'https://sitekid.ru/imgn/183/92.jpg'
// const MAIN_API = NODE_ENV === 'production' ? 'https://api.nsexplo.students.nomoreparties.co/' : 'https://api.nsexplo.students.nomoreparties.co/'

export {
  NUMBER_ARTICLES_FOR_DISPLAY,
  BASE_NEWS_API_URL,
  API_KEY,
  NEWS_API_PERIOD,
  NEWS_IMAGE_PLACEHOLDER,
  // MAIN_API
};
