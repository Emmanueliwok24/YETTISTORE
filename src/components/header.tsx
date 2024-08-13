"use client";
import { useState, useEffect } from "react";
import { LucideTruck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import ShoppingModal from "@/app/(main)/cart";
import { useCartContext } from "@/contexts/cart";
import Link from "next/link";
import { toast } from "sonner";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeLink, setStoreLink] = useState<string | null>(null);

  useEffect(() => {
    const storedLink = localStorage.getItem("storeLink");
    setStoreLink(storedLink);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toastMSG = () => {
    toast.info("Order");
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  };

  const { cart } = useCartContext();

  return (
    <>
      <nav className="flex items-center justify-between p-3 px-5 z-10 sticky w-full top-0 border-b bg-white">
        <span>
          <Link href={storeLink ? `/store/${storeLink}` : "/"}>
            <Image src="/logo.svg" className="h-auto w-[72]" priority alt="logo" width={72} height={72} />
          </Link>
        </span>
        <div className="flex items-center gap-2">
          <Link href="/order" onClick={toastMSG} className="flex bg-[#35a4ff] text-white items-center p-2 gap-1 rounded">
            Orders
            <ShoppingCart size={20} className="text-white cursor-pointer" />
          </Link>
          <span className="relative cursor-pointer" onClick={openModal}>
            <ShoppingCart size={30} className="text-gray-700" />
            <small className="bg-[red] p-1 rounded-full font-bold absolute text-white px-[8px] text-[.5rem] -top-2 -right-3">
              {cart.length}
            </small>
          </span>
        </div>
      </nav>
      <header className="mx-auto max-w-screen-xl"></header>
      <div className="-z-10">
        {isModalOpen && <ShoppingModal close={closeModal} />}
      </div>
    </>
  );
};

export default Header;
