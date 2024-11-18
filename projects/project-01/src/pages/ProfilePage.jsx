import { useAuth } from '../hooks/useAuth'
import profileIcon from '../assets/icons/profile.svg'
import { useFeedback } from '../hooks/useFeedback'

import '../css/profilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { showError, showSuccess } = useFeedback()

  const handleLogout = async () => {
    try {
      await logout()
      showSuccess('Logout successful')
    } catch (error) {
      showError(error.message)
    }
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar-container">
            <img
              src={user.avatarUrl || profileIcon}
              alt="User Avatar"
              className="profile-avatar"
            />
          </div>
          <div className="user-data-container">
            <div className="profile-username">
              {user.username}
            </div>
            <h2 className="profile-email">
              {user.username}
            </h2>
          </div>
          {/*<div className="extra-container"></div>*/}
          <div className="profile-buttons-containers">
            <div className="group-button-container">
              <button
                onClick={handleLogout}
                className="profile-checkout-button"
              >
                Checkout
              </button>
              <button
                onClick={handleLogout}
                className="user-logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="purchase-history-section">
        <div className="purchase-history-title">
          Purchase history
        </div>
        <div className="purchases-section">
          
        </div>
      </div>
    </>
  )
}
