import { publicApi } from './apiConfig'

//TODO: Add validation
export const productService = {
  async fetchProducts({ gender, type, isNew }) {
    const params = new URLSearchParams()
    if (gender) params.append('gender', gender)
    if (type) params.append('type', type)
    if (isNew) params.append('new', isNew)
    const response = await publicApi.get(`/products?${params.toString()}`)
    return response.data
  },

  async fetchProductById(id) {
    const response = await publicApi.get(`/products/${id}`)
    return response.data
  },

  async fetchProductStockById(id) {
    const response = await publicApi.get(`/products/${id}/stock`)
    console.log('API Response:', response.data)
    return response.data
  }
}
