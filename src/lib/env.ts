import fs from "node:fs";

function readEnvFileValue(key: string, filePath: string): string {
    try {
        const value = fs.readFileSync(filePath, "utf8").trim();
        if (value.length === 0) {
            throw new Error(`${key}_FILE is empty`);
        }
        return value;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to read ${key}_FILE at "${filePath}": ${message}`);
    }
}

export function getEnvValue(key: string): string | undefined {
    const direct = process.env[key]?.trim();
    if (direct) {
        return direct;
    }
    const filePath = process.env[`${key}_FILE`]?.trim();
    if (!filePath) {
        return undefined;
    }
    return readEnvFileValue(key, filePath);
}
