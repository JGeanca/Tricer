import React, { useState } from 'react';

import "../css/horizontalCarousel.css"

export function HorizontalCarousel({ children }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const itemsPerPage = 3;
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

  const start = currentItemIndex;
  const end = start + itemsPerPage;

  const displayedItems = React.Children.toArray(children)
    .concat(React.Children.toArray(children))
    .slice(start, end);

  return (
    <div className="carousel">
      <button onClick={handlePrev} className="carousel-button">Prev</button>
      <div className="carousel-inner">
        {displayedItems}
      </div>
      <button onClick={handleNext} className="carousel-button">Next</button>
    </div>
  );
}
