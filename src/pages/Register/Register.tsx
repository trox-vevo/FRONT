import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Register.module.css';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener mayúsculas, minúsculas y números';
    }

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
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      setRegistrationSuccess(true);
    } catch (err) {
      setErrors({
        email: 'An account with this email already exists',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.registerCard}>
          <div className={styles.header}>
            <h1>¡Registro exitoso!</h1>
            <p>Por favor verifica tu correo electrónico</p>
          </div>
          <div className={styles.verificationMessage}>
            <p>Hemos enviado un correo de verificación a:</p>
            <p className={styles.email}>{formData.email}</p>
            <p>Revisa tu bandeja de entrada y haz clic en el enlace de verificación para activar tu cuenta.</p>
            <div className={styles.verificationActions}>
              <Link to="/login" className={styles.loginLink}>
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          <h1>Crear cuenta</h1>
          <p>Únete a nuestra comunidad gamer hoy</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una contraseña"
              className={errors.password ? styles.inputError : ''}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              className={errors.confirmPassword ? styles.inputError : ''}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>o regístrate con</span>
        </div>

        <div className={styles.socialButtons}>
          <button
  type="button"
  className={styles.socialButton}
  onClick={() => console.log('Google signup')}
  disabled={isLoading}
>
  <img
    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg"
    alt="Google"
    style={{ width: 24, height: 24, marginRight: 8 }}
  />
  Google
  </button>
<button
  type="button"
  className={styles.socialButton}
  onClick={() => console.log('Facebook signup')}
  disabled={isLoading}
>
  <img
    src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg"
    alt="Facebook"
    style={{ width: 24, height: 24, marginRight: 8 }}
  />
  Facebook
</button>
        </div>

        <div className={styles.footer}>
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className={styles.loginLink}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};