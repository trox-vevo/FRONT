import { API_ENDPOINTS, apiRequest } from '../../config/api';

export interface Review {
  id: number;
  valoracion: number;
  comentario?: string;
  juego_id: number;
  usuario_id: number;
  usuario_nombre?: string;
  usuario_email?: string;
}

export interface CreateReviewData {
  juego_id: number;
  valoracion: number;
  comentario?: string;
}

export const reviewService = {
  // Get reviews for a specific game
  async getGameReviews(gameId: string): Promise<{ success: boolean; count: number; data: Review[] }> {
    return await apiRequest(API_ENDPOINTS.REVIEWS_BY_GAME(gameId));
  },

  // Create a new review
  async createReview(reviewData: CreateReviewData): Promise<{ success: boolean; message: string; data: Review }> {
    return await apiRequest(API_ENDPOINTS.REVIEWS, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  // Update a review
  async updateReview(id: string, reviewData: Partial<CreateReviewData>): Promise<{ success: boolean; message: string; data: Review }> {
    return await apiRequest(API_ENDPOINTS.REVIEW_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  // Delete a review
  async deleteReview(id: string): Promise<{ success: boolean; message: string }> {
    return await apiRequest(API_ENDPOINTS.REVIEW_BY_ID(id), {
      method: 'DELETE',
    });
  },
}; 