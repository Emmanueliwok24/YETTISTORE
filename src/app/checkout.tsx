"use client";
import { useCartContext } from "@/contexts/cart";
import React, { useState, useEffect } from "react";

interface Props {
  close: () => void;
}

const Modal: React.FC<Props> = ({ close }) => {
  const { cart,  } = useCartContext();
  const [quantities] = useState<{ [itemId: string]: number }>(
    {}
  );


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
          <div className="pointer-events-none fixed inset-0 right-0 flex max-w-full ">
            <div className="pointer-events-auto w-full max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Checkout
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={close}
                        type="button"
                        className="relative -m-2 p-2 text-red-400 hover:text-gray-500"
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

                  <form action="" className="mt-6">
                    <div>
                        <label htmlFor="FullName" className="block px-2"> Full Name</label>
                        <input type="text" id="FullName" className="border block mt-2 w-full rounded p-2 " placeholder="Enter full name"/>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="Email" className="block px-2"> Email Address</label>
                        <input type="text" id="Email" className="border block mt-2 w-full rounded p-2 " placeholder="Enter full Email"/>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="phone" className="block px-2"> Phone Number</label>
                        <input type="text" id="phone" className="border block mt-2 w-full rounded p-2 " placeholder="Enter full phone number"/>
                    </div>
                    <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  </form>


                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
