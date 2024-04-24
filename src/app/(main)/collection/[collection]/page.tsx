import CollectionProduct from "@/components/collectionProduct";
import Header from "@/components/header";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export type collectionData = {
  id: number;
  name: string;
  image: string;
};

export type ProductListProps = {
  message: string;
  data: collectionData;
};

async function fetchCollections({
  params,
}: {
  params: { collection: number };
}) {
  const token = cookies().get("token") ? cookies().get("token")?.value : "";

  const { data: collection }: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/${params.collection}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );

  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <Header />

        <h1 className="text-lg font-semibold p-4 "> {collection?.data?.name}</h1>
        <CollectionProduct collection={collection?.data} />
      </div>
    </>
  );
}

export default fetchCollections;
