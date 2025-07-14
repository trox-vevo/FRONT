// Responsable: Fernando (ID 25)
// "Como administrador, quiero agregar, editar y eliminar noticias."

import styles from './News.module.css';

export const AdminNews = () => {
  return (
    <div className={styles.container}>
      <h1>Admin - News Management</h1>
      <p>This section will allow admins to add, edit, and delete news articles.</p>
      {/* Aquí irá la funcionalidad de gestión de noticias para el admin */}
    </div>
  );
};

export default AdminNews; 