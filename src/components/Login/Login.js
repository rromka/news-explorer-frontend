import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useInput from "../../hooks/useValidation";

function Login({onClose, onRegister, onLogin}) {

  const email = useInput('', {isEmail: true})
  const password = useInput('', {minLength: 8})

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email.value, password.value)
  }

  return (
    <PopupWithForm
      name="signin"
      title="Вход"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        Email
        <input id="email"
               className="popup__input form__input"
               type="email"
               name="email"
               placeholder="Email"
               required
               value={email.value}
               onChange={email.onChange}
               onBlur={email.onBlur}
        />
        {(email.isInInput && email.isEmail) && <span className="popup__input_type_error">{email.errorText}</span>}
      </label>

      <label className="form__field">
        Пароль
        <input id='password'
               className="popup__input form__input"
               name='password'
               type='password'
               placeholder="Введите пароль"
               required
               value={password.value}
               onChange={password.onChange}
               onBlur={password.onBlur}
        />
        {(password.isInInput && password.minLength) && <span className="popup__input_type_error">Неверный пароль</span>}
      </label>
      <button type="submit"
              className={`popup__button button
               ${(!email.isInputValid || !password.isInputValid) ? 'popup__button_disabled' : ''}`}
              disabled={!email.isInputValid || !password.isInputValid}>
        Войти
      </button>
      <p className='form__links'>
        или
        <button onClick={onRegister} className="form__link">Зарегистрироваться</button>
      </p>
    </PopupWithForm>
  );
}

export default Login;
