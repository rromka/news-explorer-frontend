import {useEffect} from 'react';

export default function usePopupClose(onClose) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    function closeByClick(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', closeByClick);
    return () => {
      document.removeEventListener('click', closeByClick);
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [onClose])
}