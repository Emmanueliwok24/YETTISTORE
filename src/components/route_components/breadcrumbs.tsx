import { LucideArrowLeft, LucideChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BreadCrumbs = () => {
    const router = useRouter();
    const [storeLink, setStoreLink] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve the store link from localStorage
        const storedLink = localStorage.getItem("storeLink");
        setStoreLink(storedLink);
    }, []);

    const handleBackToStore = () => {
        if (storeLink) {
            router.push(`/store/${storeLink}`);
        } else {
            router.push(`/`); // Navigate to the homepage if storeLink is not available
        }
    };

    return (
        <div className=" text-start text-gray-300 flex items-center justify-between border-gray-700 p-2 py-3">
            <button
                onClick={handleBackToStore}
                className="flex gap-2 items-center text-[14px]"
            >

                <LucideArrowLeft size={14}  />
                {storeLink ? "Back to Store" : "Back to Home"}
            </button>
            <div className="flex gap-1 text-sm items-center text-white mt-2">
                <p>Information</p>
                <p>/</p>
                <p>Shipping</p>
                <LucideChevronRight />
                <p>Payments</p>
            </div>

        </div>
    );
};

export default BreadCrumbs;
