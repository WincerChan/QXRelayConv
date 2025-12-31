import { Client, createClient } from '@libsql/client/http';
import { getEnvValue } from "@/lib/env";

export function tursoClient(): Client {
    const url = getEnvValue("QXRELAY_TURSO_URL");
    if (url === undefined) {
        throw new Error('QXRELAY_TURSO_URL is not defined');
    }

    const authToken = getEnvValue("QXRELAY_TURSO_AUTH_TOKEN");
    if (authToken === undefined) {
        if (!url.includes('file:')) {
            throw new Error('QXRELAY_TURSO_AUTH_TOKEN is not defined');
        }
    }

    return createClient({
        url: url as string,
        authToken: authToken as string,
    });
}
