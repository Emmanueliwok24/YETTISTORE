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
        // Sort collections alphabetically by name
        const sortedCollections = response.data.sort((a: Collection, b: Collection) => a.name.localeCompare(b.name));
        setCollections(sortedCollections);
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
    <div className="collection-list flex flex-wrap gap-1">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className={`collection-item cursor-pointer p-2 px-3 border text-gray-800 border-gray-300 rounded-lg hover:bg-gray-100  ${
            selectedCollectionId === collection.id ? 'bg-blue-500 text-white  hover:bg-blue-500 ' : ''
          }`}
          onClick={() => handleCollectionClick(collection.id)}
        >
          <small className="text-sm font-semibold">{collection.name}</small>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
