"use client"
import { useEffect, ChangeEvent } from "react";
import { toast } from "sonner";
import { useCheckOutContext } from "@/contexts/checkout-content";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const InfomationForm = () => {
    const { data, updateData } = useCheckOutContext();
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
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":"Bearer " + document.cookie.split('token=')[1].split(";")[0]  // get token from cookie
                }
            } );

            if (res) {
                document.cookie = `token=${res.data.data.access}`;
            }

            toast.dismiss();
            toast.success("Successful");
            router.push("/payments");
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
                    value={data.first_name}
                    onChange={updateContextData}
                    placeholder="First Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="last_name"
                    value={data.last_name}
                    onChange={updateContextData}
                    placeholder="Last Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="email"
                    name="email"
                    value={data.email}
                    onChange={updateContextData}
                    placeholder="Email Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="number"
                    name="phone"
                    value={data.phone}
                    onChange={updateContextData}
                    placeholder="Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="address"
                    value={data.address}
                    onChange={updateContextData}
                    placeholder="Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    name="city"
                    value={data.city}
                    onChange={updateContextData}
                    placeholder="city"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
            <select
    name="state"
    value={data.state}
    onChange={updateContextData}
    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm"
    style={{ color: "white" }} // Set options color to black
>
    <option value="" disabled>Select State</option>
    <option value="Abia"  style={{ color: "black" }}>Abia</option>
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
                value={data.country}
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
    return (
        <form action="">
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
                <input type="email"
                    placeholder="Your Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <Link href="/shipping" className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm" >
                    Continue to Shipping
                </Link>
            </div>
        </form>
    )
}




