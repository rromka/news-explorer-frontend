/** @class отвечает за взаимодействие с сервером */
// import {MAIN_API} from "./constants";

class MainApi {
  /**
   * @constructor
   */
  constructor() {
    this.url = 'http://api.nsexplo.students.nomoreparties.co'
  }

  /**
   * Проверяет ответ сервера
   * @private
   * @param {Object} res - ответ сервера
   */
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  /**
   * Получает массив карточек с сервера
   * @public
   */
  getInitialCards() {
    return fetch(`${this.url}/articles`, {headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }})
      .then(res => this._checkServerResponse(res)
      )

  }


  /**
   * Получает данные пользователя с сервера
   * @public
   */
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => this._checkServerResponse(res))

  }

  /**
   * Передает данные добавленной карточки на сервер
   * @public
   * @param {Object} data - Данные карточки
   */
  postCard(data) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => this._checkServerResponse(res))
  }

  /**
   * Удаляет данные карточки с сервера
   * @public
   * @param {string} id - ID карточки
   */
  deleteCard(id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._checkServerResponse(res))
  }

  register = (email, password, name) => {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, name})
    })
      .then((res) => {
        if (res.ok) {
          return res
        } else {
          console.error('400 ошибка')
          throw res;
        }
      })
      .then((res => res.json()))
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };


  authorize = (email, password) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then((response => response.json()))

      .then((data) => {
        if (!data.token) {
          console.error('Ошибка авторизации')
        } else {
          localStorage.setItem('token', data.token);
          return data;
        }
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  };

}

//Новый экземпляр API
const api = new MainApi()

export default api
