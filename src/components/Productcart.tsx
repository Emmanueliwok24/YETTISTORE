"use client";
import { useCartContext } from "@/contexts/cart";
import { productType } from "@/types/collections";
import Image from "next/image";
import Link from "next/link";

function ProductCard({
  title,
  media,
  description,
  price,
  id,
  collection,
}: productType) {
  const { addToCart } = useCartContext();
  const AddthistoCart = () => {
    return addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      collection: String(collection),
      image: media,
    });
  };
  return (
    <div className=" snap-mandatory flex  ">
      <div className="border-[0.1px]  flex flex-col justify-between max-w-[320px]  rounded-xl snap-center  ">
        <Link
          href="#"
          className="overflow-hidden text-center rounded-xl rounded-b-none  block "
        >
          <Image
            src={media}
            alt="product1"
            className="  aspect-square object-cover  transition-all duration-300 hover:scale-105  shadow "
            width={300}
            height={400}
          />
        </Link>
        <div className="px-4 py-2 ">
          <h1 className="flex justify-between  font-normal text-lg">
            {title}
          </h1>
          <p className="text-xs text-gray-400 mt-2 text-wrap ">{description}</p>
          <div className="flex items-end mt-3 gap-2  ">
            <small className="text-[#02A9F7]  text-lg">
              ${price}
            </small>
            <button
              onClick={AddthistoCart}
              className="text-center truncate text-white  px-6 py-2 bg-[#02A9F7] ms-auto rounded hover:bg-teal-800  duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProductCard;
