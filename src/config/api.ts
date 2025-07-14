import { API_ENDPOINTS } from './config';

// Helper function to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Response is not JSON
      throw new Error('Invalid response from server');
    }
    throw error;
  }
};

// Generic API request function
export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return handleApiResponse(response);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Network error - server is not available
      throw new Error('Server is not available. Please try again later.');
    }
    throw error;
  }
};

// Re-export API_ENDPOINTS for convenience
export { API_ENDPOINTS }; 