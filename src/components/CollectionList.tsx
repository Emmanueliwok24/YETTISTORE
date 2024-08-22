import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Collection = {
  id: number;
  name: string;
};

interface CollectionListProps {
  selectedCollectionId: number | null; // Allow null
}

const CollectionList: React.FC<CollectionListProps> = ({ selectedCollectionId }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/product/collections/list/all`);
        setCollections(response.data);
      } catch (error: any) {
        console.error("An error occurred while fetching collections.", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionClick = (collectionId: number) => {
    router.push(`/product/${collectionId}`);
  };
  return (
    <div className="collection-list flex flex-wrap gap-2">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className={`collection-item cursor-pointer p-4 border border-gray-300 rounded-lg hover:bg-gray-100 ${
            selectedCollectionId === collection.id ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleCollectionClick(collection.id)}
        >
          <h3 className="text-lg font-semibold">{collection.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
