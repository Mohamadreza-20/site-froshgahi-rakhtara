import { execFileSync } from "node:child_process";

process.env.VITE_SEO_STRICT = "true";
execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: process.env,
});
