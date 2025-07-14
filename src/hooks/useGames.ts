import { useState, useEffect } from 'react';
import { gameService } from '../services/api/gameService';
import type { Game } from '../types';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await gameService.getGames();
      setGames(response.data);
    } catch (err) {
      setError('No se pudieron obtener los juegos');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedGames = async () => {
    try {
      return await gameService.getBestSellers();
    } catch (err) {
      console.error('Error fetching featured games:', err);
      return [];
    }
  };

  const getDiscountedGames = async () => {
    try {
      return await gameService.getDiscountedGames();
    } catch (err) {
      console.error('Error fetching discounted games:', err);
      return [];
    }
  };

  const getGamesByCategory = async (category: string) => {
    try {
      return await gameService.getGamesByCategory(category);
    } catch (err) {
      console.error('Error fetching games by category:', err);
      return [];
    }
  };

  const getGameById = async (id: string) => {
    try {
      const response = await gameService.getGameById(id);
      return response.data;
    } catch (err) {
      console.error('Error fetching game by id:', err);
      return null;
    }
  };

  const searchGames = async (query: string) => {
    try {
      return await gameService.searchGames(query);
    } catch (err) {
      console.error('Error searching games:', err);
      return [];
    }
  };

  return {
    games,
    loading,
    error,
    refetch: fetchGames,
    getFeaturedGames,
    getDiscountedGames,
    getGamesByCategory,
    getGameById,
    searchGames
  };
};