import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Login.module.css';
import logo from '/src/assets/logo.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showNotification('Por favor completa todos los campos', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      showNotification('¡Inicio de sesión exitoso!', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      showNotification(
        error instanceof Error ? error.message : 'Error al iniciar sesión',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />
      <div className={styles.loginBox}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className={styles.note}>
          Nota: Este es un inicio de sesión de demostración. Usa cualquier correo y contraseña para probar.
        </p>
        <p className={styles.forgotPassword}>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </p>
        <p className={styles.createAcc}>
          ¿No tienes cuenta? <Link to="/register">Crea una</Link>
        </p>
      </div>
    </div>
  );
};