import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.message}>
          ¡Ups! La página que buscas parece haber desaparecido.
          ¿Quizás está jugando a las escondidas?
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate('/catalog')}
          >
            Ver juegos
          </button>
        </div>
      </div>
    </div>
  );
};