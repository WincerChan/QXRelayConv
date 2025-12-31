
import { tursoClient } from "@/lib/tursoClient";
import validate from "@/lib/validate_file";
import { NextRequest } from "next/server";

interface Ret {
    [key: string]: string
}
export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
    const group = await tursoClient().execute({
        sql: "SELECT * FROM relay_conf WHERE type = ? or type = ?;",
        args: ["group_name", "rule_token"]
    })
    const t = await validate(process.env.QXRELAY_SHADOW_CONFIG_PATH as string)
    const ret: Ret = {}
    group.rows.forEach(x => {
        ret[x.type as string] = x.value as string
    })
    if (!ret.group_name) {
        return new Response("404 Not Found", {
            status: 404,
        })
    }
    const total_rules = [
        `# NAME: ${ret.group_name}`,
        `ip-cidr, ${t.server}/32, ♾️ Relay`,
    ]
    if (ret.rule_token !== params.uuid) {
        return new Response("404 Not Found", {
            status: 404,
        })
    }
    const rules = await tursoClient().execute({
        sql: "SELECT * FROM relay_rules;",
        args: []
    })
    rules.rows.forEach(x => {
        total_rules.push(`${x.type}, ${x.suffix}, 🛬 Landing, via-interface=%TUN%`)
    })
    return new Response(total_rules.join("\n") + "\n", {
        status: 200
    })
}
