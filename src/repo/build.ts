import { execSync } from "node:child_process"
import { resolve } from "node:path"

function buildRepo(): boolean {
  try {
    // Yarn build
    execSync("yarn build", { stdio: "ignore", cwd: resolve(process.cwd(), "serenity") })
  
    // Return true if build was successful
    return true
  } catch {
    return false
  }
}

export { buildRepo }