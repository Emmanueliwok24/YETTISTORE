"use client"
import { useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { toast } from "sonner";
import { useCheckOutContext } from "@/contexts/checkout-content";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/cart";
import { useSubtotal } from "@/contexts/subtotal";

export const InformationForm = () => {
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
            if (error.response && error.response.status === 401) {
                toast.error("This email is registered as a seller");
            } else {
                toast.error(error.message || "An error occurred");
            }
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
                <small className="text-gray-400">*<b>NOTE!..</b> Email here must be that of the <b>BUYER</b>.*</small>

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
                    <option value="" disabled selected>Select State</option>
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
    const router = useRouter();
    const { data, clearData } = useCheckOutContext();
    const { cart, clearCart } = useCartContext();
    const { clearSubtotal } = useSubtotal();

    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const orderNumber = localStorage.getItem("order_number");
        if (!orderNumber) {
            toast.error("Order number not found");
            return;
        }

        const token = document.cookie.split('token=')[1]?.split(";")[0];
        if (!token) {
            toast.error("Token not found");
            return;
        }

        try {
            toast.loading("Initiating payment");
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const response = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/buyer/cart-items/${orderNumber}`, { headers });
            const amount = Number(response.data.subtotal);
            const remark = `${data?.first_name} ${data?.last_name} ${orderNumber}`;

            const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/payment/initiate/`, {
                email: data?.email,
                amount,
                remark,
                order_number: orderNumber
            }, { headers });

            toast.dismiss();

            if (res.status === 200 && res.data && res.data.data.authorization_url) {
                const { authorization_url, reference } = res.data.data;

                // Open payment URL in a new window or tab
                const deviceWidth = window.innerWidth;
                const paymentWindow = window.open(authorization_url, deviceWidth < 1024 ? "_self" : "_blank", deviceWidth < 1024 ? "" : "width=500,height=600");

                if (paymentWindow) {
                    const clearContextAndCart = () => {
                        localStorage.clear();
                        clearCart();
                        clearData();
                        clearSubtotal();
                        router.refresh();
                    };
                    clearContextAndCart();

                    // Redirect to validation page on payment window close
                    paymentWindow.addEventListener("beforeunload", () => {
                        window.location.replace(`/validate/${reference}`);
                    });
                }
            } else {
                toast.error("Payment initiation failed");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An error occurred";

            if (errorMessage === "The email must belong to a buyer") {
                toast.error("The email must belong to a buyer. Payment initiation stopped.");
                toast.dismiss();
                return; // Stops further execution
            }

            toast.error(errorMessage);
        }
    }, [data, clearCart, clearData, clearSubtotal, router]);

    if (cart.length === 0) {
        return null; // Return null if there are no items in the cart
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
                <input
                    type="text"
                    value={`${data.first_name} ${data.last_name}`}
                    readOnly
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    value={data.email}
                    readOnly
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
                />
            </div>
            <div className="mb-4">      
                <input
                    type="tel"
                    value={data.phone}
                    placeholder="Your Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
                    readOnly
                />
            </div>
            <div className="mb-4">
                <button
                    type="submit"
                    className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm"
                >
                    Pay Now
                </button>
            </div>
        </form>
    );
};
// Verification Code



