import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      // await resetPassword(email);
      setMessage('Revisa tu correo electrónico para las instrucciones de restablecimiento de contraseña');
      setEmail('');
    } catch (err) {
      setError('No se pudo enviar el correo de restablecimiento. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>¿Olvidaste tu contraseña?</h1>
          <p>Ingresa tu correo electrónico para restablecer tu contraseña</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.resetButton}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            ¿Recuerdas tu contraseña?{' '}
            <Link to="/login" className={styles.loginLink}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};