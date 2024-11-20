import { privateApi } from './apiConfig'

export const paymentService = {
  async processPayment() {
    try {
      const response = await privateApi.post('orders/')
      return response.data
    } catch (error) {
      if (!error.response) throw error
      if (error.response?.data) throw { message: error.response.data.message }
      throw error
    }
  }
}