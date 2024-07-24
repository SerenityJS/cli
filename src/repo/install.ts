import { execSync } from "node:child_process"
import { resolve } from "node:path"

function installRepo(): boolean {
  try {
    // Yarn install
    execSync("yarn install", { stdio: "ignore", cwd: resolve(process.cwd(), "serenity") })
  
    // Return true if installation was successful
    return true
  } catch {
    return false
  }
}

export { installRepo }