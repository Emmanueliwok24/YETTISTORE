"use client";
import { useCartContext } from "@/contexts/cart";
import { productType } from "@/types/collections";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";

function ProductCard({
  title,
  media,
  description,
  price,
  id,
  collection,
  cost_price,
}: productType) {
  const { addToCart, cart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const AddToCart = () => {
    toast.success("Added to Cart");
    axios
      .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart/`, cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + document.cookie.split("token=")[1].split(";")[0], // Get token from cookie
        },
      })
      .then(() => {
        toast.dismiss();
      });

    return addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      collection: String(collection),
      image: media,
    });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border rounded-xl snap-center flex-shrink-0 w-[250px] flex flex-col justify-between bg-white" >
        <div
          className="mt-2  rounded-xl  overflow-hidden  flex items-center  justify-center cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={media}
            alt={title}
            className="aspect-square object-contain  transition-transform duration-300 hover:scale-105"
            width={150} // Adjust width to fit the card
            height={150} // Adjust height to fit the card
          />
        </div>
        <div className="px-4 py-2">
          <h1 className="font-normal text-lg ">{title}  </h1>
          <p className="text-xs text-gray-400 mt-2 break-words">
            {description}
          </p>
          <div className="flex justify-between mt-2 items-center">

            <small className="text-[#02A9F7] text-lg">₦{price}</small>
            <small className="text-gray-500 line-through">₦{cost_price}</small>
          </div>
            <button
              onClick={AddToCart}
              className="text-center truncate block w-full mt-2 text-white px-6 py-2 bg-[#0291f7]  rounded hover:bg-teal-800 duration-300"
            >
              Add to cart
            </button>
        </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleCloseModal}
        >
          <div className="relative w-full max-w-3xl bg-white p-4 rounded-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24}  />
            </button>
            <Image
              src={media}
              alt={title}
              className="object-cover w-full h-full"
              width={800}
              height={800}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
