import type { GameCardProps } from '../../types/game';
import { getGameImage } from '../../utils/imageMapping';
import styles from './GameCard.module.css';

export const GameCard: React.FC<GameCardProps> = ({ game, onAddToCart }) => {
  // Usar el mapeo de imágenes para obtener la imagen correcta
  const imageUrl = getGameImage(game.nombre || game.title);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={game.nombre || game.title} 
          className={styles.image}
          onError={(e) => {
            // Si la imagen no existe, usar una imagen por defecto
            const target = e.target as HTMLImageElement;
            target.src = '/images/games/covers/default-game.jpg';
          }}
        />
        {(game.esta_oferta || game.onSale) && (
          <div className={styles.discountBadge}>
            OFERTA
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{game.nombre || game.title}</h3>
        <p className={styles.price}>${Number(game.precio || game.price || 0).toFixed(2)}</p>
        <div className={styles.platform}>
          {game.plataformas?.[0] || game.platform || 'PC'}
        </div>
        {onAddToCart && (
          <button 
            className={styles.addToCart}
            onClick={() => onAddToCart(game)}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}; 