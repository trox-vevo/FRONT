import { API_ENDPOINTS, apiRequest } from '../../config/api';

export const newsService = {
  // Get all active news
  async getNews(): Promise<{ success: boolean; count: number; data: News[] }> {
    return await apiRequest(API_ENDPOINTS.NEWS);
  },

  // Get news by ID
  async getNewsById(id: string): Promise<{ success: boolean; data: News }> {
    return await apiRequest(API_ENDPOINTS.NEWS_BY_ID(id));
  },

  // Admin: Create new news
  async createNews(newsData: { titulo: string; texto: string }): Promise<{ success: boolean; message: string; data: News }> {
    return await apiRequest(API_ENDPOINTS.NEWS, {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  },

  // Admin: Update news
  async updateNews(id: string, newsData: Partial<News>): Promise<{ success: boolean; message: string; data: News }> {
    return await apiRequest(API_ENDPOINTS.NEWS_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  },

  // Admin: Delete news
  async deleteNews(id: string): Promise<{ success: boolean; message: string }> {
    return await apiRequest(API_ENDPOINTS.NEWS_BY_ID(id), {
      method: 'DELETE',
    });
  },
}; 