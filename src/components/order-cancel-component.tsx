import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Lucide icons

type OrderProps = {
    order_number: number;
    status: "pending" | "confirmed" | "delivered" | "cancelled";
    created_at: string;
}

export default function OrderCancelComponent() {
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState<number>(10); // Number of orders per page
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            // Check if cached orders exist in localStorage
            const cachedOrders = localStorage.getItem('orders');
            const cachedOrdersTimestamp = localStorage.getItem('ordersTimestamp');

            // If cached orders are found and they are not stale, use them
            if (cachedOrders && cachedOrdersTimestamp) {
                const cacheAge = Date.now() - parseInt(cachedOrdersTimestamp);
                const maxCacheAge = 5 * 60 * 1000; // Cache valid for 5 minutes

                if (cacheAge < maxCacheAge) {
                    setOrders(JSON.parse(cachedOrders));
                    setLoading(false); // Directly set loading to false if cached data is used
                    return;
                }
            }

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

                // Update state with sorted orders
                setOrders(fetchedOrders);

                // Cache fetched orders and timestamp in localStorage
                localStorage.setItem('orders', JSON.stringify(fetchedOrders));
                localStorage.setItem('ordersTimestamp', Date.now().toString());
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

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.filter(order => order.status === "cancelled").slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(orders.filter(order => order.status === "cancelled").length / ordersPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <React.Fragment>
            <div>
                <h1 className="w-full bg-[#35a4ff] text-white text-center p-2 font-bold mb-2">Cancelled/Return Order</h1>
            </div>
            {currentOrders.map((order, index) => (
                <div key={index} className="flex items-start justify-between border rounded p-2 mb-3">
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

            {/* Render pagination only if there are more orders than per page */}
            {orders.filter(order => order.status === "cancelled").length > ordersPerPage && (
                <nav className="flex justify-center items-center mt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <span className="mx-3">
                        Page {currentPage} of {Math.ceil(orders.filter(order => order.status === "cancelled").length / ordersPerPage)}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === Math.ceil(orders.filter(order => order.status === "cancelled").length / ordersPerPage)}
                        className="px-3 py-1 rounded bg-gray-200 text-black disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </nav>
            )}
        </React.Fragment>
    );
}
