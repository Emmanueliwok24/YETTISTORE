import { Facebook, Instagram, Pin, Twitter } from "lucide-react";
import Link from "next/link";

interface FooterCompProps {
    className?: string;
}

const Footer = ({ className }: FooterCompProps) => {

    return (
        <footer className={`mt-auto border-t  `}>
            <div className="max-w-screen-xl mx-auto">
                <div className="md:grid md:grid-cols-2 lg:grid-cols-4 h-full">
                    <div className="border-r space-y-10 p-5 mb-5 md:mb-0">
                        <p className="mb-5 text-gray-800 leading-loose mt-8">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In velit nostrum temporibus hic, est natus obcaecati sint animi unde enim nemo fuga cumque error excepturi reprehenderit corporis fugiat, a earum.
                        </p>
                        <div>
                            <form action="">
                                <div className="mb-4">
                                    <input type="text"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                        placeholder="Email Address"
                                        className="border outline-none border-cyan-950 px-3 py-3 w-full block placeholder:text-gray-700 rounded-sm" />
                                </div>
                                <div className="mb-4">
                                    <input type="submit" className="border outline-none bg-gradient-to-br from-[#35a4ff] to-indigo-500  px-3 py-3 w-full block text-white rounded-sm" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="border-r space-y-5 p-5 mb-5 md:mb-0">
                        <h2 className="text-2xl mb-4 text-gray-400 font-semibold">
                            Contact Us
                        </h2>
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="address">
                                Address
                            </h4>
                            <p className="text-gray-800 font-semibold">
                                1234 Street Name, City Name, United States
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="phone">
                                Phone
                            </h4>
                            <p className="text-gray-800 font-semibold">
                                +1 234 567 890
                            </p>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="phone">
                                General Enquiry
                            </h4>
                            <p className="text-gray-800 font-semibold">
                                testing@yetti.com
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="phone">
                                Follow Us
                            </h4>
                            <div className="flex gap-3">
                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://twitter.com"}>
                                        <Instagram />
                                    </Link>
                                </div>
                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://twitter.com"}>
                                        <Pin />
                                    </Link>
                                </div>
                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://twitter.com"}>
                                        <Facebook />
                                    </Link>
                                </div>
                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://twitter.com"}>
                                        <Twitter />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-r space-y-5 p-5 mb-5 md:mb-0">
                        <h2 className="text-2xl mb-4 text-gray-400 font-semibold">
                            Shop
                        </h2>
                        <div>
                            <ul>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        All Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Fresh Flowers
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Dried Flowers
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Live Plants
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Live Plants
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h2 className="text-2xl mb-4 text-gray-400 font-semibold">
                            Services
                        </h2>
                        <ul>
                            <li>
                                <Link href={"/"} className="block mb-2 font-semibold">
                                    Live Plants
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="block mb-2 font-semibold">
                                    Live Plants
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className=" space-y-5 p-5 mb-5 md:mb-0">
                        <h2 className="text-2xl mb-4 text-gray-400 font-semibold">
                            About Us
                        </h2>
                        <div>
                            <ul>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} className="block mb-2 font-semibold">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <h2 className="text-2xl mb-4 text-gray-400 font-semibold">

                        </h2>
                        <ul>
                            <li>
                                <Link href={"/"} className="block mb-2 font-semibold">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="block mb-2 font-semibold">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="block mb-2 font-semibold">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;