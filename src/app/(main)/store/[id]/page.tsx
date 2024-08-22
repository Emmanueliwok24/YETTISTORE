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
import CollectionList from "@/components/CollectionList";

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
          <div className="mx-auto max-w-screen-xl md:px-4 ">
            <Header />

            <div className="mt-2">
              <Hero name={params.id} />
            </div>




            {collections.data.map((collection: collectionsType) => (
              <div className="mt-2 px-2 border-b border-gray-200 border-dashed " key={collection.id}>
                {/* Pass store_name as a prop to HomeShop */}
                <HomeShop {...collection} key={collection.id} store_name={params.id} />
              </div>
            ))}
          </div>
        </>
      );
    } catch (error) {
      console.error("Error fetching collections:", error);

      // Handle error gracefully, display a message or redirect to an error page
      return  <Link href={"/"} className="mx-auto max-w-screen-xl text-center">
        <span className="  flex items-center justify-center "> <Image src="/error.png" alt="error-img" width={200}  height={200} className=" m-0 p-0 shadow"/>  </span>
      <p className=""><strong className="text-red-700 text-xl">OPPs! </strong>
       Seems like You Typed in a wrong <strong>Store Name</strong></p>
      <p >Please click <b>here</b> to Re-enter the <strong>Store Name.</strong></p>

      </Link>
    }
  }



  export default Store;
