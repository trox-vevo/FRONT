import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Profile.module.css';

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'purchases' | 'wishlist'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  // Aquí deberías obtener compras y wishlist reales desde la API
  const purchases = [];
  const wishlist = [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's data in the backend
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Datos Personales
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'purchases' ? styles.active : ''}`}
          onClick={() => setActiveTab('purchases')}
        >
          Historial de Compras
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'wishlist' ? styles.active : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          Lista de Deseos
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'personal' && (
          <div className={styles.personalData}>
            <div className={styles.header}>
              <h2>Información Personal</h2>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button type="submit" className={styles.saveButton}>
                  Guardar Cambios
                </button>
              )}
            </form>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className={styles.purchases}>
            <h2>Historial de Compras</h2>
            {purchases.length === 0 ? (
              <p>No hay compras registradas.</p>
            ) : (
              purchases.map(purchase => (
                <div key={purchase.id} className={styles.purchaseCard}>
                  <div className={styles.purchaseHeader}>
                    <div>
                      <span className={styles.orderId}>Pedido #{purchase.id}</span>
                      <span className={styles.date}>{purchase.date}</span>
                    </div>
                    <span className={`${styles.status} ${styles[purchase.status.toLowerCase()]}`}>
                      {purchase.status === 'Delivered' ? 'Entregado' : purchase.status === 'Processing' ? 'Procesando' : purchase.status}
                    </span>
                  </div>
                  <div className={styles.purchaseItems}>
                    {purchase.items.map(game => (
                      <div key={game.id} className={styles.purchaseItem}>
                        <img src={game.imageUrl} alt={game.title} />
                        <div className={styles.itemDetails}>
                          <h3>{game.title}</h3>
                          <span className={styles.platform}>{game.platform}</span>
                        </div>
                        <div className={styles.price}>
                          ${game.discountPrice || game.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.purchaseTotal}>
                    <span>Total:</span>
                    <span>${purchase.total}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className={styles.wishlist}>
            <h2>Mi Lista de Deseos</h2>
            {wishlist.length === 0 ? (
              <p>No tienes juegos en tu lista de deseos.</p>
            ) : (
              <div className={styles.wishlistGrid}>
                {wishlist.map(game => (
                  <div key={game.id} className={styles.wishlistItem}>
                    <img src={game.imageUrl} alt={game.title} />
                    <div className={styles.itemDetails}>
                      <h3>{game.title}</h3>
                      <span className={styles.platform}>{game.platform}</span>
                      <div className={styles.price}>
                        {game.discountPrice ? (
                          <>
                            <span className={styles.originalPrice}>
                              ${game.price}
                            </span>
                            <span className={styles.discountPrice}>
                              ${game.discountPrice}
                            </span>
                          </>
                        ) : (
                          <span>${game.price}</span>
                        )}
                      </div>
                    </div>
                    <button className={styles.addToCartButton}>
                      Agregar al carrito
                    </button>
                    <button className={styles.removeButton}>
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};