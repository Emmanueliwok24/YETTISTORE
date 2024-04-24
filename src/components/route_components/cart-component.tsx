"use client"
import { useCartContext } from "@/contexts/cart";
import CheckOutCartCard from "../checkout-cart-card";

export default function CartSideComponent() {
    const { cart } = useCartContext()
    return (
        <>
            <div className="bg-cyan-50 p-5 px-10 overflow-y-scroll h-full">
                <div className="h-[60vh]">
                    <h2 className="font-bold text-lg mb-5">ORDER SUMMARY</h2>
                    {cart.map((item, index) => (
                        <CheckOutCartCard {...item} key={index} />
                    ))}
                    <div className="pt-3 flex justify-between mb-4">
                        <p>Subtotal</p>
                        <p>$100.00</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p>Shipping</p>
                        <p>$0.00</p>
                    </div>
                    <div className="flex items-center border-t py-4">
                        <h3 className="font-semibold">Total</h3>
                        <h3 className="ml-auto font-bold">$100.00</h3>
                    </div>
                </div>
            </div>
        </>
    )
}