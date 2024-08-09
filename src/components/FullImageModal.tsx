// FullImageModal.tsx
import React from "react";
import Image from "next/image";
import {  LucideX } from "lucide-react";

interface FullImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const FullImageModal: React.FC<FullImageModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white rounded-lg max-w-4xl mx-auto p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-600"
        >
          <LucideX size={24} />
        </button>
        <Image
          src={imageSrc}
          alt="Full Size"
          className="object-contain max-w-full max-h-screen"
          width={1200}
          height={1200}
        />
      </div>
    </div>
  );
};

export default FullImageModal;
