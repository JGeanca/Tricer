

export default function PurchaseCard( product ) {


  return (
    product && <div className="product-purchase">
      { product.title }
    </div>
  )
}