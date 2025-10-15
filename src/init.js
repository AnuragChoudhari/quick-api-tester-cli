import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

export async function initConfig() {
  console.log(chalk.cyan("\n👋 Welcome to API Tester Setup\n"));

  const { suiteName, baseUrl, count } = await inquirer.prompt([
    { type: "input", name: "suiteName", message: "Suite name:", default: "API Test Suite" },
    { type: "input", name: "baseUrl", message: "Base URL:", validate: v => !!v || "Required" },
    { type: "number", name: "count", message: "Number of requests:", default: 1, validate: n => n>0 || ">=1" }
  ]);

  const requests = [];
  for (let i = 0; i < count; i++) {
    console.log(chalk.yellow(`\nRequest ${i + 1}:`));
    const a = await inquirer.prompt([
      { type: "list", name: "method", message: "HTTP method:", choices: ["GET","POST","PUT","PATCH","DELETE"] },
      { type: "input", name: "endpoint", message: "Endpoint (e.g., /users):", validate: v => !!v || "Required" },
      { type: "confirm", name: "addHeaders", message: "Add headers?", default: false },
      { type: "editor", name: "headers", message: "Headers as JSON:", when: x=>x.addHeaders, filter: t=>t?.trim(), validate: t=>{ try{ JSON.parse(t); return true;}catch{ return "Invalid JSON";} } },
      { type: "confirm", name: "addBody", message: "Add body?", when: x=>["POST","PUT","PATCH"].includes(x.method), default:false },
      { type: "editor", name: "body", message: "Body as JSON:", when: x=>x.addBody, filter: t=>t?.trim(), validate: t=>{ try{ JSON.parse(t); return true;}catch{ return "Invalid JSON";} } },
      { type: "input", name: "name", message: "Request name:", default: ans => `${ans.method} ${ans.endpoint}` }
    ]);
    requests.push({
      name: a.name, method: a.method, endpoint: a.endpoint,
      ...(a.addHeaders ? { headers: JSON.parse(a.headers) } : {}),
      ...(a.addBody ? { body: JSON.parse(a.body) } : {})
    });
  }

  const config = { name: suiteName, baseUrl, requests };
  fs.writeFileSync("api-tests.json", JSON.stringify(config, null, 2));
  console.log(chalk.green("\n✅ Saved configuration to api-tests.json\n"));
}
