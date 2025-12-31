import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getEnvValue } from "@/lib/env";


export function proxy(request: NextRequest) {
    const TOKEN = getEnvValue("QXRELAY_AUTH_TOKEN");
    const token = request.cookies.get("auth-token")?.value
    const redirectURL = request.nextUrl.clone()
    redirectURL.pathname = "/"
    if (request.nextUrl.pathname !== "/") {
        if (token === undefined || token !== TOKEN) return NextResponse.redirect(redirectURL)
    } else {
        if (token === TOKEN && token !== undefined) return NextResponse.redirect(new URL("/convert-setting", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|api/auth|api/subs/|api/group/|favicon.ico).*)',
    ]
}
