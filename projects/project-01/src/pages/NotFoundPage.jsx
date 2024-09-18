import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Page not found</p>

      <Link to="/">Go to Home Page</Link>
    </div>
  )
}