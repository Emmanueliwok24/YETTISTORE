import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

type OrderProps = {
    order_number: number;
    status: "pending" | "confirmed" | "delivered" | "cancelled";
    created_at: string;
}

export default function OrderPendingComponent() {
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = Cookies.get("token") || "";

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                // Make request to fetch order history
                const { data: fetchedOrders }: AxiosResponse<OrderProps[]> = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/list/order_history/`,
                    config
                );

                // Sort orders by created_at date in descending order
                fetchedOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                // Update state with sorted orders
                setOrders(fetchedOrders);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <React.Fragment>
            <div>
                <h1 className="w-full bg-[#35a4ff] text-white text-center p-2 font-bold mb-2">Pending Order</h1>
            </div>
            {orders.filter(order => order.status === "pending").map((order) => (
                <div className="flex items-start justify-between border rounded p-2 mb-3">
                    <div className="flex gap-3 md:items-start items-center">
                        <div>
                            <h3 className="font-bold">Order <span className="font-light">#{order.order_number}</span></h3>
                            <p className="mt-1">On {order.created_at}</p>
                        </div>
                    </div>
                    <div className="text-end">
                        <span className={`md:mt-3 md:inline-block text-white px-1 text-uppercase
                            ${order.status === "delivered" ? "bg-green-500" : order.status === "cancelled" ? "bg-red-500" : order.status === "pending" ? "bg-yellow-500" : "bg-blue-500"}
                        `}>
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}