import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    const oobCode = searchParams.get('oobCode');
    if (!oobCode) {
      setError('El enlace de verificación es inválido o ha expirado');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await verifyEmail(oobCode);
      setMessage('¡Correo verificado exitosamente! Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Correo verificado exitosamente. Por favor, inicia sesión.' }
        });
      }, 3000);
    } catch (err) {
      setError('No se pudo verificar el correo. El enlace puede haber expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await resendVerificationEmail();
      setMessage('¡Correo de verificación enviado! Por favor revisa tu bandeja de entrada.');
    } catch (err) {
      setError('No se pudo enviar el correo de verificación. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h1>Verifica tu correo electrónico</h1>
          <p>Por favor, verifica tu dirección de correo para continuar</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.content}>
          <p className={styles.description}>
            Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
          </p>

          <div className={styles.actions}>
            {searchParams.has('oobCode') ? (
              <button
                onClick={handleVerify}
                className={styles.verifyButton}
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Verificar correo'}
              </button>
            ) : (
              <button
                onClick={handleResend}
                className={styles.resendButton}
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Reenviar correo de verificación'}
              </button>
            )}
          </div>

          <div className={styles.footer}>
            <p>
              ¿No recibiste el correo? Revisa tu carpeta de spam o{' '}
              <button
                onClick={handleResend}
                className={styles.resendLink}
                disabled={isLoading}
              >
                haz clic aquí para reenviar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};