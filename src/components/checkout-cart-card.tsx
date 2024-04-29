import { CartItem } from "@/contexts/cart";
import Image from "next/image";

interface CheckOutCartProps {
    image: string;
    name: string;
    quantity: number;
    price: number;
}
const CheckOutCartCard = ({ image, name, quantity }: CartItem) => {
    return (
        <div className="flex items-center gap-2 pb-5 border-b">
            <div className="aspect-square w-32 border p-1">
                <Image alt="cartitem" src={image} width={128} height={128} priority className="h-auto w-full object-cover aspect-square" />
            </div>
            <div>
                <h3 className="font-bold">{name}</h3>
                <p>Quantity ({quantity})</p>
            </div>
            <div className="ml-auto">
                <p className="font-bold">${Number(quantity).toLocaleString()}</p>
            </div>
        </div>
    )
}
export default CheckOutCartCard;