import CollectionProduct from "@/components/collectionProduct";
import Header from "@/components/header";
import { token } from "@/utils/token";

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/${params.collection}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }
  );
  const data = res.ok ? ((await res.json()) as ProductListProps) : null;


  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <Header />

        <h1 className="text-lg font-semibold p-4 "> {data?.data?.name}</h1>
        <CollectionProduct collection={data?.data} />
      </div>
    </>
  );
}

export default fetchCollections;
