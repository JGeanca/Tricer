import { Link } from 'react-router-dom'
import '../css/noFoundPage.css'

export default function NoFoundPage() {
  return (
    <div className="no-found-page">
      <div className="no-found-content">
        <h2>404</h2>
        <p>Ooops! Page not found</p>
        <Link to="/" className="home-link"> Go back to the main page</Link>
      </div>
    </div>
  )
}
