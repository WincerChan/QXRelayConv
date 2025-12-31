import { tursoClient } from "@/lib/tursoClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    'group': z.string()
})


export async function PUT(request: NextRequest) {
    const t = await request.json()
    const data = schema.parse(t)
    const ret = await tursoClient().execute({
        sql: "INSERT INTO relay_conf(type, value, created) VALUES(?, ?, ?) ON CONFLICT(type) DO UPDATE SET value = ?;",
        args: ["group_name", data.group, Math.floor(Date.now() / 1000), data.group]
    })
    return NextResponse.json({ "status": "ok" }, { status: 200 })
}

export async function GET(request: NextRequest) {
    const ret = await tursoClient().execute({
        sql: 'SELECT value FROM relay_conf WHERE type = ?;',
        args: ["group_name"]
    })
    let name;
    if (ret.rows.length !== 0) {
        name = ret.rows[0].value
    } else {
        name = ""
    }
    // insert into relay_rules (type, suffix, server) values ("HOST-SUFFIX", "
    return NextResponse.json({ group: name }, { status: 200 })
}
