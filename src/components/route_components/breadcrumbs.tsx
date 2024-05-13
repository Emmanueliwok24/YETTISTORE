import { LucideChevronRight, LucideForward } from "lucide-react";
import Link from "next/link";

const BreadCrumbs = () => {

    return (
        <div className="flex gap-1  text-sm items-center text-white">
            <p>Information </p>
            <p>/</p>
            <p>Shipping</p>
            <LucideChevronRight />
            <p>Payments</p>
        </div>
    )
}

export default BreadCrumbs;