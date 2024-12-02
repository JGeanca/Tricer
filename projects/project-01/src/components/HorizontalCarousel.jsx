import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from '../assets/Icons'
import { ProductCard } from '../components/ProductCard'

import '../css/horizontalCarousel.css'

export function HorizontalCarousel({ products, itemsPerCarousel }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const itemsPerPage = Math.min(itemsPerCarousel, products.length)
  const totalItems = products.length

  const handleNext = useCallback(() => {
    setCurrentItemIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalItems
      return nextIndex
    })
  }, [totalItems])

  const handlePrev = useCallback(() => {
    setCurrentItemIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + totalItems) % totalItems
      return nextIndex
    })
  }, [totalItems])

  useEffect(() => {
    const intervalId = setInterval(handleNext, 12000)
    return () => clearInterval(intervalId)
  }, [handleNext])

  const displayedItems = Array.from({ length: itemsPerPage }, (_, i) =>
    products[(currentItemIndex + i) % totalItems])

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button">
        <ChevronLeft />
      </button>
      <div className="carousel-inner">
        {displayedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button onClick={handleNext} className="carousel-button">
        <ChevronRight />
      </button>
    </div>
  )
}
