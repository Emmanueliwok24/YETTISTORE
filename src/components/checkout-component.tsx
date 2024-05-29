"use client"
import { useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { toast } from "sonner";
import { useCheckOutContext } from "@/contexts/checkout-content";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/cart";

export const InfomationForm = () => {
    const { data, updateData } = useCheckOutContext();
    const { cart } = useCartContext()
    const router = useRouter();

    const updateContextData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log(data);
            if (!data.last_name || !data.first_name || !data.email || !data.phone || !data.address || !data.state) {
                throw new Error("Please fill all fields");
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/checkout/buyer_info/create_contact_info`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + document.cookie.split('token=')[1].split(";")[0]  // get token from cookie
                }
            });

            const sendCartData = async () => {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart/`, cart, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + document.cookie.split('token=')[1].split(";")[0]  // get token from cookie
                        }
                    });
                    return res.data
                } catch (error) {
                    console.log(error);
                }
            }

            if (res.status === 200 && res.data) {
                const sendCart = await sendCartData();
                if (sendCart) {
                    const orderNumber = sendCart.order_number;
                    localStorage.setItem("order_number", orderNumber);
                    localStorage.setItem("total_amount", sendCart.total_amount);
                    toast.dismiss();
                    toast.success("Successful");
                    router.push("/payments");
                }
            }

        } catch (error: any) {
            toast.error(error);
            console.log(error);
        }
    };

    useEffect(() => {
        console.log('Updated Context Data: ', data);
    }, [data]);

    return (
        <div>
            <div className="mb-4">
                <input type="text"
                    name="first_name"
                    defaultValue={data.first_name}
                    onChange={updateContextData}
                    placeholder="First Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="last_name"
                    defaultValue={data.last_name}
                    onChange={updateContextData}
                    placeholder="Last Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="email"
                    name="email"
                    defaultValue={data.email}
                    onChange={updateContextData}
                    placeholder="Email Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="number"
                    name="phone"
                    defaultValue={data.phone}
                    onChange={updateContextData}
                    placeholder="Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="address"
                    defaultValue={data.address}
                    onChange={updateContextData}
                    placeholder="Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="city"
                    defaultValue={data.city}
                    onChange={updateContextData}
                    placeholder="city"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <select
                    name="state"
                    defaultValue={data.state}
                    onChange={updateContextData}
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
                    style={{ color: "white" }} // Set options color to black
                >
                    <option value="" disabled>Select State</option>
                    <option value="Abia" style={{ color: "black" }}>Abia</option>
                    <option value="Adamawa" style={{ color: "black" }}>Adamawa</option>
                    <option value="Akwa Ibom" style={{ color: "black" }}>Akwa Ibom</option>
                    <option value="Anambra" style={{ color: "black" }}>Anambra</option>
                    <option value="Bauchi" style={{ color: "black" }}>Bauchi</option>
                    <option value="Bayelsa" style={{ color: "black" }}>Bayelsa</option>
                    <option value="Benue" style={{ color: "black" }}>Benue</option>
                    <option value="Borno" style={{ color: "black" }}>Borno</option>
                    <option value="Cross River" style={{ color: "black" }}>Cross River</option>
                    <option value="Delta" style={{ color: "black" }}>Delta</option>
                    <option value="Ebonyi" style={{ color: "black" }}>Ebonyi</option>
                    <option value="Edo" style={{ color: "black" }}>Edo</option>
                    <option value="Ekiti" style={{ color: "black" }}>Ekiti</option>
                    <option value="Enugu" style={{ color: "black" }}>Enugu</option>
                    <option value="Gombe" style={{ color: "black" }}>Gombe</option>
                    <option value="Imo" style={{ color: "black" }}>Imo</option>
                    <option value="Jigawa" style={{ color: "black" }}>Jigawa</option>
                    <option value="Kaduna" style={{ color: "black" }}>Kaduna</option>
                    <option value="Kano" style={{ color: "black" }}>Kano</option>
                    <option value="Katsina" style={{ color: "black" }}>Katsina</option>
                    <option value="Kebbi" style={{ color: "black" }}>Kebbi</option>
                    <option value="Kogi" style={{ color: "black" }}>Kogi</option>
                    <option value="Kwara" style={{ color: "black" }}>Kwara</option>
                    <option value="Lagos" style={{ color: "black" }}>Lagos</option>
                    <option value="Nasarawa" style={{ color: "black" }}>Nasarawa</option>
                    <option value="Niger" style={{ color: "black" }}>Niger</option>
                    <option value="Ogun" style={{ color: "black" }}>Ogun</option>
                    <option value="Ondo" style={{ color: "black" }}>Ondo</option>
                    <option value="Osun" style={{ color: "black" }}>Osun</option>
                    <option value="Oyo" style={{ color: "black" }}>Oyo</option>
                    <option value="Plateau" style={{ color: "black" }}>Plateau</option>
                    <option value="Rivers" style={{ color: "black" }}>Rivers</option>
                    <option value="Sokoto" style={{ color: "black" }}>Sokoto</option>
                    <option value="Taraba" style={{ color: "black" }}>Taraba</option>
                    <option value="Yobe" style={{ color: "black" }}>Yobe</option>
                    <option value="Zamfara" style={{ color: "black" }}>Zamfara</option>
                    <option value="Federal Capital Territory" style={{ color: "black" }}>Federal Capital Territory (FCT)</option>
                </select>

            </div>
            <div className="mb-4">
                <select
                    name="country"
                    defaultValue={data.country}
                    onChange={updateContextData}
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
                >
                    <option value="" disabled hidden>Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    {/* Add more options as needed */}
                </select>

            </div>
            <div className="mb-4">
                <button
                    onClick={handleSubmit}
                    className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm" >
                    PAYMENT
                </button>
            </div>
        </div>
    );
};


export const PaymentForm = () => {
    const router = useRouter()
    const { data, clearData } = useCheckOutContext()
    const { cart, clearCart } = useCartContext()
    const order_number = localStorage.getItem("order_number")
    const handleFormSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault()
        const orderNumber = localStorage.getItem("order_number");
        if (!orderNumber) {
            toast.error("Order number not found");
            return;
        }
        try {

            toast.loading("Initiating payment");

            const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart-items/${order_number}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + document.cookie.split('token=')[1].split(";")[0]  // get token from cookie
                }
            });

            const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/payment/initiate/`, {
                email: data?.email,
                amount: Number(response.data.subtotal),
                remark: data?.first_name + " " + data.last_name + " " + orderNumber,
                order_number: order_number
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + document.cookie.split('token=')[1].split(";")[0]  // get token from cookie
                }
            });

            toast.dismiss();

            if (res.status === 200 && res.data) {
                if (res.data.data.authorization_url) {
                    const deviceWidth = window.innerWidth;
                    const reference = res.data.data.reference;
                    const clearContextandCart = () => {
                        localStorage.removeItem("order_number");
                        localStorage.removeItem("total_amount");
                        clearCart();
                        clearData();
                        router.refresh();
                    }
                    clearContextandCart();
                    const newWindow = (deviceWidth: number) => {
                        let paymentWindow = null;
                        if (deviceWidth < 1024) {
                            paymentWindow = window.open(res.data.data.authorization_url, "_self");
                        } else {
                            paymentWindow = window.open(res.data.data.authorization_url, "_blank", "width=600,height=600");
                            if (paymentWindow) {
                                paymentWindow.focus();
                            }
                        }
                        return paymentWindow;
                    }

                    const paymentWindow = newWindow(deviceWidth);

                    if (paymentWindow) {
                        paymentWindow.addEventListener("load", () => {
                            paymentWindow.addEventListener("beforeunload", () => {
                                router.push(`/validate/${reference}`);
                            });
                        });
                    }
                } else {
                    toast.error("Payment initiation failed");
                }
            }

        } catch (error) {
            console.log(error);
        }
    }, [data, cart])

    return (
        <form action="" onSubmit={handleFormSubmit}>
            <div className="mb-4">
                <input type="text"
                    placeholder="Your Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="email"
                    placeholder="Your Email Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="tel"
                    placeholder="Your Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <button className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm" >
                    Continue to pay
                </button>
            </div>
        </form>
    )
}


// Verification Code



