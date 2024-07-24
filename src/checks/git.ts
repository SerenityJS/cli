import { spawnSync } from "node:child_process"

/**
 * Checks if "git" is installed on the system.
 * This is only need when installing the development branch.
 * @returns 
 */
function gitCheck(): boolean {
  // Check if "git" is installed
  const git = spawnSync("git", ["--version"])

  // Return false if git is not installed
  if (git.error) return false

  // Return true if git is installed
  return true
}

export { gitCheck }