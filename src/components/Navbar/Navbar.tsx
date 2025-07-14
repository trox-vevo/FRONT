import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';
import logo from '/src/assets/logo.png';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Determinar si el usuario es admin
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@uligames.com';
  const isAdmin = user && user.correo === ADMIN_EMAIL;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitch = () => {
    if (location.pathname.startsWith('/admin')) {
      navigate('/'); // Cambia '/' por la ruta principal de usuario si es diferente
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <img
          src={logo}
          alt="Logo Uligames"
          className={styles.logo}
        />
        <Link to="/" className={styles.brand} aria-label="Inicio">
          Uligames
        </Link>

        <div className={styles.navLinks} role="menubar">
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Inicio
          </Link>
          <Link 
            to="/catalog" 
            className={`${styles.navLink} ${isActive('/catalog') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/catalog') ? 'page' : undefined}
          >
            Catalogo
          </Link>
          <Link 
            to="/best-sellers" 
            className={`${styles.navLink} ${isActive('/best-sellers') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/best-sellers') ? 'page' : undefined}
          >
            Los más vendidos
          </Link>
          <Link 
            to="/top-rated" 
            className={`${styles.navLink} ${isActive('/top-rated') ? styles.active : ''}`}
            role="menuitem"
            aria-current={isActive('/top-rated') ? 'page' : undefined}
          >
            Más valorados 
          </Link>
        </div>

        <div className={styles.authLinks}>
          {isAuthenticated ? (
            <>
              {!location.pathname.startsWith('/admin') && (
                <>
                  <Link 
                    to="/cart" 
                    className={styles.navLink}
                    role="menuitem"
                    aria-label="Shopping Cart"
                  >
                    Carrito de compras
                  </Link>
                  <Link 
                    to="/settings" 
                    className={styles.navLink}
                    role="menuitem"
                    aria-label="User Settings"
                  >
                    Configuración
                  </Link>
                </>
              )}
              
              {/* Mostrar el botón solo si es admin */}
              {isAdmin && (
                <button
                  onClick={handleSwitch}
                  className={styles.navLink}
                  style={{
                    background: 'blue',
                    color: 'white',
                    border: '2px solid blue',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}
                  role="menuitem"
                >
                  {location.pathname.startsWith('/admin') ? 'Ir a Usuario' : 'Ir a Administrador'}
                </button>
              )}
              <button
                onClick={handleLogout}
                className={`${styles.navLink} ${styles.logoutButton}`}
                role="menuitem"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={styles.navLink}
                role="menuitem"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className={`${styles.navLink} ${styles.register}`}
                role="menuitem"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 