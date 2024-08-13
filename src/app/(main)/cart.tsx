"use client";
import { CartItem, useCartContext } from "@/contexts/cart";
import React, { useState, useEffect } from "react";
import CheckoutModal from "./checkout";
import Image from "next/image";
import Link from "next/link";
import { useSubtotal } from "@/contexts/subtotal";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  close: () => void;
}

const ShoppingModal: React.FC<Props> = ({ close }) => {
  const { setSubtotalValue, subtotal } = useSubtotal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  const opeCheckOutModal = () => {
    setIsModalOpen(true);
  };
  const closeCheckOutModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      return cart.reduce((acc, item) => {
        return acc + item.price * (item.quantity || 1);
      }, 0);
    };
    setSubtotalValue(calculateSubtotal());
  }, [cart, setSubtotalValue]);

  const handleQuantityChange = async (id: number, quantity: number) => {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    updateQuantity(id, quantity);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart/`,
        cart,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + document.cookie.split("token=")[1].split(";")[0], // get token from cookie
          },
        }
      );
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const incrementQuantity = (id: number, quantity: number) => {
    handleQuantityChange(id, quantity + 1);
  };

  const decrementQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      handleQuantityChange(id, quantity - 1);
    } else {
      toast.error("Quantity must be at least 1");
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden ">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={close}
          >
            {" "}
          </div>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
            <div className="pointer-events-auto w-full max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={close}
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5 "></span>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.map((item) => (
                          <li className="flex py-6 " key={item.id}>
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                width={96}
                                height={96}
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{item.name}</a>
                                  </h3>
                                  <p className="ml-4">₦{item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.collection}
                                </p>
                              </div>
                              <div className="flex mt-4 items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <label
                                    htmlFor={`quantity${item.id}`}
                                    className="mr-2"
                                  >
                                    Qty
                                  </label>
                                  {/* Quantity input field */}
                                  <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                      onClick={() => decrementQuantity(item.id, item.quantity || 1)}
                                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                    >
                                      -
                                    </button>
                                    <input
                                      id={`quantity${item.id}`}
                                      type="number"
                                      min="1"
                                      value={item.quantity || 1}
                                      readOnly
                                      className="w-16 py-1 text-center border-none"
                                    />
                                    <button
                                      onClick={() => incrementQuantity(item.id, item.quantity || 1)}
                                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="z-10">
                  {isModalOpen && <CheckoutModal close={closeCheckOutModal} />}
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₦{subtotal}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/information"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        onClick={close}
                        className="font-medium ms-2 text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping<span aria-hidden="true"> →</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingModal;
