// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CollectionProductItem from './CollectionProductItem'; // Import the new component

// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   date_created: string;
// };

// type CollectionData = {
//   id: number;
//   name: string;
//   description: string;
//   products: Product[];
// };

// type CollectionOverviewProps = {
//   collection: CollectionData;
// };

// const CollectionOverview: React.FC<CollectionOverviewProps> = ({ collection }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list/collection/${collection.id}`
//         );
//         setProducts(response.data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [collection.id]);

//   if (loading) {
//     return <div className="text-center">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="collection-overview mx-auto max-w-screen-xl">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-bold">{collection.name}</h1>
//         <p className="text-gray-600">{collection.description}</p>
//       </div>
//       <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <CollectionProductItem {...product} key={product.id} />
//           ))
//         ) : (
//           <div className="text-center col-span-full">No products available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CollectionOverview;
