import {
  validateAddToCart,
  validateUpdateCartItem,
  validateRemoveFromCart,
  validateGetCart
} from '../../schemas/cart.schema.js'

describe('Cart Schema Validation', () => {
  const validCartItem = {
    userId: 'user123',
    productId: 'prod456',
    size: 'M',
    color: 'blue'
  }

  describe('Add to Cart Validation', () => {
    it('should return true for valid add to cart data', async () => {
      const data = {
        ...validCartItem,
        quantity: 2
      }

      const result = await validateAddToCart(data)
      expect(result.success).toBe(true)
    })

    it('should return false if quantity is missing', async () => {
      const result = await validateAddToCart(validCartItem)
      expect(result.success).toBe(false)
    })

    it('should return false if quantity is less than 1', async () => {
      const data = {
        ...validCartItem,
        quantity: 0
      }

      const result = await validateAddToCart(data)
      expect(result.success).toBe(false)
    })

    it('should return false if required fields are missing', async () => {
      const data = {
        userId: 'user123',
        quantity: 1
      }

      const result = await validateAddToCart(data)
      expect(result.success).toBe(false)
    })
  })

  describe('Update Cart Item Validation', () => {
    it('should return true for valid update with quantity', async () => {
      const data = {
        ...validCartItem,
        updates: { color: 'red' },
        quantity: 3
      }

      const result = await validateUpdateCartItem(data)
      expect(result.success).toBe(true)
    })

    it('should return true for valid update without quantity', async () => {
      const data = {
        ...validCartItem,
        updates: { color: 'red' }
      }

      const result = await validateUpdateCartItem(data)
      expect(result.success).toBe(true)
    })

    it('should return false if quantity is less than 1', async () => {
      const data = {
        ...validCartItem,
        updates: { color: 'red' },
        quantity: 0
      }

      const result = await validateUpdateCartItem(data)
      expect(result.success).toBe(false)
    })

    it('should return false if required fields are missing', async () => {
      const data = {
        userId: 'user123',
        updates: { color: 'red' }
      }

      const result = await validateUpdateCartItem(data)
      expect(result.success).toBe(false)
    })
  })

  describe('Remove from Cart Validation', () => {
    it('should return true for valid remove cart data', async () => {
      const result = await validateRemoveFromCart(validCartItem)
      expect(result.success).toBe(true)
    })

    it('should return false if required fields are missing', async () => {
      const data = {
        userId: 'user123',
        productId: 'prod456'
      }

      const result = await validateRemoveFromCart(data)
      expect(result.success).toBe(false)
    })
  })

  describe('Get Cart Validation', () => {
    it('should return true for valid userId', async () => {
      const data = {
        userId: 'user123'
      }

      const result = await validateGetCart(data)
      expect(result.success).toBe(true)
    })

    it('should return false if userId is missing', async () => {
      const data = {}

      const result = await validateGetCart(data)
      expect(result.success).toBe(false)
    })

    it('should return false if userId is not a string', async () => {
      const data = {
        userId: 123
      }

      const result = await validateGetCart(data)
      expect(result.success).toBe(false)
    })
  })
})