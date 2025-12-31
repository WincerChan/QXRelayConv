
import { tursoClient } from "@/lib/tursoClient";
import validate from "@/lib/validate_file";
import { NextRequest } from "next/server";
import { getEnvValue } from "@/lib/env";

interface Ret {
    [key: string]: string
}
export async function GET(request: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;
    const group = await tursoClient().execute({
        sql: "SELECT * FROM relay_conf WHERE type = ? or type = ?;",
        args: ["group_name", "rule_token"]
    })
    const shadowConfigPath = getEnvValue("QXRELAY_SHADOW_CONFIG_PATH");
    const t = await validate(shadowConfigPath as string)
    const publicHost = getEnvValue("QXRELAY_PUBLIC_HOST");
    const serverHost = publicHost ?? t.server;
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
        `ip-cidr, ${serverHost}/32, ♾️ Relay`,
    ]
    if (ret.rule_token !== uuid) {
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
