import { publicApi } from './apiConfig';

export const orderService = {
  async fetchOrders({ id }) {
    try {
      const response = await publicApi.get(`/orders`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('[fetchOrders]:', error.message);
      throw new Error('Error fetching orders');
    }
  },

  async fetchOrdersById({ orderId, id }) {
    try {
      const response = await publicApi.get(`/orders/${orderId}`, { params: { id } });
      return response.data;
    } catch (error) {
      console.error('[fetchOrdersById]:', error.message);
      throw new Error('Error fetching order by ID');
    }
  },
};
