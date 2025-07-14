import React, { useState } from 'react';
import { RevenueChart } from '../../components/Admin/RevenueChart';
import { NewsManager } from '../../components/Admin/NewsManager';
import { GameManager } from '../../components/Admin/GameManager';
import { UserManager } from '../../components/Admin/UserManage';
import styles from './AdminDashboard.module.css';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<|'productos' | 'usuarios' | 'noticias' | 'estadisticas'>('productos');

  return (
    <div className={styles.container}>
      <h1>Panel de Administración</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'productos' ? styles.active : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          Productos
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'usuarios' ? styles.active : ''}`}
          onClick={() => setActiveTab('usuarios')}
        >
          Usuarios
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'noticias' ? styles.active : ''}`}
          onClick={() => setActiveTab('noticias')}
        >
          Noticias
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'estadisticas' ? styles.active : ''}`}
          onClick={() => setActiveTab('estadisticas')}
        >
          Estadísticas
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'productos' && <GameManager />}
        {activeTab === 'usuarios' && <UserManager />}
        {activeTab === 'noticias' && <NewsManager />}
        {activeTab === 'estadisticas' && <RevenueChart />}
      </div>
    </div>
  );
};

export default AdminDashboard;
