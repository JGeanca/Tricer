import '../css/checkout.css'
import useCartStore from '../stores/cartStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../hooks/useFeedback'
import { ContactForm, DeliveryForm, PaymentForm } from '../components/CheckoutForms'
import { SuccessModal } from '../components/SuccessModal'
import { OrderSummary } from '../components/OrderSummary'
import { paymentService } from '../services/paymentService'

export default function CheckoutPage() {
  const { items, getCartTotal, getCartItemsCount } = useCartStore()
  const totalItems = getCartItemsCount()
  const totalPrice = getCartTotal()
  const navigate = useNavigate()
  const { showSuccess, showError } = useFeedback()
  const [expiryDate, setExpiryDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // Validate the form
    if (!event.target.checkValidity()) {
      event.target.classList.add('was-validated') // Show feedback using Bootstrap
      return
    }

    if (totalItems === 0) {
      showError('Your cart is empty')
      return
    }

    try {
      paymentService.processPayment()
      setShowModal(true)
    } catch (error) {
      showError(error.message || 'An error occurred')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    showSuccess('Successful purchase')
    navigate('/')

    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="checkout-section">
          <ContactForm />
          <DeliveryForm />
          <PaymentForm
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
          />
          <button type="submit" className="checkout-button">
            Pay now
          </button>
        </div>
      </form>
      {showModal && <SuccessModal handleCloseModal={handleCloseModal} />}
      <OrderSummary items={items} totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  )
}