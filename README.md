# Todo CLI App (Node.js)

A simple command-line **To-Do application** built with **Node.js** that allows you to manage tasks stored locally in a JSON file.

This project is intentionally minimal and educational, focusing on file-based persistence, clean command parsing, modular JavaScript design, and ES Modules (ESM).

---

## Features

- Add new tasks
- Update task names by ID
- Delete tasks by ID
- Mark tasks as `todo`, `in-progress`, or `done`
- List all tasks
- List tasks filtered by status
- Automatic ID management
- Persistent storage using a JSON file

---

## Requirements

- **Node.js v16+** (recommended)
- npm (comes with Node.js)

---

## Installation

Clone the repository and navigate into it:

```bash
git clone https://github.com/Ahmed-Sherbeny/todo-cli-app.git
cd todo-cli-app
```

Install dependencies (there are no external dependencies, but this ensures consistency):

```bash
npm install
```

---

## Usage

Run the application using:

```bash
node app.js
```

After running the command, type any of the supported commands below and press **Enter**.

---

## Commands

### Add a task

```bash
add Buy groceries
```

### Update a task name

```bash
update 3 Finish homework
```

### Delete a task

```bash
delete 2
```

### Mark task as in progress

```bash
mark-in-progress 4
```

### Mark task as done

```bash
mark-done 1
```

### List all tasks

```bash
list
```

### List tasks by status

```bash
list todo
list in-progress
list done
```

---

## 🗂 Project Structure

```text
.
├── app.js          # CLI entry point
├── utils.js        # Task and database logic
├── apptasks.json   # Persistent task storage
├── package.json
└── README.md
```

---

## Data Storage

Tasks are stored in `apptasks.json` using the following structure:

```json
{
  "tasks": [
    {
      "id": 1,
      "name": "Example task",
      "description": "",
      "status": "todo",
      "createdAt": "1/24/2026, 12:45:12 AM",
      "updatedAt": "1/24/2026, 12:45:12 AM"
    }
  ]
}
```

---

## Important Note (ES Modules)

> **This project uses ES Modules (ESM), not CommonJS.**

This means:

- `"type": "module"` is set in `package.json`
- `import` / `export` syntax is used
- `require()` and `module.exports` are **not supported**

---

## Design Notes

- All file operations are synchronous for simplicity
- State is modified in memory and written back only when needed
- Utility logic is centralized in `utils.js`
- No external libraries are used

---

## License

ISC License  
© 2026 Ahmed Sherbeny
