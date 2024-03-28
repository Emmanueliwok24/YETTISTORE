import { token } from "@/utils/token";
import ProductCard from "./Productcart";
import { collectionsType, productType } from "@/types/collections";
import Link from "next/link";
import {  MoveRight } from "lucide-react";

const HomeShop = async ({ name, id }: collectionsType) => {
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
    (product) => product.collection === id
  );
  const displayedProducts = sortedProducts.slice(0, 4); // Display only first three products
  return (
    <>
      <div >
        <h1 className="text-lg font-semibold mb-1 p-2"> {name} Collection</h1>
      </div>

      <div className="flex snap-mandatory snap-x  overflow-auto gap-3">
        {displayedProducts.map((product: productType) => (
          <ProductCard {...product} key={product.id} />
        ))}

      </div>
    </>
  );
};

export default HomeShop;
