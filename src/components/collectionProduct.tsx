import {
  ProductListProps,
  collectionData,
} from "@/app/(main)/collection/[collection]/page";
import CollectionProductCart from "./CollectionProductCart";
import { productType } from "@/types/collections";
import axios from "axios";
import { cookies } from "next/headers";

async function CollectionProduct({
  collection,
}: {
  collection: collectionData | undefined;
}) {
  // Retrieve token from cookies
  const token = cookies().get("token") ? cookies().get("token")?.value : "";

  try {
    // Fetch products by collection ID using the specific endpoint
    const { data: products } = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list/collection/${collection?.id}`,
      {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Render the products using CollectionProductCart
    return (
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-3 gap-2 md:justify-start p-2">
          {products.data.map((product: productType) => (
            <CollectionProductCart {...product} key={product.id} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle error gracefully, display a message or return an empty state
    return <p className="text-center text-gray-600"> No product Added to this collection.</p>;
  }
}

export default CollectionProduct;
