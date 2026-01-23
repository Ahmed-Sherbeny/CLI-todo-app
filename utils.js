import * as fs from 'fs';

// loading up the JSON file
export function loadDB() {
  try {
    const raw = fs.readFileSync("apptasks.json", "utf-8");
    return JSON.parse(raw);
  } catch {
    return { tasks: [] }; // if file missing/bad, start fresh
  }
}

// save JSON file
export function saveDB(db) {
  fs.writeFileSync("apptasks.json", JSON.stringify(db, null, 2), "utf-8");
}

// finding max ID to increment it by 1 for new task
export function nextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1;
}

// task addition
export function add_task(db, taskname){
      const now = new Date().toLocaleString();    // to get current time according
                                                  // to user local date-time format
      const task = {
            "id" : nextId(db.tasks),
            "name": taskname,
            "description": "",
            "status": "todo",   // to-do by default
            "createdAt": now,
            "updatedAt": now
      }
      
      db.tasks.push(task);
      console.log(`Task added (ID: ${task.id})`);
}     

// task updating by ID
export function update_task(db, ID, newName){
    const task = db.tasks.find(task => task.id === ID);

    if(!task){
      console.log(`No task found with ID: ${ID}`);
      return;
    }
    task.name = newName;
    task.updatedAt = new Date().toLocaleString();    
    console.log(`Task updated (ID: ${task.id})`);
}

// task deletion through filtering all ids and leaving out user selected
export function delete_task(db, ID){
  const original_length = db.tasks.length;

  db.tasks = db.tasks.filter(task => task.id !== ID);
  if(original_length === db.tasks.length){
    console.log(`No task found with ID: ${ID}`);
    return;
  }
  saveDB(db);
  console.log(`Task deleted (ID: ${ID})`); 
}

// marking an existing task in_progress
export function mark_in_progress(db, ID){
  const task = db.tasks.find(task => task.id === ID);
  if(!task){
    console.log(`No task found with ID: ${ID}`);
    return;
  }
  task.status = "in-progress";
  task.updatedAt = new Date().toLocaleString();

  console.log(`Task marked as in-progress (ID: ${ID})`); 
}

// marking an existing task done
export function mark_done(db, ID){
  const task = db.tasks.find(task => task.id === ID);

  if(!task){
    console.log(`No task found with ID: ${ID}`);
    return;
  }
  task.status = "done";
  task.updatedAt = new Date().toLocaleString();

  console.log(`Task marked as done (ID: ${ID})`); 
}

// listing all existing tasks
export function list_tasks(db){
  db.tasks.forEach(task => {
    console.log(`ID: ${task.id} | Name: ${task.name} | Status: ${task.status}`);
  }); 
}

// listing existing tasks by status
export function list_by_status(db, status){
  const task = db.tasks.filter(task => task.status === status);

  task.forEach(task => {
    console.log(`ID: ${task.id} | Name: ${task.name} | Status: ${task.status}`);
  })
}