"use client"
import { useCheckOutContext } from "@/contexts/checkout-content"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect } from "react"
import { toast } from "sonner"

export const InfomationForm = () => {
    const { data, updateData } = useCheckOutContext()
    const router = useRouter()
    const updateContextData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!data.name || !data.email || !data.phone) {
            return toast.error("Please fill all fields")
        } else {
            router.push("/shipping")
        }
    }
    useEffect(() => {
        console.log('Updated Context Data: ', data)
    }, [data])

    return (
        <div>
            <div className="mb-4">
                <input type="text"
                    name="name"
                    defaultValue={data.name}
                    onChange={updateContextData}
                    placeholder="Your Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="email"
                    name="email"
                    defaultValue={data.email}
                    onChange={updateContextData}
                    placeholder="Your Email Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="number"
                    name="phone"
                    defaultValue={data.phone}
                    onChange={updateContextData}
                    placeholder="Your Phone Number"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <button
                    onClick={handleSubmit}
                    className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm" >
                    Continue to Shipping
                </button>
            </div>
        </div>
    )
}
export const ShippingForm = () => {
    return (
        <form action="">
            <div className="mb-4">
                <input type="text"
                    placeholder="Receipient Name"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    placeholder="Street Address"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <input type="text"
                    placeholder="State"
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block placeholder:text-gray-50 rounded-sm text-sm" />
            </div>
            <div className="mb-4">
                <select
                    className="border outline-none bg-transparent text-white border-gray-600 px-3 py-3 w-full block rounded-sm text-sm" defaultValue={"select"} >
                    <option defaultValue="select" disabled>(------ SELECT ------)</option>
                    <option className="text-black" value="NG">Nigeria</option>
                    <option className="text-black" value="GH">Ghana</option>
                </select>
            </div>
            <div className="mb-4">
                <Link href="/payments" className="outline-none bg-white text-center border-none px-3 py-3 w-full block text-slate-950 font-semibold cursor-pointer rounded-sm" >
                    Continue Payment
                </Link>
            </div>
        </form>
    )
}
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




