import { API_ENDPOINTS, apiRequest } from '../../config/api';

export const platformService = {
  async getPlatforms() {
    return await apiRequest(API_ENDPOINTS.PLATFORMS);
  }
}; 