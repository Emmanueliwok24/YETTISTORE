import { InfomationForm, PaymentForm, ShippingForm } from "@/components/checkout-component";
import DropDown from "@/components/route_components/dropdown";
import Link from "next/link";

const Information = () => {
    return (
        <div>
            <div className="bg-gray-500  rounded-md bg-opacity-30 text-white py-8 px-8 mt-5 font-semibold text-sm">
                Already have an account? <Link href="/login" className="text-indigo-500">Login</Link>
            </div>
            <DropDown
                enabled
                edit="/information"
                title="1. Contact Information"
                content={<InfomationForm />}
            />
            <DropDown
                edit="/shipping"
                disabled
                title="2. Shipping Details"
                content={<ShippingForm />}
            />
            <DropDown
                edit="/payments"
                disabled
                title="3. Payment"
                content={<PaymentForm />}
            />
        </div>
    );
}

export default Information;