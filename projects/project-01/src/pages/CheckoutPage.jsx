import '../css/checkout.css'
import useCartStore from '../stores/cartStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../hooks/useFeedback.jsx';

export default function CheckoutPage() {
  const { items, getCartTotal, getCartItemsCount, clearCart } = useCartStore()
  const totalItems = getCartItemsCount()
  const totalPrice = getCartTotal()
  const navigate = useNavigate()
  const { showError, showSuccess } = useFeedback()
  
  const [expiryDate, setExpiryDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Hook para manejar la validación del formulario
  useEffect(() => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()
          handlePaymentSuccess()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, [])

  const handleExpiryChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '') // Eliminar caracteres no numéricos
    let formattedValue = ''

    if (input.length > 2) {
      formattedValue = `${input.slice(0, 2)} / ${input.slice(2, 6)}`
    } else if (input.length > 0) {
      formattedValue = input
    }

    setExpiryDate(formattedValue)
  }

  const handlePaymentSuccess = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    clearCart()
    showSuccess('Successful purchase')
    navigate('/')
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form needs-validation" noValidate>
        <div className="checkout-section">
          <h3>Contact</h3>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingEmail" placeholder="Email" name="email" required />
            <label htmlFor="floatingEmail">Email</label>
            <div className="invalid-feedback"> Please provide a valid email. </div>
          </div>

          <div className="checkout-section">
            <h3>Delivery</h3>
            
            <div className="form-floating mb-3">
              <select className="form-select" name="pais" required>
                <option value="CR">Costa Rica</option>
              </select>
              <label htmlFor="pais">Country</label>
              <div className="invalid-feedback"> Please select your country.</div>
            </div>

            <div className="form-row">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingNombre" placeholder="Nombre" name="nombre" required />
                <label htmlFor="floatingNombre">First Name</label>
                <div className="invalid-feedback"> Please provide your first name. </div>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingApellido" placeholder="Apellido" name="apellido" required />
                <label htmlFor="floatingApellido">Last Name</label>
                <div className="invalid-feedback"> Please provide your last name. </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInputDireccion" placeholder="Dirección" name="direccion" required />
              <label htmlFor="floatingInputDireccion">Address</label>
              <div className="invalid-feedback">Please provide a valid address.</div>
            </div>

            <div className="form-row">
              <div className="form-floating mb-3">
                <select className="form-select" name="provincia" required>
                  <option value="">Select a province</option>
                  <option value="CR-A">Alajuela</option>
                  <option value="CR-C">Cartago</option>
                  <option value="CR-G">Guanacaste</option>
                  <option value="CR-H">Heredia</option>
                  <option value="CR-L">Limón</option>
                  <option value="CR-P">Puntarenas</option>
                  <option value="CR-S">San José</option>
                </select>
                <label htmlFor="provincia">Province</label>
                <div className="invalid-feedback"> Please select a province.</div>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputCiudad" placeholder="Ciudad" name="ciudad" required />
                <label htmlFor="floatingInputCiudad">City</label>
                <div className="invalid-feedback"> Please provide a valid city. </div>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="floatingInputCodigoPostal" placeholder="Código Postal" name="codigoPostal" style={{ appearance: 'none', MozAppearance: 'textfield' }} />
                <label htmlFor="floatingInputCodigoPostal">Postal Code</label>
                <div className="invalid-feedback"> Please provide a valid postal code. </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="tel" className="form-control" id="floatingCelular" placeholder="Cell Phone" name="celular" required />
              <label htmlFor="floatingCelular">Phone</label>
              <div className="invalid-feedback">Please provide a valid phone number.</div>
            </div>
          </div>

          <div className="checkout-section payment-section">
            <h3>Payment Method</h3>

            <div className="form-floating mb-3">
              <input type="text" id="card-number" className="form-control" placeholder="Card Number" required />
              <label htmlFor="card-number">Card Number</label>
            </div>

            <div className="form-row">
              <div className="form-floating mb-3">
                <input type="text" id="expiry-date"  className="form-control"  placeholder="MM / YYYY"  value={expiryDate} onChange={handleExpiryChange} pattern="^(0[1-9]|1[0-2]) / [0-9]{4}$" required />
                <label htmlFor="expiry-date">Expiration date (MM / YYYY)</label>
                <div className="invalid-feedback">Please provide a valid expiration date (MM / YYYY).</div>
              </div>

              <div className="form-floating mb-3">
                <input type="tel"  id="cvv"  className="form-control"  placeholder="CVV"  pattern="^\d{3,4}$" required/>
                <label htmlFor="cvv">CVV</label>
                <div className="invalid-feedback">Please provide a valid CVV (3 or 4 digits).</div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input type="text" id="card-name" className="form-control" placeholder="Cardholder Name" required />
              <label htmlFor="card-name">Cardholder Name</label>
            </div>
        
          </div>

          <button type="submit" className="checkout-button">Pay now</button>
        </div>
      </form>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Success</h5>
              </div>
              <div className="modal-body">
                Your payment has been processed successfully!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="checkout-item">
              <div className="checkout-item-image-wrapper">
                <img src={item.product.images[0]} alt={item.product.title} className="checkout-item-image" />
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
    </div>
  )
}