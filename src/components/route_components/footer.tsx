import {  Instagram, Linkedin,  Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutComponent from "../logout";

interface FooterCompProps {
    className?: string;
}

const Footer = ({ className }: FooterCompProps) => {

    return (
        <footer className={`mt-auto border-t  `}>
            <div className="max-w-screen-xl mx-auto">
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 h-full">
                    <div className="border-r space-y-10 p-5 mb-5 md:mb-0">
                        <p className=" text-gray-800 leading-loose mt-2">
                        <span>
                        <Image src="/logo.svg" className="h-auto w-[72]" priority alt="logo" width={72} height={72} />
                       </span>
                        Get your business the recognition it deserves with marketing tools that scale.
                         </p>
                         <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" >
                                Follow Us
                            </h4>
                            <div className="flex gap-3">
                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://www.instagram.com/yettihq/?igshid=NGExMmI2YTkyZg%3D%3D"}>
                                        <Instagram />
                                    </Link>
                                </div>

                                <div className="border rounded-full p-2 aspect-square">
                                    <Link href={"https://www.linkedin.com/company/yetti-technologies/"}>
                                        <Linkedin />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="border-r space-y-5 p-5 mb-5 md:mb-0">
                        <h2 className="text-xl mb-4 text-gray-400 font-semibold">
                            Contact Us
                        </h2>
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="address">
                                Address
                            </h4>
                            <p className="text-gray-800 font-semibold">
                            10 huges Avenue Alagomeji YABA Lagos Nigeria.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="phone">
                                Phone
                            </h4>
                            <p className="text-gray-800 font-semibold">
                                <a href="tel:08103493062">
                                0810 349 3062

                                </a>
                            </p>
                        </div>
                        <div className="mb-5">
                            <h4 className="mb-3 text-sm font-bold text-gray-400" aria-label="email">
                               Email
                            </h4>
                            <p className="text-gray-800 font-semibold">
                                <a href="mailto:Support@myyetti.co">
                                Support@myyetti.co
                                </a>
                            </p>
                        </div>

                    </div>

                    <div className=" space-y-5 p-5 mb-5 md:mb-0">
                        <h2 className="text-xl mb-4 text-gray-400 font-semibold">
                             Pages
                        </h2>


                        <ul>

                            <li>
                                <Link href={"https://www.myyetti.co/terms.html"} className="block mb-2 font-semibold">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href={"https://www.myyetti.co/privacy.html"} className="block mb-2 font-semibold">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>


                        <LogoutComponent />
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;