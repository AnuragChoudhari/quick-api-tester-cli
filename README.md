# 🚀 Quick API Tester CLI

**Quick API Tester CLI** is an interactive command-line tool to test REST API endpoints easily from the terminal. It supports multiple HTTP methods, allows custom headers and request bodies, and displays responses clearly.

---

## ✨ Features

- ⚡ Interactive API test suite creation
- 🛠️ Supports GET, POST, PUT, PATCH, DELETE
- 📝 Optional headers & request bodies
- 📊 Shows response status, duration, and output
- 💾 Saves results to JSON files
- 🖥️ Lightweight, simple, and cross-platform

---

## 📦 Installation

### 1️⃣ Globally (recommended)

```bash
npm install -g quick-api-tester-cli
```

After installation, the CLI command `quick-api-tester-cli` will be available globally.

### 2️⃣ Locally (for development or testing)

```bash
npm install quick-api-tester-cli
```

Use via npx:

```bash
npx quick-api-tester-cli init
npx quick-api-tester-cli run
```

Or run directly from source if you are developing:

```bash
node bin/index.js init
node bin/index.js run
```

---

## 🛠️ Usage

### Step 1: Initialize a new API test suite

```bash
quick-api-tester-cli init
```

Follow the interactive prompts:

- **Suite name** → e.g., `My Test Suite`
- **Base URL** → e.g., `https://jsonplaceholder.typicode.com`
- **Number of requests** → e.g., `2`

For each request:

- HTTP method (GET, POST, PUT, PATCH, DELETE)
- Endpoint (e.g., `/users`)
- Optional headers
- Optional request body (for POST/PUT/PATCH)
- Request name

📝 This generates `api-tests.json` in your current folder.

### Step 2: Run your API tests

```bash
quick-api-tester-cli run
```

- Executes all requests from `api-tests.json`
- Shows response status, duration, and the response
- Saves results to `api-results.json` by default

### Step 3: Run with a custom config file

```bash
quick-api-tester-cli run my-config.json --out my-results.json
```

- `my-config.json` → your custom test config
- `--out` → specify file to save results

---

## 💻 Example Output

```bash
1) GET /users ✅ 200 OK (120ms)
Response:
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret"
  }
]

2) POST /posts ✅ 201 Created (140ms)
Response:
{
  "id": 101,
  "title": "foo",
  "body": "bar",
  "userId": 1
}

----------------------------------------
2 passed | 0 failed
Results saved to api-results.json
```

---

## 🏗️ Development / Local Usage

You can test or develop your CLI without installing globally:

### Option 1: Run directly from source

```bash
node bin/index.js init
node bin/index.js run
```

### Option 2: Use npx locally

```bash
npx ./path-to-your-project init
npx ./path-to-your-project run
```

Replace `./path-to-your-project` with the path to your local CLI folder.

Perfect for testing new features before publishing.

---

## 🔄 Step-by-Step Workflow (New Machine / PC)

1. Install Node.js & npm if not installed
2. Install CLI globally (optional):
   ```bash
   npm install -g quick-api-tester-cli
   ```
3. Verify installation:
   ```bash
   quick-api-tester-cli --help
   ```
4. Initialize a test suite:
   ```bash
   quick-api-tester-cli init
   ```
5. Run the suite:
   ```bash
   quick-api-tester-cli run
   ```
6. **Optional:** Run locally or use npx during development:
   ```bash
   npx quick-api-tester-cli init
   npx quick-api-tester-cli run
   ```
7. Check results in `api-results.json`

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Description"`
4. Push to your branch: `git push origin feature-name`
5. Open a pull request

---

## 📄 License

ISC License © Anurag Choudhari

---

## 💡 Tips

- Use descriptive request names for clarity
- Save multiple test suites by copying `api-tests.json` with different names
- Use `--out` to store results separately for different runs
- For large responses, consider redirecting output to a file for easier reading
- Use `npx` if PATH issues prevent running `quick-api-tester-cli` globally

---

## ✅ Quick Command Reference

| Command | Description |
|---------|-------------|
| `api-tester init` | Initialize a new API test suite interactively |
| `api-tester run` | Run tests from `api-tests.json` |
| `api-tester run <file> --out <output>` | Run tests from custom file and save results |
| `npx quick-api-tester-cli <command>` | Run CLI locally without global install |
| `node bin/index.js <command>` | Run CLI directly from source during development |