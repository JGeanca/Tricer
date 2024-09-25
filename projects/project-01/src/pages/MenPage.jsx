import { HorizontalCarousel } from "../components/HorizontalCarousel";

import "../css/collectionsAndArrivals.css"

{/* Review and delete this */ }
import { ProductCard } from "../components/ProductCard";
import { SampleImageMenHat, SampleImageMenPant, SampleImageMenShirt } from "../assets/Images";

export default function MenPage() {
  return (
    <div>
      <div className="arrivals-section">
        <h1 className="page-title">Arrivals</h1>

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

      <div className="collections-section">
        <h1 className="page-title">Categories</h1>

        <div className="collections-cards">
          <ProductCard
            productName="Clothes"
            isNew={false}>
            <SampleImageMenShirt />
          </ProductCard>

          <ProductCard
            productName="Footwear"
            isNew={false}>
            <SampleImageMenHat />
          </ProductCard>

          <ProductCard
            productName="Accessories"
            isNew={false}>
            <SampleImageMenPant />
          </ProductCard>
          
        </div>
      </div>
    </div>
  )
}
