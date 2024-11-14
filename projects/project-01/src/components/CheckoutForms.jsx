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
          required
        />
        <label htmlFor="floatingPhone">Phone</label>
        <div className="invalid-feedback">Please provide a valid phone number.</div>
      </div>
    </>
  )
}

export const PaymentForm = ({ expiryDate, handleExpiryChange }) => {
  return (
    <div className="checkout-section payment-section">
      <h3>Payment Method</h3>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="card-number"
          className="form-control"
          placeholder="Card Number"
          required
        />
        <label htmlFor="card-number">Card Number</label>
      </div>

      <div className="form-row">
        <div className="form-floating mb-3">
          <input
            type="text"
            id="expiry-date"
            className="form-control"
            placeholder="MM / YYYY"
            value={expiryDate}
            onChange={handleExpiryChange}
            pattern="^(0[1-9]|1[0-2]) / [0-9]{4}$"
            required
          />
          <label htmlFor="expiry-date">Expiration date (MM / YY)</label>
          <div className="invalid-feedback">Please provide a valid expiration date (MM / YY).</div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="tel"
            id="cvv"
            className="form-control"
            placeholder="CVV"
            pattern="^\d{3,4}$"
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
          placeholder="Cardholder Name"
          required
        />
        <label htmlFor="card-name">Cardholder Name</label>
      </div>
    </div>
  )
}
