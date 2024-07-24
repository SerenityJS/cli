import { execSync } from "node:child_process"

function yarnCheck(): boolean {
  try {
    // Yarn install
    execSync("yarn --version", { stdio: "ignore" })
  
    // Return true if installation was successful
    return true
  } catch {
    return false
  }
}

export { yarnCheck }