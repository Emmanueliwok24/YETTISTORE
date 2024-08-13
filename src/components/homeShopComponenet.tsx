import { cookies } from "next/headers";
import axios from "axios";
import ProductCard from "./Productcart"; // Ensure correct import
import { collectionsType, productType } from "@/types/collections";
import Link from "next/link"; // Import Link from next/link
import { LucideArrowUpRight, MoveRight } from "lucide-react"; // Import MoveRight icon

// Define props for HomeShop component including store_name
export interface HomeShopProps extends collectionsType {
  store_name: string;
}

const HomeShop = async ({ name, id, store_name }: HomeShopProps) => {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";

  try {
    const { data: products } = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/product/products/${store_name}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const sortedProducts = products.data
      .filter((product: productType) => product.collection === id)
      .slice(0, 5); // Limit the number of products to 5

    return (
      <div className="relative">
        {sortedProducts.length > 0 && (
          <div className="absolute bottom-0 right-0 p-2 z-2">
            <Link
              href={`/collection/${id}`} // Update link to use `id` directly
              className="items-center flex group gap-2 text-sm text-black bg-white p-2 rounded shadow-lg"
            >
              <small className="group-hover:block hidden">

              View all {name} collectiond{" "}
              </small>
              <LucideArrowUpRight/>
            </Link>
          </div>
        )}

        <div className="flex snap-mandatory snap-x mt-5 overflow-auto gap-3 clean-sidebar">
          {sortedProducts.map((product: productType) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Return null when there's an error
  }
};

export default HomeShop;
