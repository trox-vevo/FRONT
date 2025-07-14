import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGames } from '../../hooks/useGames';
import { newsService } from '../../services/api/newsService';
import { getGameImage } from '../../utils/imageMapping';
import styles from './Home.module.css';

export const Home = () => {
  const navigate = useNavigate();
  const { games, loading: gamesLoading } = useGames();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestGames, setLatestGames] = useState<any[]>([]);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getNews();
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  // Update latest games when games data changes
  useEffect(() => {
    if (games.length > 0) {
      setLatestGames(games.slice(0, 10));
    }
  }, [games]);

  // Set loading to false when both games and news are loaded
  useEffect(() => {
    if (!gamesLoading && news.length > 0) {
      setLoading(false);
    }
  }, [gamesLoading, news]);

  // Auto-advance carousel
  useEffect(() => {
    if (news.length === 0) return;

    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [news]);

  const handlePrevNews = () => {
    if (news.length === 0) return;
    setCurrentNewsIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleNextNews = () => {
    if (news.length === 0) return;
    setCurrentNewsIndex((prev) => (prev + 1) % news.length);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Sección de Carrusel de Noticias */}
      {news.length > 0 && (
        <section className={styles.newsSection}>
          <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
          <div className={styles.carousel}>
            <button 
              className={`${styles.carouselButton} ${styles.prevButton}`}
              onClick={handlePrevNews}
              aria-label="Noticia anterior"
            >
              ‹
            </button>
            
            <div className={styles.carouselContent}>
              {news.map((newsItem, index) => (
                <div
                  key={newsItem.id}
                  className={`${styles.newsCard} ${index === currentNewsIndex ? styles.active : ''}`}
                  style={{
                    transform: `translateX(${(index - currentNewsIndex) * 100}%)`,
                  }}
                >
                  <div className={styles.newsImage}>
                    <img 
                      src="/images/news/default-news.jpg" 
                      alt={newsItem.titulo} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/news/default-news.jpg";
                      }}
                    />
                  </div>
                  <div className={styles.newsInfo}>
                    <span className={styles.newsDate}>
                      {new Date().toLocaleDateString('es-ES')}
                    </span>
                    <h3 className={styles.newsTitle}>{newsItem.titulo}</h3>
                    <p className={styles.newsDescription}>
                      {newsItem.texto.length > 150 
                        ? `${newsItem.texto.substring(0, 150)}...` 
                        : newsItem.texto
                      }
                    </p>
                    <Link to={`/news/${newsItem.id}`} className={styles.readMore}>
                      Leer más
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className={`${styles.carouselButton} ${styles.nextButton}`}
              onClick={handleNextNews}
              aria-label="Siguiente noticia"
            >
              ›
            </button>

            <div className={styles.carouselIndicators}>
              {news.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentNewsIndex ? styles.active : ''}`}
                  onClick={() => setCurrentNewsIndex(index)}
                  aria-label={`Ir a la noticia ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Juegos Recientes */}
      <section className={styles.gamesSection}>
        <div className={styles.sectionHeader}>
          <h2>Últimos Lanzamientos</h2>
          <Link to="/catalog" className={styles.viewAll}>
            Ver todos los juegos
          </Link>
        </div>
        <div className={styles.gamesGrid}>
          {latestGames.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className={styles.gameCard}>
              <div className={styles.gameImage}>
                <img 
                  src={getGameImage(game.nombre || game.title)} 
                  alt={game.nombre || game.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/games/covers/default-game.jpg";
                  }}
                />
                {(game.esta_oferta || game.onSale) && (
                  <span className={styles.discountBadge}>
                    OFERTA
                  </span>
                )}
                <span className={styles.platform}>
                  {game.plataformas?.[0] || game.platform || 'PC'}
                </span>
              </div>
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.nombre || game.title}</h3>
                <div className={styles.gameMeta}>
                  <span className={styles.gamePlatform}>
                    {game.plataformas?.[0] || game.platform || 'PC'}
                  </span>
                  <div className={styles.gamePrice}>
                    <span>${Number(game.precio || game.price || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};