
export function HorizontalCarouselItem({children}) {
  return (
    <div className="carousel-item active" data-bs-interval="10000">
      {children}
    </div>
  );
}