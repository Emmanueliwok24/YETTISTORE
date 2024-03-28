import Header from "@/components/header";
import Hero from "@/components/hero";
import HomeShop from "@/components/homeShopComponenet";
import { collectionsType } from "@/types/collections";
import { token } from "@/utils/token";
import { MoveRight } from "lucide-react";
import Link from "next/link";

async function page({ name }: collectionsType) {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/list`,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  );

  const collectionsJson = collections.ok ? await collections.json() : null;
  console.log(collectionsJson);

  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <Header />

        <div className="mt-4">
          <Hero />
        </div>

        {collectionsJson &&
          collectionsJson.data.map((collection: collectionsType) => (
            <div className="mt-10  px-2">
              <HomeShop {...collection} key={collection.id} />
              <div className=" flex justify-end m-2">
                <Link href={`/collection/${collection.id}`} className=" items-center flex gap-2  text-black">View All Products <MoveRight stroke-width="1"  className=" transform  transition-transform duration-300 hover:translate-x-2"  /> </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
