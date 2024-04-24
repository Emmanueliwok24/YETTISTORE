import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import LoginComponent from "@/components/logincomponent";

export const metadata: Metadata = {
    title: "Login Into Your Yetti Account",
    description: "Login Page",
};

const LoginPage = () => {
    return (
        <div className="mx-auto max-w-screen-xl min-h-[70vh]">
            <nav className="flex items-center justify-between p-3 px-5 z-10 sticky w-full top-0 border-b bg-white  ">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={72} height={72} />
                </Link>
            </nav>
            <LoginComponent />
        </div>
    );
}

export default LoginPage;