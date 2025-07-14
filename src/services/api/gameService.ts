import { API_ENDPOINTS, apiRequest } from '../../config/api';
import type { Game } from '../../types';

export const gameService = {
  // Get all games with optional filters
  async getGames(filters?: {
    categoria?: string;
    plataforma?: string;
    busqueda?: string;
    ordenar?: string;
  }): Promise<{ success: boolean; count: number; data: Game[] }> {
    const params = new URLSearchParams();
    
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.plataforma) params.append('plataforma', filters.plataforma);
    if (filters?.busqueda) params.append('busqueda', filters.busqueda);
    if (filters?.ordenar) params.append('ordenar', filters.ordenar);

    const url = params.toString() 
      ? `${API_ENDPOINTS.GAMES}?${params.toString()}`
      : API_ENDPOINTS.GAMES;

    return await apiRequest(url);
  },

  // Get game by ID
  async getGameById(id: string): Promise<{ success: boolean; data: Game }> {
    return await apiRequest(API_ENDPOINTS.GAME_BY_ID(id));
  },

  // Get best sellers (games with high ratings)
  async getBestSellers(): Promise<Game[]> {
    const response = await this.getGames({ ordenar: 'rating_desc' });
    return response.data.slice(0, 6); // Return top 6 games
  },

  // Get top rated games
  async getTopRated(): Promise<Game[]> {
    const response = await this.getGames({ ordenar: 'rating_desc' });
    return response.data;
  },

  // Search games
  async searchGames(query: string): Promise<Game[]> {
    const response = await this.getGames({ busqueda: query });
    return response.data;
  },

  // Get games by category
  async getGamesByCategory(category: string): Promise<Game[]> {
    const response = await this.getGames({ categoria: category });
    return response.data;
  },

  // Get discounted games
  async getDiscountedGames(): Promise<Game[]> {
    const response = await this.getGames();
    return response.data.filter(game => game.esta_oferta);
  },

  // Admin: Create new game
  async createGame(gameData: Partial<Game>): Promise<{ success: boolean; message: string; data: { id: number } }> {
    return await apiRequest(API_ENDPOINTS.GAMES, {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  },

  // Admin: Update game
  async updateGame(id: string, gameData: Partial<Game>): Promise<{ success: boolean; message: string }> {
    return await apiRequest(API_ENDPOINTS.GAME_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(gameData),
    });
  },

  // Admin: Delete game
  async deleteGame(id: string): Promise<{ success: boolean; message: string }> {
    return await apiRequest(API_ENDPOINTS.GAME_BY_ID(id), {
      method: 'DELETE',
    });
  },
}; 