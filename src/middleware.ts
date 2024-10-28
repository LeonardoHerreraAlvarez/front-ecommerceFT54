import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const{ pathname, origin } = request.nextUrl;

    if ((pathname === "/dashboard" || pathname === "/cart") && !request.cookies.get("userData")?.value) {
        const loginURL = new NextURL("/login", origin)
        return NextResponse.redirect(loginURL)
    } else {
        return NextResponse.next();        
    }
}