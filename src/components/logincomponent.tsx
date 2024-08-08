"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import swal from "sweetalert";

type LoginDataProps = {
    email: string;
    password: string;
}

const LoginComponent = () => {

    useEffect(()=>{

        toast.dismiss()
    },[]);

    const router = useRouter()
    const [data, setData] = useState({} as LoginDataProps)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        toast.loading("Logging in")
        axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/login`, {
            ...data
        }).then(res => {
            if (res) {
                document.cookie = `token=${res.data.data.access}`
            }
            toast.success("Login successful")
            window.location.href = "/"
            toast.dismiss()

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
        <div className="mt-16 px-5 p-3 md:grid  grid-cols-2 ">
                <div>


            <h1 className="text-base md:text-xl font-bold mb-5">
                Login to search for Store.
            </h1>
            <form className="flex flex-col gap-3 "  onSubmit={handleSubmit}>
                <div className="mb-1 max-w-[35rem]">
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border border-blue-200 outline-none py-3 px-3 text-lg rounded w-full"
                        required
                    />
                </div>
                <div className="mb-1 max-w-[35rem]">
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="border border-blue-200 outline-none py-3 px-3 text-lg rounded w-full"
                        required
                    />
                </div>
                <div className="mb-1 max-w-[35rem]">
                    <Link href="https://myyetti.store/reset-password" target="_blank" className="text-xs">
                        <span className="font-bold text-slate-950">Forgot Password</span>
                    </Link>
                </div>
                <div className="mb-1 max-w-[35rem]">
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-br from-[#35a4ff] to-indigo-500 py-3 text-lg px-3 text-white p-2 rounded-md w-full">
                        Login
                    </button>
                </div>
                <div className="mb-1 text-left max-w-[35rem]">
                    <Link href="https://myyetti.store/signUp" target="_blank" className="text-xs">
                        Don&apos;t have an account? &nbsp;
                        <span className="font-bold text-slate-950">Register</span>
                    </Link>
                </div>
            </form>
            </div>
            <div className="border">

            <Image src='/hero_img.svg' width={700} height={500} className="w-full mt-2 md:mt-0" alt="login image"/>
            </div>
        </div>
    );
}

export default LoginComponent;