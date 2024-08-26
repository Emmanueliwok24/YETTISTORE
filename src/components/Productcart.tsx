"use client";
import { useCartContext } from "@/contexts/cart";
import { productType } from "@/types/collections";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

function ProductCard({
  title,
  media,
  description,
  price,
  id,
  collection,
  cost_price,
}: productType) {
  const { addToCart, updateQuantity, cart } = useCartContext();
  const productInCart = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (productInCart) {
      setQuantity(productInCart.quantity);
    } else {
      setQuantity(0); // Reset the quantity if the product is removed from the cart
    }
  }, [productInCart, cart]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      handleQuantityChange(1);
      toast.success("Increased quantity in Cart");
    } else {
      toast.success("Added to Cart");
      addToCart({
        id,
        name: title,
        price: Number(price),
        quantity: 1,
        collection: String(collection),
        image: media,
      });
      setQuantity(1);
    }
    saveCartToServer();
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change); // Ensure quantity never goes below 1
    setQuantity(newQuantity);

    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }

    saveCartToServer();
  };

  const saveCartToServer = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart/`, cart, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
        },
      });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border p-2 px-3 snap-center flex-shrink-0 w-[250px] mb-2 flex flex-col justify-between bg-white">
      <div
        className="rounded-xl overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={media}
          alt={title}
          className="aspect-square object-contain transition-transform duration-300 hover:scale-105"
          width={150}
          height={150}
        />
      </div>
      <div>
        <h1 className="font-normal text-lg">{title}</h1>
        <p className="text-xs text-gray-400 mt-2 break-words">{description}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between mt-2 items-center">
          <small className="text-[#02A9F7] text-md font-semibold">₦{price}</small>
          <small className="text-gray-500 line-through">₦{cost_price}</small>
        </div>
        {quantity < 1 ? (
          <button
            onClick={handleAddToCart}
            className="text-center block w-full mt-2 text-white px-6 py-2 bg-[#0291f7] rounded hover:bg-teal-800 duration-300"
          >
            Add to cart
          </button>
        ) : (
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="text-center block text-white px-4 py-2 bg-[#0291f7] rounded hover:bg-teal-800 duration-300"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="mx-2 w-full py-1 text-center border border-gray-300 rounded"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="text-center block text-white px-4 py-2 bg-[#0291f7] rounded hover:bg-teal-800 duration-300"
            >
              +
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleCloseModal}
        >
          <div className="relative w-auto bg-white">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 bg-white hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <Image
              src={media}
              alt={title}
              className="object-contain aspect-square"
              width={400}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
