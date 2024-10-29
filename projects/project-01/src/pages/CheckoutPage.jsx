import '../css/checkout.css'
import { useState } from 'react'

export default function CheckoutPage() {
  const [items] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      title: '"THE" LEATHER JACKET RED',
      price: 271200,
      size: 'M',
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      title: 'FUCK NORMAL HOOD GREY MELANGE',
      price: 53700,
      size: 'L',
      quantity: 2,
    },
  ])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Checkout Form</h2>
        {/* Aquí agregar el formulario de checkout */}
      </div>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="checkout-item-image-wrapper">
                <img src={item.image} alt={item.title} className="checkout-item-image" />
              </div>
              <div className="checkout-item-details">
                <h5 className="checkout-item-title">{item.title}</h5>
                <p className="checkout-item-price">₡{(item.price).toLocaleString('es-CR')}</p>
                <p className="checkout-item-size">Size: {item.size}</p>
                <div className="checkout-item-quantity">
                  <span className="quantity-number">Quantity: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="checkout-summary-header">
          <p>Subtotal • {totalItems} Items </p>
          <p className="checkout-item-total-price">₡{totalPrice.toLocaleString('es-CR')}</p>
        </div>
        <div className="checkout-summary-total">
          <p>Total</p>
          <p className="checkout-item-total-price">₡{totalPrice.toLocaleString('es-CR')}</p>
        </div>
      </div>
    </div>
  )
}