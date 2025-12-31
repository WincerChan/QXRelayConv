
import { tursoClient } from "@/lib/tursoClient";
import { NextRequest, NextResponse } from "next/server";

interface RelayConf {
    type: string,
    value: string
}
interface QueryResult {
    rows: Array<RelayConf>
}

export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get('type')
    const ret = await tursoClient().execute({
        sql: 'SELECT value FROM relay_conf WHERE type = ?;',
        args: [type]
    })
    let uuid = crypto.randomUUID()
    // insert into relay_rules (type, suffix, server) values ("HOST-SUFFIX", "
    if (ret.rows.length == 0) {
        await tursoClient().execute({
            sql: 'INSERT INTO relay_conf (type, value, created) values (?, ?, ?);',
            args: [type, uuid, Math.floor(Date.now() / 1000)]
        })
    } else {
        uuid = ret.rows[0].value as string
    }
    return NextResponse.json({ uuid: uuid }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
    await tursoClient().execute({
        sql: 'DELETE FROM relay_conf WHERE type = ? OR type = ?;',
        args: ["group_token", "rule_token"]
    })
    return new NextResponse(null, { status: 204 })
}