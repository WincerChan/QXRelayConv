import { tursoClient } from "@/lib/tursoClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    'suffix': z.string(),
})

export async function GET(request: NextRequest) {
    const ret = await tursoClient().execute({
        sql: 'select * from relay_rules;',
        args: []
    })
    return NextResponse.json(ret.rows, { status: 200 })
}


export async function POST(request: NextRequest) {
    const t = await request.json()
    const data = schema.parse(t)
    const ret = await tursoClient().execute({
        sql: "INSERT INTO relay_rules (type, suffix) VALUES(?, ?) ON CONFLICT(type, suffix) DO NOTHING;",
        args: ["HOST-SUFFIX", data.suffix]
    })
    return NextResponse.json({ "status": "ok" }, { status: 200 })
}