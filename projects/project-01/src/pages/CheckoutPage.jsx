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
    const input = e.target.value.replace(/[^0-9]/g, '') // Remove non-numeric characters
    let formattedValue = ''

    if (input.length > 2) {
      formattedValue = `${input.slice(0, 2)} / ${input.slice(2, 4)}`
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
          <ContactForm />
          <DeliveryForm />
          <PaymentForm
            expiryDate={expiryDate}
            handleExpiryChange={handleExpiryChange}
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