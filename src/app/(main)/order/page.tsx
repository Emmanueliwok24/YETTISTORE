"use client";
import Header from "@/components/header";
import OrderCancelComponent from "@/components/order-cancel-component";
import OrderComponent from "@/components/order-component";
import OrderPendingComponent from "@/components/order-pending-component";
import OrderSuccessfulComponent from "@/components/Order-successful-component";
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
                    className={"flex md:justify-start justify-evenly  items-center gap-4 border-b cursor-pointer mb-3  "}
                >
                    <Tab>All </Tab>
                    <Tab>Successful </Tab>
                    <Tab>Pending</Tab>
                    <Tab>Cancelled/Return </Tab>
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
        </div>
    );
}