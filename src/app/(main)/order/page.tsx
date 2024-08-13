"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import OrderCancelComponent from "@/components/order-cancel-component";
import OrderComponent from "@/components/order-component";
import OrderPendingComponent from "@/components/order-pending-component";
import OrderSuccessfulComponent from "@/components/order-successful-component";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function OrderPage() {
    const router = useRouter();
    const [storeLink, setStoreLink] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve the store link from localStorage
        const storedLink = localStorage.getItem("storeLink");
        setStoreLink(storedLink);
    }, []);

    const handleBackToStore = () => {
        if (storeLink) {
            router.push(`/store/${storeLink}`);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl md:px-4 px-2">
            <Header />
            <h1 className="py-4 border-b mb-5 text-xl font-bold">Order Page</h1>
            <Tabs selectedTabClassName="border-b-4 border-blue-500 select-none outline-none">
                <TabList className="flex md:justify-start justify-evenly items-center gap-4 border-b cursor-pointer mb-3">
                    <Tab>All</Tab>
                    <Tab>Successful</Tab>
                    <Tab>Pending</Tab>
                    <Tab>Cancelled/Return</Tab>
                </TabList>
                <TabPanel>
                    <OrderComponent />
                </TabPanel>
                <TabPanel>
                    <OrderSuccessfulComponent />
                </TabPanel>
                <TabPanel>
                    <OrderPendingComponent />
                </TabPanel>
                <TabPanel>
                    <OrderCancelComponent />
                </TabPanel>
            </Tabs>

            {storeLink && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleBackToStore}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Back to Store
                    </button>
                </div>
            )}
        </div>
    );
}
