import { LucideChevronRight } from "lucide-react";
import Link from "next/link";

const BreadCrumbs = () => {

    return (
        <div className="flex gap-1 font-semibold text-sm items-center text-white">
            <Link href="/information">Information</Link>
            <LucideChevronRight />
            <Link href="/shipping">Shipping</Link>
            <LucideChevronRight />
            <Link href="/payments">Payments</Link>
        </div>
    )
}

export default BreadCrumbs;