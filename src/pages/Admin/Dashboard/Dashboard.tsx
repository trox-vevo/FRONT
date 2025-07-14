// Responsable: Fernando (IDs 17, 19, 25, 26)
// ID 17: "Como administrador, quiero poder ver el catálogo de juegos disponible en la página."
// ID 19: "Como administrador, quiero poder filtrar los juegos por categoría, fecha de lanzamiento y precios."
// ID 25: "Como administrador, quiero agregar, editar y eliminar noticias."
// ID 26: "Como administrador, deseo tener una barra de navegación que me facilite la navegación por la aplicación, con los siguientes apartados: Usuarios, Juegos, Noticias y Estadísticas."

// Responsable: Alejandro (ID 23)
// ID 23: "Como administrador, deseo ver un gráfico con las ganancias recaudadas por mes."

// Responsable: Jean (ID 24)
// ID 24: "Como administrador, debo poder ver una lista de noticias que se mostrarán en la página."

import { useState } from 'react';
import styles from './Dashboard.module.css';

export const AdminDashboard = () => {
  // Aquí deberías implementar la lógica real para obtener los datos desde la API
  // Por ahora, solo muestra un mensaje si no hay datos
  return (
    <div className={styles.dashboardContainer}>
      <h2>Panel de Administración</h2>
      <p>No hay datos disponibles.</p>
    </div>
  );
}; 