import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("index.html", "dist/index.html");
await cp("src", "dist/src", { recursive: true });
