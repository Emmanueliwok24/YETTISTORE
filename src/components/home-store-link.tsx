"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

const HomeStoreLink = () => {
    const router = useRouter();
    const [storeLink, setStoreLink] = useState<string>("");

    useEffect(() => {
        // Retrieve store link from localStorage when the component mounts
        const savedStoreLink = localStorage.getItem("storeLink");
        if (savedStoreLink) {
            setStoreLink(savedStoreLink);
        }
    }, []);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (storeLink) {
            // Save the store link to localStorage
            localStorage.setItem("storeLink", storeLink);

            const toastId = toast.loading(`Your store search is in progress. Please wait a moment...`);

            router.push(`/store/${storeLink}`);

            setTimeout(() => {
                toast.dismiss(toastId);
            }, 5000);
        }
    };

    return (
        <form className="w-100 mt-5 mx-auto flex" onSubmit={handleFormSubmit}>
            <input
                type="text"
                className="block border-[#333] outline-none border w-4/5 mx-auto p-4"
                placeholder="Paste Store Link Here"
                value={storeLink}
                onChange={(e) => setStoreLink(e.target.value)}
            />
            <button className="bg-slate-900 text-white p-3 flex-1">Go</button>
        </form>
    );
};

export default HomeStoreLink;
