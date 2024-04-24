"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import swal from "sweetalert";

type LoginDataProps = {
    email: string;
    password: string;
}

const LoginComponent = () => {

    const router = useRouter()
    const [data, setData] = useState({} as LoginDataProps)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toast.loading("Logging in")
        axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`, {
            ...data
        }).then(res => {
            if (res) {
                document.cookie = `token=${res.data.data.access}`
            }
            toast.dismiss()
            if (toast.success("Login successful")) {
                router.push("/");
            }
        }).catch(err => {
            if (err.response.status === 404) {
                swal({
                    title: "User not found",
                    text: "User with the provided email does not exist",
                    icon: "error"
                })
            }
            toast.error("Login failed")
            toast.dismiss()
        })
    }


    return (
        <div className="mt-16 px-5 p-3 ">
            <h1 className="text-base md:text-3xl font-bold mb-16">
                Login Page
            </h1>
            <div className="flex flex-col gap-3">
                <div className="mb-1 max-w-96">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border border-blue-200 outline-none py-3 px-3 text-lg rounded w-full"
                    />
                </div>
                <div className="mb-1 max-w-96">
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="border border-blue-200 outline-none py-3 px-3 text-lg rounded w-full"
                    />
                </div>
                <div className="mb-1 max-w-96">
                    <Link href="/register" className="text-xs">
                        <span className="font-bold text-slate-950">Forgot Password</span>
                    </Link>
                </div>
                <div className="mb-1 max-w-96">
                    <button
                        onClick={handleSubmit}
                        className="bg-slate-950 py-3 text-lg px-3 text-white p-2 rounded-md w-full">
                        Login
                    </button>
                </div>
                <div className="mb-1 text-right max-w-96">
                    <Link href="/register" className="text-xs">
                        Don&apos;t have an account? &nbsp;
                        <span className="font-bold text-slate-950">Register</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;