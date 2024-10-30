import { create } from 'zustand'
import { privateApi } from '../services/apiConfig'

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => { 
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.get('/users/cart')
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error fetching cart', isLoading: false })
    }
  },

  addToCart: async (product) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.post('/users/cart', product)
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error adding to cart', isLoading: false })
    }
  },

  updateCartItem: async (productId, updateData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.put(`/users/cart/${productId}`, updateData)
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error updating cart', isLoading: false })
    }
  },

  removeFromCart: async (productId, size, color) => {
    set({ isLoading: true, error: null })
    try {
      const response = await privateApi.delete(`/users/cart/${productId}`, { data: { size, color } })
      set({ items: response.data.cart, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error removing from cart', isLoading: false })
    }
  },

  clearCart: () => set({ items: [], error: null }),

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getCartItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  }
}))

export default useCartStore
