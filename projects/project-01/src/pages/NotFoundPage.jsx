import { Link } from 'react-router-dom'
import '../css/notFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h2>404</h2>
        <p>Página no encontrada</p>
        <Link to="/" className="home-link">Volver a la página principal</Link>
      </div>
    </div>
  )
}
