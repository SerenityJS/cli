#!/usr/bin/env node

import { intro, note, spinner } from "@clack/prompts"
import Chalk from "chalk"

console.clear()

intro(Chalk.hex("#8560e9")("SerenityJS Installation Wizard"))

note("This installation wizard will help setup the perfect server for your project.")

const download = spinner()
download.start("Downloading the latest version of SerenityJS")