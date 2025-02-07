// import { wixClientServer } from "@/lib/wixClientServer";
// import { products } from "@wix/stores";
// import Image from "next/image";
// import Link from "next/link";
// import  DOMPurify  from "isomorphic-dompurify";
// import Pagination from "./Pagination";

// const PRODUCT_PER_PAGE = 8;

// const ProductList = async ({
//   categoryId,
//   limit,
//   searchParams,
// }: {
//   categoryId: string;
//   limit?: number;
//   searchParams?: any;
// }) => {
//   const wixClient = await wixClientServer();

//   const productQuery = wixClient.products
//     .queryProducts()
//     .startsWith("name", searchParams?.name || "")
//     .eq("collectionIds", categoryId)
//     .hasSome(
//       "productType",
//       searchParams?.type ? [searchParams.type] : ["physical", "digital"] //check
//     )
//     .gt("priceData.price", searchParams?.min || 0)
//     .lt("priceData.price", searchParams?.max || 999999)
//     .limit(limit || PRODUCT_PER_PAGE)
//     .skip(
//       searchParams?.page
//         ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
//         : 0
//     );
//   // .find();

//   if (searchParams?.sort) {
//     const [sortType, sortBy] = searchParams.sort.split(" ");

//     if (sortType === "asc") {
//       productQuery.ascending(sortBy);
//     }
//     if (sortType === "desc") {
//       productQuery.descending(sortBy);
//     }
//   }

//   const res = await productQuery.find();

//   return (
//     <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
//       {res.items.map((product: products.Product) => (
//         <Link
//           href={"/" + product.slug}
//           className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
//           key={product._id}
//         >
//           <div className="relative w-full h-80">
//             <Image
//               src={product.media?.mainMedia?.image?.url || "/product.png"}
//               alt=""
//               fill
//               sizes="25vw"
//               className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
//             />
//             {product.media?.items && (
//               <Image
//                 src={product.media?.items[1]?.image?.url || "/product.png"}
//                 alt=""
//                 fill
//                 sizes="25vw"
//                 className="absolute object-cover rounded-md"
//               />
//             )}
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium">{product.name}</span>
//             <span className="font-semibold">${product.price?.price}</span>
//           </div>
//           {product.additionalInfoSections && (
//             <div
//               className="text-sm text-gray-500"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(
//                   product.additionalInfoSections.find(
//                     (section: any) => section.title === "shortDesc"
//                   )?.description || ""
//                 ),
//               }}
//             ></div>
//           )}
//           <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
//             Add to Cart
//           </button>
//         </Link>
//       ))}
//       {searchParams?.cat || searchParams?.name ? (
//         <Pagination
//           currentPage={res.currentPage || 0}
//           hasPrev={res.hasPrev()}
//           hasNext={res.hasNext()}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default ProductList;
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
  showPagination = false, // Add new prop to control pagination visibility
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
  showPagination?: boolean; // Add type for new prop
}) => {
  const wixClient = await wixClientServer();

  // Validate categoryId
  if (!categoryId) {
    console.error('categoryId is missing or invalid');
    return <div>No category selected.</div>;
  }

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId) // Use the validated categoryId
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  let res;
  try {
    res = await productQuery.find();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">₦{product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-favmic text-favmic w-max py-2 px-4 text-xs hover:bg-favmic hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* {searchParams?.cat || searchParams?.name ? ( */}
       {showPagination && (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      // ) : null}
      )}
    </div>
  );
};

export default ProductList;

// const ProductList = async ({
//   categoryId,
//   limit = 8, // Set default limit to 8
//   searchParams,
// }: {
//   categoryId: string;
//   limit?: number;
//   searchParams?: any;
// }) => {
//   const wixClient = await wixClientServer();

//   // Validate categoryId
//   if (!categoryId) {
//     console.error('categoryId is missing or invalid');
//     return <div>No category selected.</div>;
//   }

//   const currentPage = searchParams?.page ? parseInt(searchParams.page) : 0;

//   const productQuery = wixClient.products
//     .queryProducts()
//     .eq("collectionIds", categoryId)
//     .limit(limit)
//     .skip(currentPage * limit);

//   let res;
//   try {
//     res = await productQuery.find();
//     console.log({
//       totalItems: res.totalCount,
//       currentPage,
//       hasNext: res.hasNext(),
//       hasPrev: res.hasPrev()
//     });
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//     return <div>Failed to load products. Please try again later.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-8">
//       <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
//         {res.items.map((product: products.Product) => (
//           // Your existing product rendering code
//           <Link
//           href={"/" + product.slug}
//           className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
//           key={product._id}
//         >
//           <div className="relative w-full h-80">
//             <Image
//               src={product.media?.mainMedia?.image?.url || "/product.png"}
//               alt=""
//               fill
//               sizes="25vw"
//               className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
//             />
//             {product.media?.items && (
//               <Image
//                 src={product.media?.items[1]?.image?.url || "/product.png"}
//                 alt=""
//                 fill
//                 sizes="25vw"
//                 className="absolute object-cover rounded-md"
//               />
//             )}
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium">{product.name}</span>
//             <span className="font-semibold">${product.price?.price}</span>
//           </div>
//           {product.additionalInfoSections && (
//             <div
//               className="text-sm text-gray-500"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(
//                   product.additionalInfoSections.find(
//                     (section: any) => section.title === "shortDesc"
//                   )?.description || ""
//                 ),
//               }}
//             ></div>
//           )}
//           <button className="rounded-2xl ring-1 ring-favmic text-favmic w-max py-2 px-4 text-xs hover:bg-favmic hover:text-white">
//             Add to Cart
//           </button>
//         </Link>
//         ))}
//       </div>
      
//       {/* Remove any conditions around the Pagination component */}
//       <Pagination
//         currentPage={currentPage}
//         hasPrev={res.hasPrev()}
//         hasNext={res.hasNext()}
//       />
//     </div>
//   );
// };

// export default ProductList;