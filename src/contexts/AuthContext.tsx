import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api/authService';
import { orderService } from '../services/api/orderService';
import type { User } from '../types/index';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPurchasedGame: (gameId: string) => boolean;
  refreshPurchaseHistory: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [purchasedGames, setPurchasedGames] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar el historial de compras
  const loadPurchaseHistory = async () => {
    if (!authService.isAuthenticated()) return;
    
    try {
      const ordersResponse = await orderService.getUserOrders();
      if (ordersResponse.success) {
        const gameIds = new Set(ordersResponse.data.map((order: any) => order.juego_id.toString()));
        setPurchasedGames(gameIds);
        console.log('Purchase history loaded:', Array.from(gameIds));
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };

  // Función para actualizar el historial de compras
  const refreshPurchaseHistory = async () => {
    await loadPurchaseHistory();
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Only check auth if we have a token and backend is available
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            
            // Fetch user's purchase history
            await loadPurchaseHistory();
          } else {
            // If API call fails, clear invalid token but don't show error
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token and continue without authentication
        // Don't throw error to prevent app from crashing
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    // Set a small delay to avoid blocking the app load
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ correo: email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        // Cargar historial de compras después del login
        await loadPurchaseHistory();
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authService.register({ 
        nombre: name, 
        correo: email, 
        password 
      });
      
      if (response.success && response.user) {
        setUser(response.user);
        // Cargar historial de compras después del registro
        await loadPurchaseHistory();
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setPurchasedGames(new Set()); // Limpiar historial de compras
  };

  const hasPurchasedGame = (gameId: string) => {
    const hasPurchased = purchasedGames.has(gameId);
    console.log(`Checking if user purchased game ${gameId}:`, hasPurchased);
    console.log('Current purchased games:', Array.from(purchasedGames));
    return hasPurchased;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      hasPurchasedGame,
      refreshPurchaseHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};