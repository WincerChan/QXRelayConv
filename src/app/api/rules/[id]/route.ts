
import { tursoClient } from "@/lib/tursoClient";
import { NextRequest } from "next/server";
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    tursoClient().execute({
        sql: "delete from relay_rules where id = ?;",
        args: [Number(params.id)]
    })
    return new Response(null, {
        status: 204
    })
}