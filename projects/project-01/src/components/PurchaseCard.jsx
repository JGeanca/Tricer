import { useOrderById } from '../hooks/useOrders'

export default function PurchaseCard({ order, userId }) {

  const orderId = order.orderId

  const { data } = useOrderById(orderId, userId)
  const orderData = data?.order || []

  
  return (
    orderData && <div className="product-purchase">
      {orderData.createdAt}
      {orderData.status}
      {orderData.totalAmount}
    </div>
  )
}