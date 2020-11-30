import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useInput from "../../hooks/useValidation";

function Register({onClose, onLogin, onRegister, errorMessage, onError}) {

  const email = useInput('', {isEmail: true})
  const password = useInput('', {minLength: 8})
  const name = useInput('', {minLength: 3})

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email.value, password.value, name.value)
  }

  return (
    <PopupWithForm
      name="signup"
      title="Регистрация"
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
        {(password.isInInput && password.minLength) &&
        <span className="popup__input_type_error">{password.errorText}</span>}
      </label>

      <label className="form__field">
        Имя
        <input id="name"
               className="popup__input form__input"
               type="text"
               name="name"
               placeholder="Введите свое имя"
               required
               value={name.value}
               onChange={name.onChange}
               onBlur={name.onBlur}
        />
        {(name.isInInput && name.minLength) && <span className="popup__input_type_error">{name.errorText}</span>}
      </label>
      {onError && <span className="popup__form_type_error">{errorMessage}</span>}
      <button type="submit"
              className={`popup__button button
               ${(!email.isInputValid || !password.isInputValid || !name.isInputValid) ? 'popup__button_disabled' : ''}`}
              disabled={!email.isInputValid || !password.isInputValid || !name.isInputValid}>
        Зарегистрироваться
      </button>
      <p className='form__links'>
        или
        <button onClick={onLogin} className="form__link">Войти</button>
      </p>
    </PopupWithForm>
  );
}

export default Register;
