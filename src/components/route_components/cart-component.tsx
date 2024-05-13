"use client"
import { useCartContext } from "@/contexts/cart";
import CheckOutCartCard from "../checkout-cart-card";
import { useSubtotal } from "@/contexts/subtotal";

export default function CartSideComponent() {
    const { cart } = useCartContext()
    const { subtotal } = useSubtotal()
    console.log("Cart", cart)
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
                        <p>₦{subtotal}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p>Shipping</p>
                        <p>₦{2000}</p>
                    </div>
                    <div className="flex items-center border-t py-4">
                        <h3 className="font-semibold">Total</h3>
                        <h3 className="ml-auto font-bold">₦{(subtotal + 2000).toLocaleString()}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}