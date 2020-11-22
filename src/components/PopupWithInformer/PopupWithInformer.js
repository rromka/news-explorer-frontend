import React from 'react';
import '../PopupWithForm/PopupWithForm.css'
import usePopupClose from '../../hooks/usePopupClose';

function PopupWithInformer({title, onClose, children}) {

  usePopupClose(onClose);

  return (
    <div className={`popup popup_opened`}>
      <div className="popup__form">
        <button className="popup__close" type="reset" onClick={onClose}/>
        <p className="popup__title">{title}</p>
        {children}
      </div>
    </div>
  );
}

export default PopupWithInformer;
