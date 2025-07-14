// Responsable: Jean (ID 15)
// "Como usuario autenticado, quiero editar mi información de usuario a través de la opción configuración de la página."

import { useState } from 'react';
import styles from './UserSettings.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api/authService';

interface UserData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const UserSettings = () => {
  // Aquí deberías obtener los datos reales del usuario desde la API
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { logout } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías implementar la lógica real para actualizar el perfil
    setMessage({
      type: 'success',
      text: '¡Perfil actualizado correctamente!'
    });
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.newPassword !== userData.confirmPassword) {
      setMessage({
        type: 'error',
        text: '¡Las nuevas contraseñas no coinciden!'
      });
      return;
    }
    try {
      const response = await authService.directResetPassword(userData.email, userData.newPassword);
      if (response.success) {
        setMessage({
          type: 'success',
          text: '¡Contraseña actualizada correctamente!'
        });
        setUserData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        logout();
      } else {
        setMessage({
          type: 'error',
          text: response.error || 'No se pudo actualizar la contraseña.'
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'No se pudo actualizar la contraseña. Intenta de nuevo.'
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Configuración de la cuenta</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Información de perfil
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Seguridad
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      {activeTab === 'profile' ? (
        <form onSubmit={handleProfileUpdate} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Actualizar perfil
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordUpdate} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Contraseña actual</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nueva contraseña</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Actualizar contraseña
          </button>
        </form>
      )}
    </div>
  );
};



