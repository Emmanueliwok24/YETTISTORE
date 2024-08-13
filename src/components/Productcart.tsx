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
  const { addToCart, removeFromCart, updateQuantity, cart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productInCart = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : 1);

  // Save cart to localStorage
  const saveCartToLocalStorage = (cart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Update cart in localStorage whenever it changes
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const AddToCart = () => {
    if (productInCart) {
      // Update quantity if product is already in the cart
      handleQuantityChange(1);
      toast.success("Increased quantity in Cart");
    } else {
      // Add new product to cart
      toast.success("Added to Cart");
      addToCart({
        id,
        name: title,
        price,
        quantity: 1,
        collection: String(collection),
        image: media,
      });
    }

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
  };

  const handleQuantityChange = (change: number) => {
    if (productInCart) {
      const newQuantity = Math.max(1, quantity + change); // Ensure quantity is always at least 1
      setQuantity(newQuantity);
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity);
      } else {
        removeFromCart(id);
      }
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (productInCart && quantity !== productInCart.quantity) {
      updateQuantity(id, quantity);
    }
  }, [quantity, productInCart, id, updateQuantity]);

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
        <p className="text-xs text-gray-400 mt-2 break-words">
          {description}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between mt-2 items-center">
          <small className="text-[#02A9F7] text-md font-semibold">₦{price}</small>
          <small className="text-gray-500 line-through">₦{cost_price}</small>
        </div>

        {quantity < 1 ? (
          <button
            onClick={AddToCart}
            className="text-center block w-full mt-2 text-white px-6 py-2 bg-[#0291f7] rounded hover:bg-teal-800 duration-300"
          >
            Add to cart
          </button>
        ) : productInCart ? (
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
        ) : (
          <button
            onClick={AddToCart}
            className="text-center block w-full mt-2 text-white px-6 py-2 bg-[#0291f7] rounded hover:bg-teal-800 duration-300"
          >
            Add to cart
          </button>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={handleCloseModal}
        >
          <div className="relative w-auto bg-white ">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 bg-white hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <Image
              src={media}
              alt={title}
              className="object-contain aspect-square "
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
