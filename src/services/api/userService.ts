import { API_ENDPOINTS, apiRequest } from '../../config/api';

export const userService = {
  // Obtener todos los usuarios (admin)
  async getUsers() {
    return await apiRequest(API_ENDPOINTS.USERS);
  },
  // Agregar usuario (admin)
  async addUser(userData) {
    return await apiRequest(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  // Editar usuario (admin)
  async updateUser(id, userData) {
    return await apiRequest(API_ENDPOINTS.USER_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  // Eliminar usuario (admin)
  async deleteUser(id) {
    return await apiRequest(API_ENDPOINTS.USER_BY_ID(id), {
      method: 'DELETE',
    });
  },
  // Actualizar perfil del usuario autenticado
  async updateProfile(profileData) {
    return await apiRequest(API_ENDPOINTS.USER_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
}; 