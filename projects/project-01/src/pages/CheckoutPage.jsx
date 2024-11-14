import '../css/checkout.css'
import useCartStore from '../stores/cartStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../hooks/useFeedback'
import { ContactForm, DeliveryForm, PaymentForm } from '../components/CheckoutForms'
import { SuccessModal } from '../components/SuccessModal'
import { OrderSummary } from '../components/OrderSummary'

export default function CheckoutPage() {
  const { items, getCartTotal, getCartItemsCount, clearCart } = useCartStore()
  const totalItems = getCartItemsCount()
  const totalPrice = getCartTotal()
  const navigate = useNavigate()
  const { showSuccess } = useFeedback()

  const [expiryDate, setExpiryDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Hook to handle form validation
  useEffect(() => {
    // Select all forms that need validation
    const forms = document.querySelectorAll('.needs-validation')

    // Loop through each form and add an event listener to handle form submission
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault() // Prevent default form submission
        // Check if the form is valid (all validation rules are satisfied)
        if (!form.checkValidity()) {
          event.stopPropagation() // Stop the event from propagating (this means the form won't be submitted)
        } else { // If the form is valid, handle payment success
          handlePaymentSuccess()
        }
        form.classList.add('was-validated') // Add the 'was-validated' class to show validation feedback
      })
    })
  }, [])


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