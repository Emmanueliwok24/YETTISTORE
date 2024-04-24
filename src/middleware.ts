import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// middleware.ts

export function middleware(req: NextRequest) {
    return NextResponse.next();
}
