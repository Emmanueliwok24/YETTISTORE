import { InformationForm, PaymentForm } from "@/components/checkout-component";
import DropDown from "@/components/route_components/dropdown";

import Link from "next/link";

const PaymentsPage = () => {
    return (
        <div>

            <DropDown
                disabled
                edit="/information"
                title="1. Contact Information"
                content={<InformationForm />}
            />

            <DropDown
                enabled
                edit="/payments"
                title="2. Payment"
                content={<PaymentForm />}
            />
        </div>
    );
}

export default PaymentsPage;