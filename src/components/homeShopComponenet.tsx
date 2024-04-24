import { token } from "@/utils/token";
import ProductCard from "./Productcart";
import { collectionsType, productType } from "@/types/collections";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cookies } from "next/headers";
import axios from "axios";

const HomeShop = async ({ name, id }: collectionsType) => {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";
  const { data: products } = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list`,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const sortedProducts = products.data.filter(
    (product: productType) => product.collection === id
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
