import { capitalize } from '../utils/utils';
import '../css/orderProduct.css';

export default function OrderProduct({ orderData, visible }) {
  return (
    visible && (
      <div className="order-products-container">
        {orderData.items ? (
          orderData.items.map((item, index) => (
            <div key={index} className="order-product">
              <div className="order-product-details">
                <div className="detail-group">
                  <h3 className="order-product-title">{item.title}</h3>
                  <p>
                    <strong>Brand:</strong> {capitalize(item.brand)}
                  </p>
                </div>
                <div className="detail-group">
                  <p>
                    <strong>Size:</strong> {item.size}
                  </p>
                  <p>
                    <strong>Color:</strong> {capitalize(item.color)}
                  </p>
                </div>
                <div className="detail-group">
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="order-product-images">
                {item.images.slice(0, 3).map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${item.title} ${idx + 1}`}
                    className="order-product-image"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Loading items...</p>
        )}
      </div>
    )
  );
}
