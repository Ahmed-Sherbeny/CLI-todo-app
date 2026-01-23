import * as fs from 'fs'

process.stdin.setEncoding("utf8");

function loadDB() {
  try {
    const raw = fs.readFileSync("apptasks.json", "utf-8");
    return JSON.parse(raw);
  } catch {
    return { tasks: [] }; // if file missing/bad, start fresh
  }
}

function saveDB(db) {
  fs.writeFileSync("apptasks.json", JSON.stringify(db, null, 2), "utf-8");
}


function nextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1;
}

function add_task(taskname){
      const db = loadDB();

      const now = new Date();
      const task = {
            "id" : nextId(db.tasks),
            "name": taskname,
            "description": "",
            "status": "todo",
            "createdAt": now,
            "updatedAt": now
      }
      
      db.tasks.push(task);
      saveDB(db);
      console.log(`Task added successfully (ID: ${task.id})`);
}      
      
process.stdin.on("data", (data) => {
  const input = data.trim().split(/\s+/);

  if (input[0] === "add") {
    const taskName = input.slice(1).join(" "); // supports multi-word task names
    if (!taskName) {
      console.log("Usage: add <task name>");
      return;
    }
    add_task(taskName);
  } else {
    console.log("Unknown command");
  }
});
