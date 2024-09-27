import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

import '../css/productCard.css'

export function ProductCard({ product, useVisualEffect = true }) {

  const cardRef = useRef(null)
  useEffect(() => {
    if (useVisualEffect) {
      const card = cardRef.current
      if (card) {
        card.classList.add('not-appear')

        const timeout = setTimeout(() => {
          card.classList.add('appear')
        }, 100)

        return () => clearTimeout(timeout)
      }
    }
  }, [useVisualEffect])

  return (
    product && <div className="card product-card" ref={cardRef}>
      <Link to={`/${product.gender}/${product.type}${product.id ? `/${product.id}` : ''}`}
        className="text-decoration-none">

        <img src={product.images[0]} className="img-fluid" alt={product.title} />

        {product.new && (
          <div className="card-img-overlay card-new-product">
            <p className="card-text">New</p>
          </div>
        )}

        <div className="card-body">
          {product.title && <p className="card-text">{product.title}</p>}
          {product.price && <p className="card-text">${product.price}</p>}
        </div>
      </Link>
    </div>
  )
}
