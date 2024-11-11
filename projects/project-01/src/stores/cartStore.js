import { create } from 'zustand'
import { privateApi } from '../services/apiConfig'

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.get('/carts')
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error fetching cart', isLoading: false })
    }
  },

  addToCart: async (product) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.post('/carts', product)
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error adding to cart', isLoading: false })
    }
  },

  updateCartItem: async (productInfo) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.put(`/carts/${productInfo.key.productId}`, productInfo)
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error updating cart', isLoading: false })
    }
  },

  removeFromCart: async (productKey) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.delete(`/carts/${productKey.key.productId}`, {
        data: productKey
      })

      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error removing from cart', isLoading: false })
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.delete('/carts')
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error cleaning cart', isLoading: false })
    }
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  },

  getCartItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  }
}))

export default useCartStore
