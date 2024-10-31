import { z } from 'zod'

const cartItemKeySchema = z.object({
  productId: z.string({
    invalid_type_error: 'ProductId must be a string',
    required_error: 'ProductId is required'
  }),
  size: z.string({
    invalid_type_error: 'Size must be a string',
    required_error: 'Size is required'
  }),
  color: z.string({
    invalid_type_error: 'Color must be a string',
    required_error: 'Color is required'
  })
})

export const addToCartSchema = cartItemKeySchema.extend({
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: 'Quantity is required'
  }).min(1, 'Quantity must be greater than 0')
})

export const updateCartItemSchema = z.object({
  key: cartItemKeySchema,
  updates: z.object({
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
    }).min(1, 'Quantity must be greater than 0').optional(),
    size: z.string().optional(),
    color: z.string().optional(),
  })
});

export const removeFromCartSchema = cartItemKeySchema

const cleanCartSchema = z.object({
  userId: z.string({
    invalid_type_error: 'UserId must be a string',
    required_error: 'UserId is required'
  })
});


export async function validateGetCart(data) {
  return z.object({
    userId: z.string()
  }).safeParseAsync(data)
}

export async function validateAddToCart(data) {
  return addToCartSchema.safeParseAsync(data)
}

export async function validateUpdateCartItem(data) {
  return updateCartItemSchema.safeParseAsync(data)
}

export async function validateRemoveFromCart(data) {
  return removeFromCartSchema.safeParseAsync(data)
}

export async function validateCleanCart(data) {
  return cleanCartSchema.safeParseAsync(data);
}