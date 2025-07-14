import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameService } from '../services/api/gameService';
import { orderService } from '../services/api/orderService';
import { useAuth } from './AuthContext';
import type { Game } from '../types';

interface CartItem {
  gameId: string;
  quantity: number;
  price: number;
  title: string;
  platform: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (gameId: string) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) return [];
      
      const parsedCart = JSON.parse(savedCart);
      
      // Validate and clean cart data
      if (Array.isArray(parsedCart)) {
        return parsedCart.filter(item => 
          item && 
          item.gameId && 
          item.title && 
          typeof Number(item.price) === 'number' && 
          !isNaN(Number(item.price)) &&
          item.quantity > 0
        ).map(item => ({
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity)
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem('cart');
      return [];
    }
  });

  const { refreshPurchaseHistory } = useAuth();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (gameId: string) => {
    try {
      // Get game details from API
      const response = await gameService.getGameById(gameId);
      const game = response.data;
      
      if (!game) {
        throw new Error('Game not found');
      }

      const gamePrice = Number(game.precio || game.price || 29.99);
      const gameTitle = game.nombre || game.title || `Game ${gameId}`;
      const gamePlatform = game.plataformas?.[0] || game.platform || 'PC';

      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.gameId === gameId);
        if (existingItem) {
          return currentItems.map(item =>
            item.gameId === gameId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...currentItems, {
          gameId,
          quantity: 1,
          price: Number(gamePrice),
          title: gameTitle,
          platform: gamePlatform
        }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('No se pudo agregar el juego al carrito. Verifica tu conexión a internet.');
    }
  };

  const removeFromCart = (gameId: string) => {
    setItems(currentItems => currentItems.filter(item => item.gameId !== gameId));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const cleanCorruptedCart = () => {
    console.log('Cleaning corrupted cart data...');
    clearCart();
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + ((Number(item.price) || 0) * item.quantity), 0);
  };

  const checkout = async () => {
    try {
      // Convert cart items to the format expected by the API
      const orderItems = items.map(item => ({
        juego_id: item.gameId,
        cantidad: item.quantity,
        precio: Number(item.price) || 0
      }));

      // Process checkout through the API
      const result = await orderService.checkout(orderItems);
      
      if (result.success) {
        // Clear cart after successful checkout
        clearCart();
        
        // Actualizar el historial de compras para que el usuario pueda reseñar
        await refreshPurchaseHistory();
        
        // You could show success message with game codes
        console.log('Checkout successful! Game codes:', result.data.sales);
        return result;
      } else {
        throw new Error(result.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      throw new Error('No se pudo procesar el pago. Verifica tu conexión a internet.');
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      cleanCorruptedCart,
      getTotal,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 