import { Client, createClient } from '@libsql/client/http';

export function tursoClient(): Client {
    const url = process.env.QXRELAY_TURSO_URL?.trim();
    if (url === undefined) {
        throw new Error('QXRELAY_TURSO_URL is not defined');
    }

    const authToken = process.env.QXRELAY_TURSO_AUTH_TOKEN?.trim();
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
