import { redirect } from "next/navigation";
import { toast } from "sonner";

const ValidateReferencePage = async ({ params: { reference } }: {
    params: {
        reference: string;
    };
}) => {
    toast.loading("Validating payment");
    const validatePaystackRef = async (reference: string) => {
        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const response = await validatePaystackRef(reference);
    console.log(response);
    if (response.data.status === "success") {
        toast.dismiss();
        toast.success("Payment successful");
        redirect("/")
    }
    return (
        <>
        </>
    );
}

export default ValidateReferencePage;