#!/usr/bin/env node
import { Command } from "commander";
import { initConfig } from "../src/init.js";
import { runTests } from "../src/tester.js";

const program = new Command();
program.name("api-tester").description("Run REST API tests interactively").version("1.0.0");

program.command("init")
  .description("Create an interactive API test configuration file")
  .action(() => initConfig());

program.command("run [file]")
  .description("Run API tests from a config file (default: api-tests.json)")
  .option("-o, --out <path>", "write results to a JSON file", "api-results.json")
  .action((file, options) => runTests(file || "api-tests.json", options));

program.parse();
