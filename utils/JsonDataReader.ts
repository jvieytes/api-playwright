import fs from "fs";
import path from "path";

export class JsonDataReader {
    public static read<T>(relativePath: string): T {
        const fullPath = path.resolve(process.cwd(), relativePath);
        const raw = fs.readFileSync(fullPath, "utf-8");
        return JSON.parse(raw) as T;
    }
}