import { API_ENDPOINTS, apiRequest } from '../../config/api';
import type { CartItem } from '../../types';

export const orderService = {
  // Create new order
  async createOrder(items: CartItem[]): Promise<{ success: boolean; message: string; data: { sales: any[]; total: number } }> {
    return await apiRequest(API_ENDPOINTS.ORDERS, {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },

  // Get user orders
  async getUserOrders(): Promise<{ success: boolean; count: number; data: any[] }> {
    return await apiRequest(API_ENDPOINTS.ORDERS);
  },

  // Get order by ID
  async getOrderById(id: string): Promise<{ success: boolean; data: any }> {
    return await apiRequest(API_ENDPOINTS.ORDER_BY_ID(id));
  },

  // Process checkout (combines cart checkout with order creation)
  async checkout(cartItems: CartItem[]): Promise<{ success: boolean; message: string; data: { sales: any[]; total: number } }> {
    try {
      // Create order with cart items
      const orderResult = await this.createOrder(cartItems);
      
      if (orderResult.success) {
        // Clear cart after successful order
        localStorage.removeItem('cart');
      }
      
      return orderResult;
    } catch (error) {
      console.error('Checkout API error:', error);
      throw new Error('No se pudo procesar el pago. Verifica tu conexión a internet.');
    }
  },
}; 