
import Header from "@/components/header";
import Hero from "@/components/hero";
import HomeShop, { HomeShopProps } from "@/components/homeShopComponenet";
import { collectionsType } from "@/types/collections";
import axios, { AxiosResponse } from "axios";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { toast } from "sonner";

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
  Store_Details: StoreDetails[];
};

async function Store({ params }: {

  params: {
    id: string;
  }
}) {


  // <ClearToast />
  console.log(params.id);

  // Log the endpoint value
  console.log(process.env.NEXT_PUBLIC_ENDPOINT);

  // Retrieve token from cookies
  const token = cookies().get("token") ? cookies().get("token")?.value : "";

  // Configure headers
  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Log request headers

  try {
    // Make request to fetch collections
    const { data: collections }: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/list/${params.id}`,
      config
    );



    return (
      <>
        <div className="mx-auto max-w-screen-xl md:px-4">
          <Header />

          <div className="mt-4">
            <Hero name={params.id} />
          </div>

          <div className="mt-10">
            <h1 className="px-2 text-3xl font-bold mb-5">Collections</h1>
          </div>

          <div>
            {/* <StoreCard stores={stores.data} /> */}
          </div>


          {collections.data.map((collection: collectionsType) => (
            <div className="mt-10 px-2" key={collection.id}>
              {/* Pass store_name as a prop to HomeShop */}
              <HomeShop {...collection} key={collection.id} store_name={params.id} />
              {/* <div className="flex justify-end m-2">
                <Link href={`/collection/${collection.id}`} className="items-center flex gap-2 text-black">View All Products <MoveRight strokeWidth="1" className="transform transition-transform duration-300 hover:translate-x-2" /> </Link>
              </div> */}
            </div>
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching collections:", error);

    // Handle error gracefully, display a message or redirect to an error page
    return  <div className="mx-auto max-w-screen-xl text-center">
    <p id="normal">Please, kindly paste <b>Store Link</b> In the <b>URL bar</b> / <b>SEARCH bar correctly</b> </p>
    <div className=" w-100">
    <Image src='/url.png' width='1200' height='400' className="W-100 mt-5  mx-auto " alt="image"/>

    </div>
  </div>
  }
}

export default Store;
