'use client'; // This is a client-side component

import { useState } from 'react';
import CollectionList from '@/components/CollectionList';
import { Menu, X } from 'lucide-react'; // Assuming you use Lucide icons

interface HamburgerMenuProps {
  selectedCollectionId: number;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ selectedCollectionId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='overflow-hidden'>
      <button
        className="p-2 border rounded focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle collection list"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Slide out menu on smaller screens */}
      <div
        className={`absolute py-4 bg-white ${
          isOpen ? ' block ' : ' hidden '
        }`}
      >
        <CollectionList selectedCollectionId={selectedCollectionId} />
      </div>
    </div>
  );
};

export default HamburgerMenu;
