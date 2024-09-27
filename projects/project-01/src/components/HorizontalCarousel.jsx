import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '../assets/Icons';
import { ProductCard } from "../components/ProductCard";

import "../css/horizontalCarousel.css"

export function HorizontalCarousel({ products, itemsPerCarousel }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const itemsPerPage = Math.min(itemsPerCarousel, products.length);
  const totalItems = products.length;

  const handleNext = () => {
    setCurrentItemIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalItems;
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentItemIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + totalItems) % totalItems;
      return nextIndex;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 12000);
    return () => clearInterval(intervalId);
  }, []);

  const displayedItems = Array.from({ length: itemsPerPage }, (_, i) =>
  products[(currentItemIndex + i) % totalItems]);

  console.log(displayedItems)

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button">
        <ChevronLeft />
      </button>
      <div className="carousel-inner">
        {displayedItems.map((product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </div>
      <button onClick={handleNext} className="carousel-button">
        <ChevronRight />
      </button>
    </div>
  );
}
