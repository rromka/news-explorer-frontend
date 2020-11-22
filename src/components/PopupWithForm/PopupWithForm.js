import React from 'react';
import './PopupWithForm.css'
import usePopupClose from '../../hooks/usePopupClose';

function PopupWithForm({title, onClose, children, onSubmit}) {

  usePopupClose(onClose);

  return (
    <div className={`popup popup_opened`}>
      <form className="popup__form" onSubmit={onSubmit}>
        <button className="popup__close" type="reset" onClick={onClose}/>
        <p className="popup__title">{title}</p>
        {children}
      </form>
    </div>
  );
}

export default PopupWithForm;
