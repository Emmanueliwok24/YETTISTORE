import { InformationForm, PaymentForm } from "@/components/checkout-component";
import DropDown from "@/components/route_components/dropdown";
import Link from "next/link";

const Information = () => {
    return (
        <div>

            <DropDown
                enabled
                edit="/information"
                title="1. Contact Information"
                content={<InformationForm />}
            />

            <DropDown
                edit="/payments"
                disabled
                title="2. Payment"
                content={<PaymentForm />}
            />
        </div>
    );
}

export default Information;