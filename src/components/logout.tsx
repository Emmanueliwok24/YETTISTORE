"use client";
import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { LucideLogOut, LucidePowerOff } from "lucide-react";
import { toast } from "sonner";

export default function LogoutComponent() {
    const router = useRouter();

    const handleLogout = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        });

        if (!isConfirmed) return;

        const token = Cookies.get("token") || "";

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/logout`, {}, config);

            // Remove the token cookie
            Cookies.remove("token");

            // Redirect to the login page or home page
            router.push('/login');
            toast.success("Successfully logged out!");
        } catch (error) {
            // Remove the token cookie regardless of the error
            Cookies.remove("token");
            router.push('/login');
            toast.error("Session expired or logout failed. You have been logged out.");
            console.error("Logout failed: ", error);
        }
    };

    return (
        <button onClick={handleLogout} className="btn-logout text-gray-800 font-bold">
            Logout
        </button>
    );
}
