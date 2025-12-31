import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEnvValue } from "@/lib/env";

const schema = z.object({
    'password': z.string(),
    "remember": z.boolean()
})

interface CookieSetting {
    name: string,
    value: string,
    httpOnly: boolean,
    expires?: number
}


export async function POST(request: NextRequest) {
    const t = await request.json()
    const data = schema.parse(t)
    const redirectURL = request.nextUrl.clone()
    redirectURL.pathname = "/convert-setting"
    const authToken = getEnvValue("QXRELAY_AUTH_TOKEN");
    console.log(authToken)
    if (authToken !== data.password) {
        return NextResponse.json({ "err": "invalid auth token" }, { status: 401 })
    }
    const randomString = authToken
    const resp = NextResponse.json({ 'location': "/convert-setting" }, { status: 200 })
    const cookieSetting: CookieSetting = {
        name: "auth-token",
        value: randomString,
        httpOnly: true,
    }
    if (data.remember) {
        cookieSetting['expires'] = Date.now() + 7 * 24 * 60 * 60 * 1000
    }
    resp.cookies.set(cookieSetting)
    return resp
}
