import '../css/cartsidebar.css'
import { Offcanvas, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function CartSidebar({ show, onClose }) {
  const [items, setItems] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
      title: '"THE" LEATHER JACKET RED',
      price: '271.200',
      size: 'M',
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      title: 'FUCK NORMAL HOOD GREY MELANGE',
      price: '53.700',
      size: 'L',
      quantity: 2,
    },
  ])

  const handleRemove = (itemId) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId))
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    )
  }

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </div>
              <div className="cart-item-details">
                <h5 className="cart-item-title">{item.title}</h5>
                <p className="cart-item-price">${item.price}</p>
                <p className="cart-item-size">Size: {item.size}</p>
                <div className="cart-item-quantity">
                  <span 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                    style={{ cursor: 'pointer', marginRight: '10px' }} 
                  >
                    -
                  </span>
                  <span>{item.quantity}</span>
                  <span 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)} 
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    +
                  </span>
                </div>
                <span 
                  onClick={() => handleRemove(item.id)} 
                  className="cart-item-remove" 
                >
                  Remove
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="checkout-container">
          <Button className="checkout-button">
            CHECKOUT
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
