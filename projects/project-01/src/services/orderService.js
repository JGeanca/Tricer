import { privateApi } from './apiConfig';

export const orderService = {
  async fetchOrders() {
    try {
      const response = await privateApi.get(`orders`);
      return response.data;
    } catch (error) {
      console.error('[fetchOrders]:', error.message);
      throw new Error('Error fetching orders');
    }
  },

  async fetchOrdersById({orderId}) {
    try {
      const response = await privateApi.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('[fetchOrdersById]:', error.message);
      throw new Error('Error fetching order by ID');
    }
  },
};
