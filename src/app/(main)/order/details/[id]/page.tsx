"use client";
import Header from "@/components/header";
import { LucideArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";


export default function OrderPage() {
    return (

        <div className="mx-auto max-w-screen-xl md:px-4 px-2">
            <Header />

            <h1 className="py-4 border-b   text-xl font-bold">
                <Link href="/order" className="text-blue hover:underline font-semibold flex items-start gap-2"> <LucideArrowLeft /> Order Detail</Link>

            </h1>
            <div className="border-b py-3">
                <p><span>1</span> Items</p>
                <p>Placed on 21-05-2024</p>
                <p>Total: <span>₦ 4,000</span></p>

            </div>
            <h2 className="py-2">ITEMS IN ORDER</h2>
            <div className=" md:flex items-start justify-between border rounded md:p-3 p-1 mb-3">
                <div className="grid grid-cols-12 gap-3  items-center h-auto">
                    <Image src="/product.jpeg" alt="" className="h-full w-full object-contain col-span-3" width="100" height="100" />
                    <div className=" flex flex-col flex-shrink-0 flex-grow-1 items-start justify-between h-full col-span-9 " >
                        <p>10 Steps Laptop Stand Desktop Stand Can Be Adjusted In</p>
                        <span className="inline-block bg-green-500 text-white px-1">Delivered</span>
                        <p >₦ 3,399</p>
                    </div>
                </div>
               
            </div>

            <div className="grid grid-cols-12 gap-3 mt-3 ">
                <div className="md:col-span-6 col-span-12 border rounded ">
                    <p className="border-b font-semibold p-2">PAYMENT INFORMATION</p>
                    <div className=" p-2">
                        <p className="font-semibold">Payment Method</p>
                        <p>Old School Cool! Pay with Cash on Delivery for orders below 400k naira</p>
                        <div className="mt-3">
                            <h3  className="font-semibold">Payment Details</h3>
                            <p>Items total: ₦ 3,399</p>
                            <p>Delivery Fees: ₦ 620</p>
                            <p>Total: ₦ 4,019</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 border rounded ">
                    <p className="border-b font-semibold p-2">DELIVERY INFORMATION</p>
                    <div className=" p-2">
                        <p className="font-semibold">Delivery Method</p>
                        <p>Door Delivery</p>
                        <div className="mt-3">
                            <h3  className="font-semibold">Shipping Address</h3>
                            <p>Emmanuel Iwok</p>
                            <p>point road 22b</p>
                            <p>Apapa (Warf Rd), Lagos</p>
                        </div>
                        <div className="mt-3">
                            <h3  className="font-semibold">Shipping Details</h3>
                            <p>Door Delivery.Fulfilled by Duatan-COD</p>
                            <p>Delivery between 27 May and 29 May.</p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}