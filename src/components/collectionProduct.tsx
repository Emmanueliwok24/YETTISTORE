import {
  ProductListProps,
  collectionData,
} from "@/app/collection/[collection]/page";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./Productcart";
import { token } from "@/utils/token";
import { productType } from "@/types/collections";

async function CollectionProduct({
  collection,
}: {
  collection: collectionData | undefined;
}) {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list`,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache'
    }
  );

  const productJson = products.ok ? await products.json() : [];
  const selectedProducts: productType[] = productJson.data;

  const sortedProducts = selectedProducts.filter(
    (product) => product.collection === collection?.id
  );
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-wrap md:justify-start justify-center gap-3 p-2">
        {sortedProducts.map((product:productType) => (
          <ProductCard {...product} key={product.id}  />
        ))}
      </div>
    </div>
  );
}

export default CollectionProduct;
