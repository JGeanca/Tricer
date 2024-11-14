export const OrderSummary = ({ items, totalItems, totalPrice }) => {
  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={`${item.productId}-${item.size}-${item.color}`} className="checkout-item">
            <div className="checkout-item-image-wrapper">
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                className="checkout-item-image"
              />
            </div>
            <div className="checkout-item-details">
              <h5 className="checkout-item-title">{item.product.title}</h5>
              <p className="checkout-item-price">${item.product.price.toFixed(2)}</p>
              <p className="checkout-item-size">Size: {item.size}</p>
              <div className="checkout-item-quantity">
                <span className="quantity-number">Quantity: {item.quantity}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your basket is empty.</p>
      )}
      <div className="checkout-summary-header">
        <p>Subtotal • {totalItems} Items </p>
        <p className="checkout-item-total-price">${totalPrice.toFixed(2)}</p>
      </div>
      <div className="checkout-summary-total">
        <p>Total</p>
        <p className="checkout-item-total-price">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  )
}
