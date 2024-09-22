import "../css/productCard.css"

export function ProductCard({ children, productName, productPrice, isNew }) {
  return (
    <div className="card product-card">
      
      {children}
      {isNew && (
        <div className="card-img-overlay card-new-product">
          <p className="card-text">New</p>
        </div>
      )}

      <div className="card-body">
        {productName && <p className="card-text">{productName}</p>}
        {productPrice && <p className="card-text">{productPrice}</p>}
      </div>
    </div>
  );
}
