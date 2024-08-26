"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CollectionList from "./CollectionList";

const HomeStoreLink = () => {
    const router = useRouter();
    const [storeLink, setStoreLink] = useState<string>("");
    const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);

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
    <div className="mx-auto grid">
      <small className="text-gray-700 md:order-1 order-2 mt-2 md:mt-0">Tip: Ensure that all <b>Letters and Characters</b> are typed in correctly.</small>

            <form className="w-100 md:order-2 order-1  mt-5 flex" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="block border-[#241ade24] outline-none border w-4/5 mx-auto p-4"
                    placeholder="Paste Store Name Here"
                    value={storeLink}
                    onChange={(e) => setStoreLink(e.target.value)}
                />
                <button className=" bg-slate-900 text-white p-3 flex-1">Go</button>
            </form>
            <div className="overflow-hidden  order-3 p-2 ">
                <div className="mt-6 text-start mb-4 border-b border-dashed ">
                    <h1 className="font-bold text-xl m-0 p-0 leading-none ">All Collections</h1>
                    <small className="m-0 p-0 text-gray-400 font-normal">Click on a collection to view its details and products.</small>
                </div>
                <CollectionList selectedCollectionId={selectedCollectionId} />
            </div>
        </div>
    );
};

export default HomeStoreLink;
