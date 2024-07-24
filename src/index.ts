#!/usr/bin/env node

import { intro, note, spinner, select } from "@clack/prompts"
import { timeout } from "./utils/timeout.js"

import Chalk from "chalk"
import { gitCheck } from "./checks/git.js"
import { cloneRepo } from "./repo/clone.js"
import { installRepo } from "./repo/install.js"
import { yarnCheck } from "./checks/yarn.js"
import { buildRepo } from "./repo/build.js"

console.clear()

// Constant variables
const gitHttp = "https://git-scm.com/downloads"
const lSpinner = spinner()

// CLI Wizard Start
intro(Chalk.hex("#8560e9")("SerenityJS Installation Wizard"))
note("This installation wizard will help setup the perfect server for your project.")

const build = await select({
  message: "Select which version of Serenity you would like to use.",
  initialValue: 0,
  options: [
    {
      label: `${Chalk.hex("#8560e9")(Chalk.bold("Latest"))} (recommended)`,
      hint: "Includes the latest features and bug fixes",
      value: 0,
    },
    {
      label: `${Chalk.hex("#8560e9")(Chalk.bold("Beta"))}`,
      hint: "Includes new upcoming features, may be unstable and contain bugs.",
      value: 1,
    },
    {
      label: `${Chalk.hex("#8560e9")(Chalk.bold("Development"))}`,
      hint: "Clones the latest development branch from GitHub",
      value: 2,
    }
  ]
})

if (build === 2) {
  await lSpinner.start("Checking if git is installed on your system")
  await timeout(1000)

  // Check if git is installed
  const git = gitCheck()
  if (!git) {
    // Stop the spinner
    lSpinner.stop(`${Chalk.bold(Chalk.red("ERROR"))} Failed to find git installed on your system. Please install git and try again. ${Chalk.blue(gitHttp)}`)

    // Exit the process
    process.exit(0)
  }

  // Update the spinner message
  await lSpinner.message("Checking if yarn is installed on your system")
  await timeout(1000)

  // Check if the user has yarn installed
  const yarn = yarnCheck()
  if (!yarn) {
    // Stop the spinner
    lSpinner.stop(`${Chalk.bold(Chalk.red("ERROR"))} Failed to find yarn installed on your system. Please install yarn and try again. ${Chalk.blue("https://yarnpkg.com/")}`)

    // Exit the process
    process.exit(0)
  }

  // Update the spinner message
  await lSpinner.message("Downloading local clone of the SerenityJS repository")
  await timeout(1000)

  // Check if the repository was cloned
  const clone = cloneRepo()
  if (!clone) {
    // Stop the spinner
    lSpinner.stop(`${Chalk.bold(Chalk.red("ERROR"))} Failed to clone the SerenityJS repository. Please try again.`)

    // Exit the process
    process.exit(0)
  }

  // Update the spinner message
  await lSpinner.message("Installing dependencies, this may take a while")
  await timeout(1000)

  // Yarn install
  const install = installRepo()
  if (!install) {
    // Stop the spinner
    lSpinner.stop(`${Chalk.bold(Chalk.red("ERROR"))} Failed to install the dependencies. Please try again.`)

    // Exit the process
    process.exit(0)
  }

  // Update the spinner message
  await lSpinner.message("Building SerenityJS, this may take a while")
  await timeout(1000)

  // Yarn build
  const build = buildRepo()
  if (!build) {
    // Stop the spinner
    lSpinner.stop(`${Chalk.bold(Chalk.red("ERROR"))} Failed to build SerenityJS. Please try again.`)

    // Exit the process
    process.exit(0)
  }

  // Stop the spinner
  lSpinner.stop(`${Chalk.bold(Chalk.green("SUCCESS"))} SerenityJS has been successfully installed.`)
}
