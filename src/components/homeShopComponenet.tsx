import { cookies } from "next/headers";
import axios from "axios";
import ProductCard from "./Productcart";
import { collectionsType, productType } from "@/types/collections";
import Link from "next/link";
import { MoveRight } from "lucide-react";

// Define props for HomeShop component including store_name
export interface HomeShopProps extends collectionsType {
  store_name: string;
}

const HomeShop = async ({ name, id, store_name }: HomeShopProps) => {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";
  const { data: products } = await axios.get(
    // Use the new endpoint with store_name
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/products/${store_name}/`,
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
  return (
    <>
      <div>
        <h1 className="text-lg font-semibold mb-1 p-2">{name} Collection</h1>
      </div>

      <div className="  flex   snap-mandatory snap-x overflow-auto gap-3 clean-sidebar">
        {sortedProducts.map((product: productType) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default HomeShop;
