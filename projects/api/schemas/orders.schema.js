import { z } from 'zod'

export const getOrderSchema = z.object({
  userId: z.string({
    invalid_type_error: 'UserId must be a string',
    required_error: 'UserId is required'
  })
})

export const getOrderByIdSchema = getOrderSchema.extend({
  orderId: z.string({
    invalid_type_error: 'OrderId must be a string',
    required_error: 'OrderId is required'
  })
})

export async function validateGetOrder(data) {
  return getOrderSchema.safeParseAsync(data)
}

export async function validateGetOrderById(data) {
  return getOrderByIdSchema.safeParseAsync(data)
}