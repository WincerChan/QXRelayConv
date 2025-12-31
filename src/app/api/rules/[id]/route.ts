
import { tursoClient } from "@/lib/tursoClient";
import { NextRequest } from "next/server";
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    tursoClient().execute({
        sql: "delete from relay_rules where id = ?;",
        args: [Number(id)]
    })
    return new Response(null, {
        status: 204
    })
}
