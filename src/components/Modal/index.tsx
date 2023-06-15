import React from 'react';
import styles from './Modal.module.scss';
import { TModalProps } from '../../types';
import { useNavigate } from 'react-router-dom';

function Modal(props: TModalProps) {
  const navigate = useNavigate();
  return props.isSuccess ? (
    <div className={styles.modal}>
      <h3 className={styles.title}>Форма успешно отправлена</h3>
      <img src={'assets/icons/Success.svg'} alt="Success" className={styles.image} />
      <button className={styles.successButton} onClick={() => navigate('/')}>
        На главную
      </button>
    </div>
  ) : (
    <div className={styles.modal}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>Ошибка</h3>
        <button className={styles.closeButton} onClick={() => props.setIsOpen(false)} />
      </div>
      <img src={'assets/icons/Error.svg'} alt="Error" className={styles.image} />
      <button className={styles.errorButton} onClick={() => props.setIsOpen(false)}>
        Закрыть
      </button>
    </div>
  );
}

export default Modal;
