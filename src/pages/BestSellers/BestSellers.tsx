import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gameService } from '../../services/api/gameService';
import type { Game } from '../../types';
import styles from './BestSellers.module.css';

export const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usar el servicio real, ordenar por calificación descendente
        const response = await gameService.getGames({ ordenar: 'rating_desc' });
        if (response.success) {
          setBestSellers(response.data.slice(0, 10)); // Top 10
        } else {
          setError('No se pudieron obtener los juegos más vendidos');
        }
      } catch (err) {
        setError('Error al obtener los juegos más vendidos');
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Más Vendidos</h1>
      <p className={styles.description}>
        Descubre nuestros juegos más populares, elegidos por nuestra comunidad de jugadores.
      </p>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div className={styles.gameGrid}>
          {bestSellers.map((game, index) => (
            <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
              <div className={styles.rank}>{index + 1}</div>
              <div className={styles.gameImageContainer}>
                <img src={game.imagen || '/images/games/covers/default-game.jpg'} alt={game.nombre} className={styles.gameImage} />
                {game.esta_oferta && (
                  <span className={styles.saleBadge}>OFERTA</span>
                )}
              </div>
              <div className={styles.gameInfo}>
                <h3>{game.nombre}</h3>
                <div className={styles.gameMeta}>
                  <span className={styles.platform}>{game.plataformas?.[0] || 'PC'}</span>
                  <span className={styles.rating}>★ {Number(game.calificacion_promedio)?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className={styles.gamePrice}>
                  <span>${Number(game.precio || 0).toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};