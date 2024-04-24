import Footer from "@/components/route_components/footer";
import { Hydrate } from "@/components/route_components/hydrate";
import { GeistSans } from 'geist/font/sans';
import "../globals.css";
import QueryProviderContext from "@/contexts/reactquery";
import { Toaster } from "sonner";
import CartSideComponent from "@/components/route_components/cart-component";
import BreadCrumbs from "@/components/route_components/breadcrumbs";
import { CheckOutDataProvider } from "@/contexts/checkout-content";

const InformationLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <QueryProviderContext>
                <body className={`${GeistSans.className} flex flex-col min-h-screen`}>
                    <Toaster richColors position="top-center" />
                    <Hydrate>
                        <CheckOutDataProvider>
                            <main className="max-w-screen-xl mx-auto w-full">
                                <div className="grid md:grid-cols-2 grid-cols-1 min-h-[60vh]">
                                    <div className="bg-cyan-950 w-full p-5 px-10">
                                        <BreadCrumbs />
                                        {children}
                                    </div>
                                    <CartSideComponent />
                                </div>
                            </main>
                            <Footer />
                        </CheckOutDataProvider>
                    </Hydrate>
                </body >
            </QueryProviderContext>
        </html >
    )
}

export default InformationLayout