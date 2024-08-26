import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  exp: number;
}

// Helper function to decode JWT
function base64UrlDecode(str: string) {
  // Replace non-url-safe characters
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Pad string to be a multiple of 4
  const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  str += padding;
  return Buffer.from(str, 'base64').toString('utf8');
}

function decodeJwt(token: string): JwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('JWT does not have 3 parts');
  }
  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);
  return JSON.parse(decodedPayload) as JwtPayload;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token || token === "undefined") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  try {
    // Decode the token
    const decoded = decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // Token is expired, delete it from cookies and redirect to login
      const response = NextResponse.redirect(new URL("/login", req.nextUrl.origin));
      response.cookies.delete("token");
      return response;
    }

    // Token is valid, proceed with the request
    return NextResponse.next();
  } catch (err) {
    console.error("Error decoding the token:", err);
    const response = NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    response.cookies.delete("token");
    return response;
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
  ],
};


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
