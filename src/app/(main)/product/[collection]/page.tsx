import Header from '@/components/header';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import CollectionProductCard from '@/components/CollectionProductCard';
import HamburgerMenu from '@/components/HamburgerMenu';
import Link from 'next/link';
import { LucideArrowLeft } from 'lucide-react';

interface ProductType {
  id: number;
  title: string;
  description: string;
  media: string;
  price: string;
  discounted_price: string | null;
  cost_price: string;
  stock_count: number;
  stock_keeping_unit: string | null;
  item_unit: number;
  size: number;
  color: string | null;
  collection: number;
  status: string;
  theme: string;
}

interface CollectionResponse {
  error: boolean;
  message: string;
  data: ProductType[];
}



const fetchCollectionOverview = async (collectionId: number): Promise<CollectionResponse> => {
  try {
    const token = cookies().get('token')?.value || '';
    const res: AxiosResponse<CollectionResponse> = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/product/list/collection/${collectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { ...res.data, error: false };
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    return { error: true, message: 'Something went wrong', data: [] };
  }
};



const CollectionOverview = async ({ params }: { params: { collection: string } }) => {
  const collectionId = parseInt(params.collection, 10);

  if (isNaN(collectionId)) {
    return <p>Invalid collection ID</p>;
  }

  const { data: products, error } = await fetchCollectionOverview(collectionId);

  if (error) {
    return <div className='flex mx-auto max-w-screen-xl border-b p-2 border-dashed '>
      <small className='text-sm'>

      <Link href='/' className='flex items-center'> <LucideArrowLeft /> Back</Link>
      </small>
      <div className=' text-center w-full '>

      <p className='text-gray-800'>No Product Here!.</p>
      </div>
    </div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl md:px-4 p-2">
      <Header />
      <div className='relative overflow-y-auto h-auto overflow-x-hidden'>
        <div className="mt-2 top-0">
          <HamburgerMenu selectedCollectionId={collectionId} />
        </div>
        <div className="w-[100%]">
          {products.length === 0 ? (
            <p>No Products Found in this collection.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-3 gap-2 md:justify-start mt-2">
              {products.map((product) => (
                <CollectionProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionOverview;
