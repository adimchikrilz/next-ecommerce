// app/deals/page.tsx
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

export default function DealsPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Special Deals</h1>
        
        {/* Featured Deal Banner */}
        <div className="bg-favmic text-white p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-2">Flash Sale!</h2>
          <p className="mb-4">Get up to 50% off on selected items</p>
          <div className="flex gap-4">
            <div className="bg-white text-favmic px-4 py-2 rounded">
              <span className="font-bold">23</span> Hours
            </div>
            <div className="bg-white text-favmic px-4 py-2 rounded">
              <span className="font-bold">45</span> Minutes
            </div>
            <div className="bg-white text-favmic px-4 py-2 rounded">
              <span className="font-bold">60</span> Seconds
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <Suspense fallback={<Skeleton />}>
          <ProductList 
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          />
        </Suspense>
      </div>
    </div>
  );
}