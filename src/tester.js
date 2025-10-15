import fs from "fs";
import axios from "axios";
import chalk from "chalk";
import ora from "ora";

export async function runTests(file, { out }) {
  const cfg = JSON.parse(fs.readFileSync(file, "utf-8"));
  console.log(chalk.cyan(`\n🧩 ${cfg.name}`));
  console.log(chalk.gray("—".repeat(40)));

  const results = [];
  for (const [i, r] of cfg.requests.entries()) {
    const spinner = ora(`${i+1}) ${r.method} ${r.endpoint}`).start();
    const start = Date.now();

    try {
      const res = await axios({
        method: r.method,
        url: new URL(r.endpoint, cfg.baseUrl).toString(),
        headers: r.headers || {},
        data: r.body
      });

      const ms = Date.now() - start;
      spinner.succeed(chalk.green(`✅ ${r.method} ${r.endpoint} → ${res.status} ${res.statusText} (${ms}ms)`));

      // Display the response body below the spinner
      if (res.data !== undefined) {
        console.log(chalk.blue("Response:"));
        if (typeof res.data === "object") {
          console.log(JSON.stringify(res.data, null, 2));
        } else {
          console.log(res.data);
        }
      }

      results.push({ ...r, status: res.status, ok: true, ms, response: res.data });
    } catch (e) {
      const ms = Date.now() - start;
      const status = e.response?.status ?? "ERR";
      spinner.fail(chalk.red(`❌ ${r.method} ${r.endpoint} → ${status} (${ms}ms)`));
      results.push({ ...r, status, ok: false, ms, error: e.message });
      
      if (e.response?.data) {
        console.log(chalk.red("Response:"));
        if (typeof e.response.data === "object") {
          console.log(JSON.stringify(e.response.data, null, 2));
        } else {
          console.log(e.response.data);
        }
      }
    }
  }

  const pass = results.filter(x => x.ok).length;
  const fail = results.length - pass;
  console.log(chalk.gray("—".repeat(40)));
  console.log(`${chalk.green(`${pass} passed`)} | ${chalk.red(`${fail} failed`)}`);

  fs.writeFileSync(out, JSON.stringify({ suite: cfg.name, baseUrl: cfg.baseUrl, results }, null, 2));
  console.log(chalk.gray(`Results saved to ${out}\n`));
}
