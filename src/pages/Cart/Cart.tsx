// Responsable: Sergio (IDs 10, 11, 12)
// ID 10: "Como usuario autenticado, debo poder agregar un juego a mi carrito de compras, seleccionando el botón de comprar."
// ID 11: "Como usuario autenticado, deseo eliminar ítems de mi carrito de compras, en caso me arrepienta de la selección."
// ID 12: "Como usuario autenticado, debo poder realizar el pago de los ítems que se encuentren en mi carrito de compras."

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Cart.module.css';

export const Cart = () => {
  const { items, removeFromCart, getTotal, checkout, cleanCorruptedCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle cart errors
  useEffect(() => {
    try {
      // Validate cart items
      const validItems = items.filter(item => 
        item && 
        item.gameId && 
        item.title && 
        typeof item.price === 'number' && 
        item.quantity > 0
      );
      
      if (validItems.length !== items.length) {
        setError('Algunos elementos del carrito son inválidos. Por favor, recarga la página.');
      }
    } catch (err) {
      setError('Error al cargar el carrito. Por favor, recarga la página.');
    }
  }, [items]);

  // Estado para el formulario de tarjeta
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    nombre: '',
    numero: '',
    fechaVencimiento: '',
    cvv: ''
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process checkout through the API
      const result = await checkout();
      
      setShowSuccess(true);
      showNotification('¡Pago con tarjeta exitoso! Las claves de tus juegos han sido enviadas a tu correo.', 'success');
      setShowCardForm(false);
      setCardData({ nombre: '', numero: '', fechaVencimiento: '', cvv: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Checkout error:', error);
      showNotification('Error al procesar el pago. Por favor, intenta de nuevo.', 'error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (error) {
    return (
      <div className={styles.emptyCart}>
        <h2>Error al cargar el carrito</h2>
        <p>{error}</p>
        <button 
          className={styles.continueShopping}
          onClick={() => {
            setError(null);
            cleanCorruptedCart();
          }}
        >
          Limpiar carrito
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos juegos a tu carrito para comenzar a comprar!</p>
        <button 
          className={styles.continueShopping}
          onClick={() => navigate('/catalog')}
        >
          Seguir comprando
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Carrito de compras</h1>
      
      {showSuccess && (
        <div className={styles.successMessage}>
          <h3>¡Compra exitosa!</h3>
          <p>Las claves de tus juegos han sido enviadas a tu correo: {user?.email || 'tu correo registrado'}</p>
        </div>
      )}

      <div className={styles.cartItems}>
        {items.map(item => (
          <div key={item.gameId} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3>{item.title}</h3>
              <p className={styles.platform}>{item.platform}</p>
              <p className={styles.price}>${(Number(item.price) || 0).toFixed(2)}</p>
            </div>
            <div className={styles.itemActions}>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.gameId)}
                disabled={isCheckingOut}
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
        <button
          className={styles.checkoutButton}
          style={{ marginTop: '10px', background: '#1976d2' }}
          onClick={() => setShowCardForm(!showCardForm)}
          disabled={isCheckingOut}
        >
          Pagar con tarjeta
        </button>
        {showCardForm && (
          <form onSubmit={handleCardSubmit} style={{ marginTop: '20px', background: '#222', padding: '20px', borderRadius: '8px' }}>
            <div>
              <label>Nombre en la tarjeta:</label>
              <input type="text" name="nombre" value={cardData.nombre} onChange={handleCardChange} required />
            </div>
            <div>
              <label>Número de tarjeta:</label>
              <input type="text" name="numero" value={cardData.numero} onChange={handleCardChange} required maxLength={16} />
            </div>
            <div>
              <label>Fecha de vencimiento:</label>
              <input type="text" name="fechaVencimiento" value={cardData.fechaVencimiento} onChange={handleCardChange} placeholder="MM/AA" required maxLength={5} />
            </div>
            <div>
              <label>CVV:</label>
              <input type="password" name="cvv" value={cardData.cvv} onChange={handleCardChange} required maxLength={4} />
            </div>
            <button type="submit" className={styles.checkoutButton} style={{ marginTop: '10px' }}>
              Pagar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};