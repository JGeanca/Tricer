import '../css/cartsidebar.css'
import { useNavigate } from 'react-router-dom'
import { Offcanvas, Button } from 'react-bootstrap'
import { useEffect, useCallback } from 'react'
import useCartStore from '../stores/cartStore'

export default function CartSidebar({ show, onClose }) {
  const navigate = useNavigate()
  const { items, fetchCart, removeFromCart, updateCartItem, getCartTotal, getCartItemsCount } = useCartStore()

  const loadCart = useCallback(() => {
    fetchCart()
  }, [fetchCart])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  const handleRemove = (itemId, size, color) => {
    removeFromCart({ 
      key: { productId: itemId, size, color }
    })
  }

  const handleQuantityChange = (itemId, newQuantity, size, color) => {
    updateCartItem({ 
      key: { productId: itemId, size, color },
      updates: { quantity: newQuantity }
    })
  }

  const handleCheckout = () => {
    navigate('/checkout')
    onClose()
  }

  const totalItems = getCartItemsCount() 
  const totalPrice = getCartTotal()

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Basket</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="cart-item">
              <div className="cart-item-image-wrapper">
                <img src={item.product.images[0]} alt={item.product.title} className="cart-item-image" />
              </div>
              <div className="cart-item-details">
                <h5 className="cart-item-title">{item.product.title}</h5>
                <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                <p className="cart-item-size">Size: {item.size}</p>
                <div className="cart-item-controls">
                  <div className="cart-item-quantity">
                    <span 
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1, item.size, item.color)} 
                      className="quantity-button" 
                    >
                      -
                    </span>
                    <span className="quantity-number">{item.quantity}</span>
                    <span 
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1, item.size, item.color)} 
                      className="quantity-button" 
                    >
                      +
                    </span>
                  </div>
                  <span 
                    onClick={() => handleRemove(item.productId, item.size, item.color)} 
                    className="cart-item-remove" 
                  >
                    REMOVE
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your basket is empty.</p>
        )}
        <div className="cart-summary-header">
          <p>Basket</p>
          <p>SUBTOTAL</p>
        </div>
        <div className="cart-summary">
          <p>{totalItems} Items</p>
          <p className="cart-item-total-price">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="checkout-button-container">
          <Button className="checkout-button" onClick={handleCheckout}>
            CHECKOUT
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
