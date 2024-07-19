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
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="py-2 font-semibold mt-2">Order Status</h2>
                    <span className="border inline-block bg-white border-green-500 text-green-500 p-2 rounded px-4">Delivered</span>
                </div>

                <h3 className="font-bold">Order #15276</h3>
            </div>

            <div className="mt-3 p-2 border border-dashed">

            <div className="border-b py-3  flex w-full justify-between items-start">

                <p>Order Date</p>
                <p>Sep 11 2023</p>
            </div>
            <div className="border-b py-3 flex w-full justify-between items-start">
                <p>Sales Channel</p>
                <p>Instagram</p>
            </div>
            <div className="border-b py-3 flex w-full justify-between items-start">
                <p>Email Address</p>
                <p>info@yetti.store</p>
            </div>
            </div>






        </div>
    );
}