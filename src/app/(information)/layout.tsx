"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/route_components/footer";
import { Hydrate } from "@/components/route_components/hydrate";
import { GeistSans } from 'geist/font/sans';
import "../globals.css";
import QueryProviderContext from "@/contexts/reactquery";
import { Toaster } from "sonner";
import CartSideComponent from "@/components/route_components/cart-component";
import BreadCrumbs from "@/components/route_components/breadcrumbs";
import { CheckOutDataProvider } from "@/contexts/checkout-content";
import Head from "next/head";
import { LucideArrowLeft, LucideArrowUpRight } from "lucide-react";

const InformationLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [storeLink, setStoreLink] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Retrieve the store link from localStorage
        const savedStoreLink = localStorage.getItem("storeLink");
        setStoreLink(savedStoreLink);
    }, []);

    const handleBackToStore = () => {
        if (storeLink) {
            router.push(`/store/${storeLink}`);
        }
    };

    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            <QueryProviderContext>
                <body className={`${GeistSans.className} flex flex-col min-h-screen`}>
                    <Toaster richColors position="top-center" />
                    <Hydrate>
                        <CheckOutDataProvider>
                            <main className="max-w-screen-xl mx-auto w-full">
                                <div className="grid md:grid-cols-2 grid-cols-1 min-h-[60vh]">
                                    <div className="bg-[#0a3457] w-full p-5 md:px-10">
                                        <BreadCrumbs />
                                        {storeLink && (
                                            <div className="mt-3 text-start text-gray-300 border border-gray-700 p-2 py-3">
                                                <button
                                                    onClick={handleBackToStore}
                                                   className="flex gap-2 items-center  text-sm"
                                                >
                                                    <LucideArrowLeft/>
                                                    Back to Store
                                                </button>
                                            </div>
                                        )}
                                      {children}
                                    </div>
                                    <CartSideComponent />
                                </div>
                            </main>
                            <Footer />
                        </CheckOutDataProvider>
                    </Hydrate>
                </body>
            </QueryProviderContext>
        </html>
    );
};

export default InformationLayout;
