import { tursoClient } from "@/lib/tursoClient";
import validate from "@/lib/validate_file";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
    const ret = await tursoClient().execute({
        sql: "SELECT * FROM relay_conf WHERE type = ? AND value = ?;",
        args: ["group_token", params.uuid]
    })
    const name = await tursoClient().execute({
        sql: "SELECT * FROM relay_conf WHERE type = ?;",
        args: ["group_name"]
    });

    if (ret.rows.length == 0) {
        return new Response("404 Not Found", {
            status: 404,
        })
    }
    if ((ret.rows[0].created as number) + 600 < Math.floor(Date.now() / 1000))
        await tursoClient().execute({
            sql: "DELETE FROM relay_conf WHERE type = ? AND value = ?;",
            args: ["group_token", params.uuid]
        })
    const resources = []
    const t = await validate(process.env.QXRELAY_SHADOW_CONFIG_PATH as string)
    resources.push(`shadowsocks=${t.server}:${t.server_port}`)
    resources.push(`method=${t.method}`)
    resources.push(`password=${t.password}`)
    resources.push("fast-open=true")
    resources.push("udp-relay=true")
    resources.push(`tag=${name.rows[0].value}`)


    return new Response(resources.join(", "), {
        status: 200
    })
}
