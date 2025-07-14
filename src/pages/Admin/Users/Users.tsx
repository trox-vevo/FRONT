// Responsable: Fernando (ID 26)
// "Como administrador, deseo tener una barra de navegación que me facilite la navegación por la aplicación, con los siguientes apartados: Usuarios, Juegos, Noticias y Estadísticas."

import styles from './Users.module.css';

export const AdminUsers = () => {
  return (
    <div className={styles.container}>
      <h1>Admin - Users Management</h1>
      <p>This section will allow admins to view and manage user accounts.</p>
      {/* Aquí irá la funcionalidad de gestión de usuarios para el admin */}
    </div>
  );
};

export default AdminUsers; 