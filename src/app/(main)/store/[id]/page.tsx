import Header from "@/components/header";
import Hero from "@/components/hero";
import HomeShop from "@/components/homeShopComponenet";
import StoreCard from "@/components/storecard";
import { collectionsType } from "@/types/collections";
import axios, { AxiosResponse } from "axios";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export type StoreDetails = {
  id: number;
  store_name: string;
  store_domain: string;
  industry: string[];
  type_of_seller: string;
  product_type: string[];
  business_location: string;
  account_balance: string;
};

export type DataType = {
  Name: string;
  Email: string;
  Store_Details: StoreDetails[]
};

async function Store({ params }: {
  params: {
    id: string;
  }
}) {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";
  const { data: collections }: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/list/${params.id}`,
    {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4">
        <Header />

        <div className="mt-4">
          <Hero name={params.id} />
        </div>

        <div className="mt-10">
          <h1 className="md:text-3xl text-lg font-bold mb-5">Collections</h1>
        </div>
        <div>
          {/* <StoreCard stores={stores.data} /> */}
        </div>

        {
          collections.data.map((collection: collectionsType) => (
            <div className="mt-10  px-2" key={collection.id}>
              <HomeShop {...collection} key={collection.id} />
              <div className=" flex justify-end m-2">
                <Link href={`/collection/${collection.id}`} className=" items-center flex gap-2  text-black">View All Products <MoveRight strokeWidth="1" className=" transform  transition-transform duration-300 hover:translate-x-2" /> </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Store;
