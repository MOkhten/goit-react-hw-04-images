import { useEffect } from "react";
import css from './Modal.module.css'

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal} >
        <img src={image} alt="" />
      </div>
    </div>
  );
};

 
 