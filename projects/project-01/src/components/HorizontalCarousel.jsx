import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '../assets/Icons';

import "../css/horizontalCarousel.css"

export function HorizontalCarousel({ children }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const itemsPerPage = Math.min(3, React.Children.count(children));
  const totalItems = React.Children.count(children);

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
    const intervalId = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const start = currentItemIndex;
  const end = start + itemsPerPage;

  const displayedItems = React.Children.toArray(children)
    .concat(React.Children.toArray(children))
    .slice(start, end);

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button">
        <ChevronLeft />
      </button>
        <div className="carousel-inner">
          {displayedItems}
        </div>
      <button onClick={handleNext} className="carousel-button">
        <ChevronRight />
      </button>
    </div>
  );
}
