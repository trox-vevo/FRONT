import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../../services/api/gameService';
import { reviewService, type Review } from '../../services/api/reviewService';
import type { Game } from '../../types/index';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import { getGameImage, getGameScreenshots, getGameTrailer } from '../../utils/imageMapping';
import styles from './GameDetails.module.css';

export const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, hasPurchasedGame } = useAuth();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await gameService.getGameById(id);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
        showNotification('Error al cargar el juego', 'error');
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!id) return;
      
      try {
        setReviewsLoading(true);
        const response = await reviewService.getGameReviews(id);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchGame();
    fetchReviews();
  }, [id, showNotification]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando juego...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Juego no encontrado</h2>
          <p>El juego que buscas no existe o ha sido removido.</p>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    try {
      setPurchaseStatus('processing');
      await addToCart(game.id.toString());
      setPurchaseStatus('success');
      showNotification('Juego Agregado al Carrito!', 'success');
      
      // Reset status after 2 seconds
      setTimeout(() => setPurchaseStatus('idle'), 2000);
    } catch (error) {
      setPurchaseStatus('error');
      showNotification('Error al agregar al carrito', 'error');
      
      // Reset status after 2 seconds
      setTimeout(() => setPurchaseStatus('idle'), 2000);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showNotification('Por favor inicia sesión para enviar una reseña', 'info');
      return;
    }

    if (!game) return;

    try {
      const response = await reviewService.createReview({
        juego_id: game.id,
        valoracion: newReview.rating,
        comentario: newReview.comment || undefined
      });

      // Add the new review to the list
      setReviews(prev => [response.data, ...prev]);
      setNewReview({ rating: 5, comment: '' });
      showNotification('¡Reseña enviada con éxito!', 'success');
    } catch (error: any) {
      console.error('Error submitting review:', error);
      showNotification(error.response?.data?.error || 'Error al enviar la reseña', 'error');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < rating ? styles.filled : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderPurchaseButton = () => {
    if (!isAuthenticated) {
      return (
        <button 
          className={`${styles.addToCart} ${styles.loginRequired}`}
          onClick={() => navigate('/login', { state: { from: location.pathname } })}
        >
          Inicia sesión para comprar
        </button>
      );
    }

    if (hasPurchasedGame(game.id.toString())) {
      return (
        <button className={`${styles.addToCart} ${styles.purchased}`} disabled>
          Comprado
        </button>
      );
    }

    return (
      <button 
        className={`${styles.addToCart} ${styles[purchaseStatus]}`}
        onClick={handlePurchase}
        disabled={purchaseStatus === 'processing'}
      >
        {purchaseStatus === 'processing' ? 'Procesando...' :
         purchaseStatus === 'success' ? '¡Agregado al carrito!' :
         purchaseStatus === 'error' ? 'Error - Intenta de nuevo' :
         'Agregar al carrito'}
      </button>
    );
  };

  const renderReviewForm = () => {
    if (!isAuthenticated) {
      return (
        <div className={styles.reviewForm}>
          <h3>Escribe una reseña</h3>
          <p className={styles.loginRequired}>Por favor inicia sesión para escribir una reseña</p>
        </div>
      );
    }

    if (!hasPurchasedGame(game.id.toString())) {
      return (
        <div className={styles.reviewForm}>
          <h3>Escribe una reseña</h3>
          <p className={styles.purchaseRequired}>Debes comprar este juego para escribir una reseña</p>
        </div>
      );
    }

    return (
      <div className={styles.reviewForm}>
        <h3>Escribe una reseña</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className={styles.ratingInput}>
            <label>Calificación:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview(prev => ({
                ...prev,
                rating: Number(e.target.value)
              }))}
            >
              {[5, 4, 3, 2, 1].map(rating => (
                <option key={rating} value={rating}>
                  {'★'.repeat(rating)}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({
              ...prev,
              comment: e.target.value
            }))}
            placeholder="Escribe tu reseña..."
            required
          />
          <button type="submit" className={styles.submitReview}>
            Enviar Reseña
          </button>
        </form>
      </div>
    );
  };

  // Obtener datos del juego
  const gameName = game.nombre || game.title || '';
  const gameImage = getGameImage(gameName);
  const gameScreenshots = getGameScreenshots(gameName);
  const gameTrailer = getGameTrailer(gameName);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{gameName}</h1>
        <div className={styles.meta}>
          <span className={styles.platform}>
            {game.plataformas?.[0] || 'PC'}
          </span>
          <div className={styles.rating}>
            {renderStars(Math.round(Number(game.calificacion_promedio) || 0))}
            <span className={styles.ratingNumber}>
              {Number(game.calificacion_promedio)?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <div className={styles.badges}>
            {game.esta_oferta && (
              <span className={`${styles.badge} ${styles.discount}`}>
                OFERTA
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.gameImages}>
            <div className={styles.mainImage}>
              <img 
                src={gameImage}
                alt={gameName}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/games/covers/default-game.jpg";
                }}
              />
              {gameTrailer && (
                <button 
                  className={styles.trailerButton}
                  onClick={() => setShowTrailer(true)}
                >
                  ▶ Ver Trailer
                </button>
              )}
            </div>
            {gameScreenshots.length > 0 && (
              <div className={styles.screenshots}>
                {gameScreenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className={selectedImage === index ? styles.active : ''}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.gameInfo}>
            <div className={styles.priceSection}>
              <div className={styles.price}>
                <span className={styles.currentPrice}>${Number(game.precio || game.price || 0).toFixed(2)}</span>
              </div>
              {renderPurchaseButton()}
            </div>

            <div className={styles.description}>
              <h3>Descripción</h3>
              <p>{game.descripcion || 'Descripción no disponible.'}</p>
            </div>

            <div className={styles.details}>
              <h3>Detalles del Juego</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Desarrollador:</span>
                  <span className={styles.value}>{game.desarrollador || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Publisher:</span>
                  <span className={styles.value}>{game.publisher || 'N/A'}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Plataformas:</span>
                  <span className={styles.value}>
                    {game.plataformas?.join(', ') || 'PC'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Géneros:</span>
                  <span className={styles.value}>
                    {game.generos?.join(', ') || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal del Trailer */}
        {showTrailer && gameTrailer && (
          <div className={styles.trailerModal} onClick={() => setShowTrailer(false)}>
            <div className={styles.trailerContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.closeTrailer}
                onClick={() => setShowTrailer(false)}
              >
                ×
              </button>
              <iframe
                src={gameTrailer}
                title={`Trailer de ${gameName}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className={styles.reviewsSection}>
          <h3>Reseñas ({reviews.length})</h3>
          {reviewsLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Cargando reseñas...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className={styles.reviews}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewerName}>{review.usuario_nombre || 'Usuario'}</span>
                    <div className={styles.reviewRating}>
                      {renderStars(review.valoracion)}
                    </div>
                  </div>
                  {review.comentario && (
                    <p className={styles.reviewComment}>{review.comentario}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noReviews}>No hay reseñas aún. ¡Sé el primero en reseñar!</p>
          )}
          
          {renderReviewForm()}
        </div>
      </div>
    </div>
  );
};