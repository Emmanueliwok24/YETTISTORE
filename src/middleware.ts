import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// middleware.ts
export async function middleware(req: NextRequest) {

    const token = req.cookies.get("token")?.value;
    const loginPath = req.nextUrl.pathname.includes("login");

    if (req.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    } else if (!loginPath) {
        if (!token || token === "undefined") {
            return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
        } else {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}
