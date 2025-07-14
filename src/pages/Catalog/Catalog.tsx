import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../../hooks/useGames';
import type { Game } from '../../types';
import styles from './Catalog.module.css';

export const Catalog = () => {
  const { games, loading, error, refetch } = useGames();
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    genre: '',
    platform: '',
    onSale: false,
    searchQuery: ''
  });

  // Get unique genres and platforms from real data
  const genres = Array.from(new Set(games.flatMap(game => game.categoria_nombre || game.generos || [])));
  const platforms = Array.from(new Set(games.flatMap(game => game.plataformas || [])));

  useEffect(() => {
    let filtered = [...games];

    // Aplicar filtro de búsqueda
    if (filters.searchQuery) {
      filtered = filtered.filter(game =>
        game.nombre?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        game.descripcion?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Aplicar filtro de rango de precio
    filtered = filtered.filter(game => {
      const actualPrice = game.precio || 0; 
      return actualPrice >= filters.priceRange[0] && actualPrice <= filters.priceRange[1];
    });

    // Aplicar filtro de género
    if (filters.genre) {
      filtered = filtered.filter(game => 
        game.categoria_nombre === filters.genre || 
        game.generos?.includes(filters.genre)
      );
    }

    // Aplicar filtro de plataforma
    if (filters.platform) {
      filtered = filtered.filter(game => 
        game.plataformas?.includes(filters.platform)
      );
    }

    // Aplicar filtro de venta
    if (filters.onSale) {
      filtered = filtered.filter(game => game.esta_oferta);
    }

    setFilteredGames(filtered);
  }, [filters, games]);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <h3>Rango de precio</h3>
            <div className={styles.priceRange}>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              />
              <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Plataforma</h3>
            <select
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
            >
              <option value="">Todas las plataformas</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3>Género</h3>
            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
            >
              <option value="">Todos los géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3>Juegos en oferta</h3>
            <select
                value={filters.onSale ? 'onSale' : ''}
                onChange={(e) => handleFilterChange('onSale', e.target.value === 'onSale')}
            >
              <option value="">Todos los juegos</option>
              <option value="onSale">Solo juegos en oferta</option>
            </select>
          </div>
        </aside>

        <main className={styles.gamesGrid}>
          {loading ? (
            <div className={styles.loading}>
              <p>Cargando juegos...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={refetch}>Reintentar</button>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className={styles.noResults}>
              <p>No se encontraron juegos con los filtros seleccionados.</p>
            </div>
          ) : (
            filteredGames.map(game => (
              <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
                <div className={styles.gameImageContainer}>
                  <img 
                    src={`/images/games/covers/${game.nombre?.toLowerCase().replace(/\s+/g, '')}.jpg`} 
                    alt={game.nombre} 
                    className={styles.gameImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/games/covers/default-game.jpg";
                    }}
                  />
                  {game.esta_oferta && (
                    <span className={styles.saleBadge}>
                      OFERTA
                    </span>
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
            ))
          )}
        </main>
      </div>
    </>
  );
};