import {
  ProductListProps,
  collectionData,
} from "@/app/(main)/collection/[collection]/page";
import ProductCard from "./Productcart";
import { productType } from "@/types/collections";
import axios from "axios";
import { cookies } from "next/headers";

async function CollectionProduct({
  collection,
}: {
  collection: collectionData | undefined;
}) {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";
  const { data: products } = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list`,
    {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const sortedProducts = products.data.filter(
    (product: productType) => product.collection === collection?.id
  );
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-wrap md:justify-start justify-center gap-3 p-2">
        {sortedProducts.map((product: productType) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default CollectionProduct;
