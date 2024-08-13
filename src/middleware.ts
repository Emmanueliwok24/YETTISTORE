import axios from "axios";
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
    ]
}