import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {/* Collage de imágenes en las esquinas */}
        {/*<img src='/images/games/covers/GOWLOGO.jpg' className={`${styles.cornerImage} ${styles.topLeft}`} alt="Arriba Izquierda" />
        <img src='public/images/games/covers/uncharted-5-pc-jogo-cover.jpg' className={`${styles.cornerImage} ${styles.topleft2}`} alt="Arriba Izquierda 2" />

        <img src='public/images/games/covers/TLOU2.jpg' className={`${styles.cornerImage} ${styles.topRight}`} alt="Arriba Derecha" />
        <img src='public/images/games/covers/vicecitylogo.jpg' className={`${styles.cornerImage} ${styles.topleft3}`} alt="Arriba Derecha 3" />
        <img src='/images/games/covers/STREETFIGHTER6LOGO.jpg' className={`${styles.cornerImage} ${styles.bottomLeft}`} alt="Abajo Izquierda" />
        <img src='public/images/games/covers/VENGADORESLOGO.jpg' className={`${styles.cornerImage} ${styles.bottomRight}`} alt="Abajo Derecha" />
        <img src='public/images/games/covers/STARWARS.jpg' className={`${styles.cornerImage} ${styles.topcenter}`} alt="Abajo Derecha 2" />
        <img src='public/images/games/covers/PVSZ.jpg' className={`${styles.cornerImage} ${styles.redredemption}`} alt="Abajo Derecha 3" />
        <img src='public/images/games/covers/multiversuslogo.jpg' className={`${styles.cornerImage} ${styles.bottomright4}`} alt="Abajo Derecha 4" />
        <img src='public/images/games/covers/REDEADREDEMPTION.jpg' className={`${styles.cornerImage} ${styles.bottomright5}`} alt="Abajo Derecha 5" />
        <img src='public/images/games/covers/eldenringlogo.jpg' className={`${styles.cornerImage} ${styles.bottomright6}`} alt="Abajo Derecha 6" />
        */}
        <div className={styles.container}>
          <div className={styles.pageContainer}>
            {title && (
              <div className={styles.pageHeader}>
                <h1>{title}</h1>
              </div>
            )}
            <div className={styles.pageContent}>
              {children}
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Uligames Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};