// Responsable: Carlos (ID 13)
// "Como usuario autenticado, debo poder dejar una reseña y calificación a un juego que haya comprado."

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockGames } from '../../services/mockGames';
import styles from './Review.module.css';

export const Review = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = mockGames.find(g => g.id === Number(id));

  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!game) {
    return <div className={styles.notFound}>Juego no encontrado</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock review submission
    console.log('Submitting review:', { gameId: id, ...review });
    setMessage({
      type: 'success',
      text: '¡Reseña enviada con éxito!'
    });
    // Navigate back to game detail after 2 seconds
    setTimeout(() => {
      navigate(`/game/${id}`);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1>Escribe una reseña</h1>
      <div className={styles.gameInfo}>
        <img src={game.imageUrl} alt={game.title} />
        <div>
          <h2>{game.title}</h2>
          <p>{game.platform}</p>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Calificación</label>
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.star} ${star <= review.rating ? styles.active : ''}`}
                onClick={() => setReview(prev => ({ ...prev, rating: star }))}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Tu reseña</label>
          <textarea
            id="comment"
            value={review.comment}
            onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Comparte tu experiencia con este juego..."
            required
            minLength={10}
            maxLength={500}
          />
          <span className={styles.charCount}>
            {review.comment.length}/500 caracteres
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate(`/game/${id}`)}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Enviar reseña
          </button>
        </div>
      </form>
    </div>
  );
};