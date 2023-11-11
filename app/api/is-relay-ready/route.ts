import validate from "@/utils/validate_file";
import { NextRequest, NextResponse } from "next/server";

// check shadowsocket server is avaible
export async function GET(request: NextRequest) {
    const t = await validate(process.env.NEXT_SHADOW_CONFIG_PATH as string)
    if (t.err) {
        return NextResponse.json({ "enabled": false, msg: t.err }, { status: 400 })
    }
    return NextResponse.json({
        "enabled": true
    }, { status: 200 })
}