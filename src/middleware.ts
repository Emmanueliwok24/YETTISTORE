import { NextRequest, NextResponse } from "next/server";

// middleware.ts
export async function middleware(req: NextRequest) {

    const token = req.cookies.get("token")?.value;
    if (!token || token === "undefined") {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    } else {
        return NextResponse.next();
    }

}

export const config = {
    matcher: [
        "/",
        "/collections/:path*",
        "/collection/:path*",
        "/store/:path*",
        "/payments/:path*",
        "/validate/:path*",
        "/payment/:path*",
        "/information/:path*",
        "/order/:path*",
        "/product/:path*",
    ]
}


// import { NextRequest, NextResponse } from "next/server";

// // middleware.ts
// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//         console.log('No token found, redirecting to login.');
//         return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
//     }

//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/product`, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: "string",
//                 description: "string",
//                 media: "string",
//                 price: "string",
//                 discounted_price: "string",
//                 cost_price: "string",
//                 stock_count: 2147483647,
//                 stock_keeping_unit: "string",
//                 item_unit: 0,
//                 size: 2147483647,
//                 color: "string",
//                 collection: 0,
//                 status: "active",
//                 theme: "string"
//             })
//         });

//         if (res.ok) { // Check for successful status code
//             console.log('API call successful, redirecting to home.');
//             return NextResponse.redirect(new URL("/", req.nextUrl.origin));
//         } else {
//             console.log('API call failed, redirecting to login.');
//             return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
//         }
//     } catch (err) {
//         console.error('Error occurred during API call:', err);
//         return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
//     }
// }

// export const config = {
//     matcher: [
//         "/",
//         "/collections/:path*",
//         "/collection/:path*",
//         "/store/:path*",
//         "/payments/:path*",
//         "/validate/:path*",
//         "/payment/:path*",
//         "/information/:path*",
//         "/order/:path*",
//         "/product/:path*",
//     ]
// }
