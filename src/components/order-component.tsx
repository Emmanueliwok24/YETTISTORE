import Image from "next/image";
import Link from "next/link";
import React from "react";

type OrderProps = {
    id: number;
    image: string;
    status: "shipping" | "shipped" | "delivered" | "cancelled";
    date: string;
}

const orders: OrderProps[] = [
    {
        id: 1,
        image: "/shopping2.jpg",
        status: "shipped",
        date: "27-05"
    },
    {
        id: 2,
        image: "/shopping2.jpg",
        status: "delivered",
        date: "27-05"
    },
    {
        id: 3,
        image: "/shopping2.jpg",
        status: "cancelled",
        date: "27-05"
    },
    {
        id: 4,
        image: "/shopping2.jpg",
        status: "shipping",
        date: "27-05"
    },
    {
        id: 5,
        image: "/shopping2.jpg",
        status: "delivered",
        date: "27-05"
    }
]

export default function OrderComponent() {
    return (
        <React.Fragment>
            {orders.filter(order => order.status !== "cancelled").map((order) => (
                <div key={order.id} className=" md:flex items-start justify-between border rounded p-2 mb-3">
                    <div className="flex gap-3 md:items-start items-center ">
                        <div className="h-30 w-30"><Image src={order.image} alt="" className="h-full w-full object-contain " width="100" height="100" />
                        </div>
                        <div className="">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  </p>
                            <div className=" md:block flex gap-2  ">
                                <span className={`md:mt-3 md:inline-block bg-[green] text-white px-1 text-uppercase
                                        ${order.status === "shipped" ? "bg-blue-500" : order.status === "delivered" ? "bg-green-500" : order.status === "cancelled" ? "bg-red-500" : "bg-yellow-500"}
                                    `}>
                                    {order.status}
                                </span>
                                <p >On {order.date}</p>
                            </div>
                        </div>
                    </div>
                    <div className="truncate md:mt-0 mt-5 ">
                        <Link href={`/order/details/${order.id}`} className="text-blue hover:underline font-semibold">SEE DETAILS</Link>
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}