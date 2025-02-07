// app/shop/page.tsx
// import CategoryList from "@/components/CategoryList";
// import ProductList from "@/components/ProductList";
// import { Suspense } from "react";
// import Skeleton from "@/components/Skeleton";
// import Pagination from "@/components/Pagination";

// export default async function ShopPage() {
//   return (
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
//       <div className="py-8">
//         <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
        
        {/* Categories Section */}
        {/* <div className="mb-12">
          <h2 className="text-2xl mb-4">Categories</h2>
          <Suspense fallback={<Skeleton />}>
            <CategoryList />
          </Suspense>
        </div> */}

        {/* Products Grid */}
//         <div>
//           <h2 className="text-2xl mb-4">All Products</h2>
//           <Suspense fallback={<Skeleton />}>
//             <ProductList 
//               categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
//             />
//           </Suspense>
          
//         </div>
//       </div>
//     </div>
//   );
// }
// app/shop/page.tsx
// import CategoryList from "@/components/CategoryList";
// import ProductList from "@/components/ProductList";
// import { Suspense } from "react";
// import Skeleton from "@/components/Skeleton";
// import Pagination from "@/components/Pagination";

// // Add searchParams as a prop to the page component
// export default async function ShopPage({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   return (
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
//       <div className="py-8">
//         <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>

//         {/* Products Grid */}
//         <div>
//           <h2 className="text-2xl mb-4">All Products</h2>
//           <Suspense fallback={<Skeleton />}>
//             <ProductList 
//               categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
//               searchParams={searchParams} // Pass searchParams to ProductList
//             />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/shop/page.tsx
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import Pagination from "@/components/Pagination";

// Add searchParams as a prop to the page component
export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl mb-4">All Products</h2>
          <Suspense fallback={<Skeleton />}>
            <ProductList 
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              searchParams={searchParams} // Pass searchParams to ProductList
              limit={8} // Add a limit to show how many products per page
              showPagination={true}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}