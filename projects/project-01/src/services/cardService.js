export const cardService = {
  async validateBIN(cardNumber) {
    try {
      const firstSixDigits = cardNumber.replace(/\D/g, '').slice(0, 6)
      const response = await fetch(`https://data.handyapi.com/bin/${firstSixDigits}`)
      const data = await response.json()

      if (data.Status === 'SUCCESS' && data.Country.A2 !== 'CR' || data.Status === 'NOT FOUND') {
        return 'Only Costa Rican cards are accepted'
      }

      return ''
    } catch (error) {
      console.error('Error validating BIN:', error)
      return ''
    }
  }
}