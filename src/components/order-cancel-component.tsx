import Link from "next/link";
import React from "react";

type OrderProps = {
    id: number;
    status: "shipping" | "shipped" | "delivered" | "cancelled";
    date: string;
}

const orders: OrderProps[] = [
    {
        id: 1,
        status: "shipped",
        date: "Sep 27-05"
    },
    {
        id: 2,
        status: "delivered",
        date: "Sep 27-05"
    },
    {
        id: 3,
        status: "cancelled",
        date: "Sep 7-05"
    },
    {
        id: 4,
        status: "shipping",
        date: "Sep 27-05"
    },
    {
        id: 5,
        status: "delivered",
        date: "Sep 27-05"
    }
]

export default function OrderCancelComponent() {
    return (
        <React.Fragment>

            <div>
                <h1 className="w-full bg-[#35a4ff] text-white text-center p-2 font-bold mb-2">September</h1>
            </div>
            {orders.filter(order => order.status === "cancelled" ).map((order) => (
                <Link href={`/order/details/${order.id}`} key={order.id} className=" flex items-start justify-between border rounded p-2 mb-3">
                    <div className="flex gap-3  items-center ">

                        <div className="">
                            <h3 className="font-bold">Roasted Corn </h3>
                                <p className="mt-1">On {order.date}</p>
                        </div>
                    </div>
                    <div className=" text-end">
                        <p>NGN 10,000.00</p>
                                <span className={`md:mt-3 md:inline-block bg-[green] text-white px-1 text-uppercase
                                        ${order.status === "shipped" ? "bg-blue-500" : order.status === "delivered" ? "bg-green-500" : order.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"}
                                    `}>
                                    {order.status}
                                </span>
                    </div>
                </Link>
            ))}
        </React.Fragment>
    )
}