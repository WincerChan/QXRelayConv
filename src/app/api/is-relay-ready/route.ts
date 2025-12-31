import validate from "@/lib/validate_file";
import { NextRequest, NextResponse } from "next/server";
import { getEnvValue } from "@/lib/env";

// check shadowsocket server is avaible
export async function GET(request: NextRequest) {
    const shadowConfigPath = getEnvValue("QXRELAY_SHADOW_CONFIG_PATH");
    const t = await validate(shadowConfigPath as string)
    if (t.err) {
        return NextResponse.json({ "enabled": false, msg: t.err }, { status: 400 })
    }
    return NextResponse.json({
        "enabled": true
    }, { status: 200 })
}
