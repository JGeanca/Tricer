import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { cardService } from '../services/cardService'

export const ContactForm = () => {
  return (
    <div className="checkout-section">
      <h3>Contact</h3>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="Email"
          name="email"
          required
        />
        <label htmlFor="floatingEmail">Email</label>
        <div className="invalid-feedback">Please provide a valid email.</div>
      </div>
    </div>
  )
}

export const DeliveryForm = () => {
  return (
    <div className="checkout-section">
      <h3>Delivery</h3>

      <div className="form-floating mb-3">
        <select className="form-select" name="country" required>
          <option value="CR">Costa Rica</option>
        </select>
        <label htmlFor="country">Country</label>
        <div className="invalid-feedback">Please select your country.</div>
      </div>

      <div className="form-row">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            placeholder="First Name"
            name="firstName"
            required
          />
          <label htmlFor="floatingFirstName">First Name</label>
          <div className="invalid-feedback">Please provide your first name.</div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            placeholder="Last Name"
            name="lastName"
            required
          />
          <label htmlFor="floatingLastName">Last Name</label>
          <div className="invalid-feedback">Please provide your last name.</div>
        </div>
      </div>

      <AddressFields />
    </div>
  )
}

const AddressFields = () => {
  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInputAddress"
          placeholder="Address"
          name="address"
          required
        />
        <label htmlFor="floatingInputAddress">Address</label>
        <div className="invalid-feedback">Please provide a valid address.</div>
      </div>

      <div className="form-row">
        <div className="form-floating mb-3">
          <select className="form-select" name="province" required>
            <option value="">Select a province</option>
            <option value="CR-A">Alajuela</option>
            <option value="CR-C">Cartago</option>
            <option value="CR-G">Guanacaste</option>
            <option value="CR-H">Heredia</option>
            <option value="CR-L">Limón</option>
            <option value="CR-P">Puntarenas</option>
            <option value="CR-S">San José</option>
          </select>
          <label htmlFor="province">Province</label>
          <div className="invalid-feedback">Please select a province.</div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputCity"
            placeholder="City"
            name="city"
            required
          />
          <label htmlFor="floatingInputCity">City</label>
          <div className="invalid-feedback">Please provide a valid city.</div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInputPostalCode"
            placeholder="Postal Code"
            name="postalCode"
            style={{ appearance: 'none', MozAppearance: 'textfield' }}
            required
          />
          <label htmlFor="floatingInputPostalCode">Postal Code</label>
          <div className="invalid-feedback">Please provide a valid postal code.</div>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="tel"
          className="form-control"
          id="floatingPhone"
          placeholder="Phone"
          name="phone"
          minLength="8"
          maxLength="8"
          required
        />
        <label htmlFor="floatingPhone">Phone</label>
        <div className="invalid-feedback">Please provide a valid phone number.</div>
      </div>
    </>
  )
}

export const PaymentForm = ({ expiryDate, setExpiryDate }) => {
  const [cardNumber, setCardNumber] = useState('')

  const formatExpiryDate = (input) => {
    if (input.length > 2) {
      return `${input.slice(0, 2)} / ${input.slice(2, 4)}`
    }
    return input
  }

  const validateExpiryDate = (month, year) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear().toString().slice(2)
    const currentMonth = currentDate.getMonth() + 1

    return !(year < currentYear || (year === currentYear && month < currentMonth))
  }

  const handleExpiryChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, '')
    const formattedValue = formatExpiryDate(input)
    setExpiryDate(formattedValue)

    const errorMessageElement = document.getElementById('expiry-error-message')

    if (formattedValue.length === 7) {
      const [month, year] = formattedValue.split(' / ')

      const isValid = validateExpiryDate(month, year)

      if (!isValid) {
        e.target.setCustomValidity('Card has expired')
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Card has expired'
        }
      } else {
        e.target.setCustomValidity('')
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Please provide a valid expiration date (MM / YY)'
        }
      }
    }
  }

  const validateCardBIN = async (numericInput, element, errorElement) => {
    if (numericInput.length >= 6) {
      const errorMessage = await cardService.validateBIN(numericInput)
      element.setCustomValidity(errorMessage)
      if (errorElement) {
        errorElement.textContent = errorMessage || 'Please provide a valid card number'
      }
    }
  }

  const debouncedValidateCardBIN = useCallback(
    debounce(validateCardBIN, 500), []
  )

  const handleCardNumberChange = (e) => {
    const input = e.target.value
    const numericInput = input.replace(/[^0-9]/g, '') // Remove non-numeric characters
    const truncatedInput = numericInput.slice(0, 16) // Truncate to 16 digits

    const formattedNumber = truncatedInput.replace(/(\d{4})/g, '$1 ').trim() // Add spaces every 4 digits

    setCardNumber(formattedNumber)

    const errorMessageElement = document.getElementById('card-error-message')
    if (numericInput.length < 13 || numericInput.length > 16) {
      e.target.setCustomValidity('Card number must be between 13 and 16 digits')
      if (errorMessageElement) {
        errorMessageElement.textContent = 'Card number must be between 13 and 16 digits'
      }

      return
    }
    debouncedValidateCardBIN(numericInput, e.target, errorMessageElement)
  }

  useEffect(() => {
    return () => {
      debouncedValidateCardBIN.cancel()
    }
  }, [debouncedValidateCardBIN])

  return (
    <div className="checkout-section payment-section">
      <h3>Payment Method</h3>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="card-number"
          className="form-control"
          placeholder="Card Number"
          pattern="^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{1,4}$"
          value={cardNumber}
          maxLength={19}
          onChange={handleCardNumberChange}
          required
        />
        <label htmlFor="card-number">Card Number</label>
        <div className="invalid-feedback">
          <span id="card-error-message">
            Please provide a valid card number (13-16 digits).
          </span>
        </div>
      </div>

      <div className="form-row">
        <div className="form-floating mb-3">
          <input
            type="text"
            id="expiry-date"
            className="form-control"
            placeholder="MM / YY"
            value={expiryDate}
            onChange={handleExpiryChange}
            pattern="^(0[1-9]|1[0-2]) / [0-9]{2}$"
            required
          />
          <label htmlFor="expiry-date">Expiration date (MM / YY)</label>
          <div className="invalid-feedback">
            <span id="expiry-error-message">
              Please provide a valid expiration date (MM / YY)
            </span>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            id="cvv"
            inputMode="numeric"
            className="form-control"
            placeholder="CVV"
            pattern="^[0-9]{3,4}$"
            maxLength={4}
            required
          />
          <label htmlFor="cvv">CVV</label>
          <div className="invalid-feedback">Please provide a valid CVV (3 or 4 digits).</div>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="card-name"
          className="form-control"
          placeholder="Card Holder Name"
          required
        />
        <label htmlFor="card-name">Card Holder Name</label>
      </div>
    </div>
  )
}
