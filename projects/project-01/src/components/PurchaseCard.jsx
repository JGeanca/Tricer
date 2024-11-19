

export default function PurchaseCard(order) {


  return (
    order && <div className="product-purchase">
      {order.title }
    </div>
  )
}