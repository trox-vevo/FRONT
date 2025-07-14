import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api/authService';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener mayúsculas, minúsculas y números';
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }
    const token = searchParams.get('token');
    if (!token) {
      setError('El enlace de restablecimiento es inválido o ha expirado');
      return;
    }
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, formData.password);
      if (response.success) {
        logout();
        navigate('/login', {
          state: { message: 'La contraseña se ha restablecido correctamente. Por favor, inicia sesión con tu nueva contraseña.' }
        });
      } else {
        setError(response.error || 'No se pudo restablecer la contraseña.');
      }
    } catch (err) {
      setError('No se pudo restablecer la contraseña. El enlace puede haber expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Restablecer contraseña</h1>
          <p>Ingresa tu nueva contraseña abajo</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu nueva contraseña"
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu nueva contraseña"
              className={errors.confirmPassword ? styles.inputError : ''}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.resetButton}
            disabled={isLoading}
          >
            {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};