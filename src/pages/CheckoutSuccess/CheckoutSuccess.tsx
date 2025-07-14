import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import styles from './CheckoutSuccess.module.css';

export const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  // Generar un número de orden aleatorio
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.header}>
          <div className={styles.checkmark}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1>¡Gracias por tu compra!</h1>
          <p className={styles.message}>
            Tu pedido ha sido procesado con éxito y está en camino.
          </p>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span>Número de orden:</span>
            <span className={styles.value}>{orderNumber}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Fecha:</span>
            <span className={styles.value}>{currentDate}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Total:</span>
            <span className={styles.value}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h2>Resumen</h2>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.gameId} className={styles.item}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.gameImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <span className={styles.platform}>{item.platform}</span>
                  <div className={styles.price}>
                    {item.discountPrice ? (
                      <>
                        <span className={styles.originalPrice}>
                          ${item.price}
                        </span>
                        <span className={styles.discountPrice}>
                          ${item.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span>${item.price}</span>
                    )}
                  </div>
                </div>
                <div className={styles.quantity}>
                  x{item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h2>¿Qué sigue?</h2>
          <ul>
            <li>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h3>Confirmación de pedido</h3>
                <p>Se ha enviado un correo de confirmación a tu dirección de correo registrada.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h3>Procesando pedido</h3>
                <p>Tu pedido será procesado y preparado para la entrega.</p>
              </div>
            </li>
            <li>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h3>Entrega</h3>
                <p>Recibirás actualizaciones sobre el estado de entrega de tu pedido.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.continueShopping}
            onClick={() => navigate('/catalog')}
          >
            Seguir comprando
          </button>
          <button
            className={styles.viewOrder}
            onClick={() => navigate('/profile')}
          >
            Ver pedido en tu perfil
          </button>
        </div>
      </div>
    </div>
  );
};