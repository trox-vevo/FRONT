import { API_ENDPOINTS, apiRequest } from '../../config/api';

export const categoryService = {
  async getCategories() {
    return await apiRequest(API_ENDPOINTS.CATEGORIES);
  }
}; 