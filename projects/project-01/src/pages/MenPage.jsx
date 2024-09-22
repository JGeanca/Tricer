import { HorizontalCarousel } from "../components/HorizontalCarousel";

import "../css/collectionsAndArrivals.css"

{/* Review and delete this */}
import { ProductCard } from "../components/ProductCard";
import { SampleImageMenHat, SampleImageMenPant, SampleImageMenShirt } from "../assets/Images";

export default function MenPage() {
  return (
    <div className="arrivals-section">
      <h1 className="page-title">Nuevos productos</h1>

      <HorizontalCarousel>

        <ProductCard
            productName="Test one"
            productPrice="Test Price"
            isNew={true}>
          <SampleImageMenHat />
        </ProductCard>

        <ProductCard
          productName="Test two"
          isNew={true}>
          <SampleImageMenPant />
        </ProductCard>

        <ProductCard
          productName="Test three">
          <SampleImageMenShirt />
        </ProductCard>

        <ProductCard
            isNew={false}>
          <SampleImageMenHat />
        </ProductCard>

        <ProductCard
          isNew={true}>
          <SampleImageMenPant />
        </ProductCard>

      </HorizontalCarousel>

    </div>
  )
}

{/* <ProductCard
  productName="Test one"
  productPrice="Test Price"
  isNew={true}>
  <SampleImageMenHat />
</ProductCard>

<ProductCard
  productName="Test two"
  isNew={true}>
  <SampleImageMenPant />
</ProductCard>

<ProductCard
  productName="Test three">
  <SampleImageMenShirt />
</ProductCard> */}