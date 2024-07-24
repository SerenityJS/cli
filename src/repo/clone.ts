import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"

const repo = "https://github.com/SerenityJS/serenity.git"

function cloneRepo(): boolean {
  // Check if the repository already exists
  if (existsSync("serenity")) return true

  // Check if "git" is installed
  const git = spawnSync("git", ["clone", repo])

  // Return false if git is not installed
  if (git.error) return false
  
  // Return true if git is installed
  return true
}

export { cloneRepo }