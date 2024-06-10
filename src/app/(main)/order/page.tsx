"use client";
import Header from "@/components/header";
import OrderCancelComponent from "@/components/order-cancel-component";
import OrderComponent from "@/components/order-component";
import Image from "next/image";
import Link from "next/link";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";


export default function OrderPage() {
    return (

        <div className="mx-auto max-w-screen-xl md:px-4 px-2">
            <Header />

            <h1 className="py-4 border-b mb-5 text-xl font-bold">Order Page</h1>
            <Tabs
                selectedTabClassName="border-b-4 border-blue-500 select-none outline-none"
            >
                <TabList
                    className={"flex justify-start  align-center gap-4 border-b cursor-pointer mb-3"}
                >
                    <Tab

                    >Ongoing Delevery</Tab>
                    <Tab>Cancelled/Return </Tab>
                </TabList>
                <TabPanel>
                    <OrderComponent />
                </TabPanel>
                <TabPanel>
                    <OrderCancelComponent />
                </TabPanel>
            </Tabs>
        </div>
    );
}