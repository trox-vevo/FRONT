// Responsable: Jean (ID 8)
// "Como usuario, debo poder ver una lista con los juegos mejor valorados."

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gameService } from '../../services/api/gameService';
import type { Game } from '../../types';
import styles from './TopRated.module.css';

export const TopRated = () => {
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRated = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await gameService.getGames({ ordenar: 'rating_desc' });
        if (response.success) {
          setTopRatedGames(response.data.slice(0, 10)); // Top 10
        } else {
          setError('No se pudieron obtener los juegos mejor valorados');
        }
      } catch (err) {
        setError('Error al obtener los juegos mejor valorados');
      } finally {
        setLoading(false);
      }
    };
    fetchTopRated();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Juegos Mejor Valorados</h1>
      <p className={styles.description}>
        Descubre nuestros juegos con mejores calificaciones, elegidos por la comunidad.
      </p>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div className={styles.gameGrid}>
          {topRatedGames.map((game, index) => (
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
                <div className={styles.reviews}>
                  {game.total_calificaciones || 0} reseñas
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