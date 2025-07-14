// Frontend configuration
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // App Configuration
  APP_NAME: 'UliGames Store',
  APP_VERSION: '1.0.0',
  
  // Feature flags
  FEATURES: {
    ENABLE_REVIEWS: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_SEARCH: true,
    ENABLE_FILTERS: true,
  },
  
  // Default values
  DEFAULTS: {
    ITEMS_PER_PAGE: 12,
    MAX_CART_ITEMS: 10,
    SESSION_TIMEOUT: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },
  
  // Image paths
  IMAGES: {
    DEFAULT_GAME_COVER: '/images/games/covers/default-game.jpg',
    DEFAULT_NEWS_IMAGE: '/images/news/default-news.jpg',
    LOGO: '/src/assets/logo.png',
  },
  
  // Local storage keys
  STORAGE_KEYS: {
    TOKEN: 'token',
    USER: 'user',
    CART: 'cart',
    THEME: 'theme',
  },
};

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// API endpoints (moved from api.ts for better organization)
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${config.API_BASE_URL}/auth/login`,
  REGISTER: `${config.API_BASE_URL}/auth/register`,
  ME: `${config.API_BASE_URL}/auth/me`,
  RESET_PASSWORD: `${config.API_BASE_URL}/auth/reset-password`,
  DIRECT_RESET_PASSWORD: `${config.API_BASE_URL}/auth/direct-reset-password`,
  
  // Games
  GAMES: `${config.API_BASE_URL}/games`,
  GAME_BY_ID: (id: string) => `${config.API_BASE_URL}/games/${id}`,
  
  // News
  NEWS: `${config.API_BASE_URL}/news`,
  NEWS_BY_ID: (id: string) => `${config.API_BASE_URL}/news/${id}`,
  
  // Users
  USERS: `${config.API_BASE_URL}/users`,
  USER_PROFILE: `${config.API_BASE_URL}/users/profile`,
  USER_BY_ID: (id: string) => `${config.API_BASE_URL}/users/${id}`,
  
  // Orders
  ORDERS: `${config.API_BASE_URL}/orders`,
  ORDER_BY_ID: (id: string) => `${config.API_BASE_URL}/orders/${id}`,
  
  // Reviews
  REVIEWS: `${config.API_BASE_URL}/reviews`,
  REVIEWS_BY_GAME: (gameId: string) => `${config.API_BASE_URL}/reviews/game/${gameId}`,
  REVIEW_BY_ID: (id: string) => `${config.API_BASE_URL}/reviews/${id}`,
  CATEGORIES: `${config.API_BASE_URL}/categories`,
  PLATFORMS: `${config.API_BASE_URL}/platforms`,
}; 