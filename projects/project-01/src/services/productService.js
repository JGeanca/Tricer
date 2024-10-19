import axios from 'axios'
import { API_BASE_URL } from '../config'

export const productService = {
  async fetchProducts({ gender, type }) {
    const params = new URLSearchParams()
    if (gender) params.append('gender', gender)
    if (type) params.append('type', type)
    const response = await axios.get(`${API_BASE_URL}/products?${params.toString()}`)
    return response.data
  },

  async fetchProductById(id) {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`)
    return response.data
  }
}
