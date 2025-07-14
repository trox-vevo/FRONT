import React, { useState, useEffect } from 'react';
import styles from './GameManager.module.css'; // Reutiliza el CSS para mantener coherencia
import { userService } from '../../services/api/userService';

export const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    correo: '',
    estado: 'true',
    password: '', // Nuevo campo para la contraseña
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError('No se pudieron obtener los usuarios');
      }
    } catch (err) {
      setError('Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editing && form.id) {
        // Editar usuario
        const response = await userService.updateUser(form.id, {
          nombre: form.nombre,
          estado: form.estado === 'true',
        });
        if (!response.success) setError(response.message || 'No se pudo editar el usuario');
      } else {
        // Agregar usuario (nombre, correo, estado, password)
        const response = await userService.addUser({
          nombre: form.nombre,
          correo: form.correo,
          estado: form.estado === 'true',
          password: form.password, // Enviar contraseña
        });
        if (!response.success) setError(response.message || 'No se pudo agregar el usuario');
      }
      await fetchUsers();
      setForm({ id: '', nombre: '', correo: '', estado: 'true', password: '' });
      setEditing(false);
    } catch (err) {
      setError('Error al guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const user = users.find((u: any) => u.id === id);
    if (user) {
      setForm({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        estado: user.estado ? 'true' : 'false',
      });
      setEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.deleteUser(id);
      if (!response.success) setError(response.message || 'No se pudo eliminar el usuario');
      await fetchUsers();
      if (editing && form.id === id) {
        setForm({ id: '', nombre: '', correo: '', estado: 'true' });
        setEditing(false);
      }
    } catch (err) {
      setError('Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gestión de Usuarios</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleAddOrEditUser}>
          <h3>{editing ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              required
              placeholder="Nombre completo"
              value={form.nombre || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              name="correo"
              type="email"
              required={!editing}
              placeholder="Correo electrónico"
              value={form.correo || ''}
              onChange={handleInputChange}
              disabled={editing}
            />
          </div>
          {/* Campo de contraseña solo al agregar usuario */}
          {!editing && (
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={form.password || ''}
                onChange={handleInputChange}
                minLength={6}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              required
              value={form.estado}
              onChange={handleInputChange}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editing ? 'Guardar Cambios' : 'Agregar Usuario'}
            </button>
            {editing && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  setForm({ id: '', nombre: '', correo: '', estado: 'true' });
                  setEditing(false);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      <div className={styles.gamesList}>
        {users.map((user: any) => (
          <div key={user.id} className={styles.gameCard}>
            <div className={styles.gameContent}>
              <div className={styles.gameHeader}>
                <h3>{user.nombre}</h3>
                <span className={`${styles.status} ${user.estado ? styles.published : styles.draft}`}>
                  {user.estado ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className={styles.meta}>
                <span>Correo: {user.correo}</span>
                {/* Si tienes roles, puedes mostrar aquí el rol */}
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => handleEdit(user.id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No hay usuarios registrados.
          </div>
        )}
      </div>
    </div>
  );
};