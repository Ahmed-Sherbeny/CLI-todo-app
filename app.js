import * as utils from './utils.js';
process.stdin.setEncoding("utf8");  // utf8 encoding for userinput

// recieving user input
process.stdin.on("data", (data) => {
  const db = utils.loadDB();
  const input = data.trim().split(/\s+/);
  let taskName;
  let ID = Number(input[1]);    // make sure ID is numeric
  let status = input[1];
  let dirty = false;
  switch(input[0]){
    case "add":
      taskName = input.slice(1).join(" "); // supports multi-word task names
      if (!taskName) {
        console.log("Usage: add <task name>");
        return;
      }
      utils.add_task(db, taskName);
      dirty = true;
      break;
    
    case "update":
      taskName = input.slice(2).join(" ").replace(/^"|"$/g, "");
      if(!Number.isInteger(ID) || ID <= 0){   // make sure ID is an integer
        console.log(`ID: ${ID} Invalid ID`);
        return;
      }

      if(!taskName){
        console.log("Usage: update <id> <taskname>")
      }
      utils.update_task(db, ID, taskName);
      dirty = true;
      break;
    
    case "delete":
      if(!Number.isInteger(ID) || ID <= 0){
        console.log(`ID: ${ID} is invalid!`);
        return;
      }

      if(!ID){
        console.log("Usage: delete <id>");
      }
      utils.delete_task(db, ID);
      dirty = true;
      break;
    
    case "mark-in-progress":
      if(!Number.isInteger(ID) || ID <= 0){
        console.log(`ID: ${ID} is invalid!`);
        return;
      }

      if(!ID){
        console.log("Usage: mark-in-progress <id>");
      }
      utils.mark_in_progress(db, ID);
      dirty = true;
      break;

    case "mark-done":
      if(!Number.isInteger(ID) || ID <= 0){
        console.log(`ID: ${ID} is invalid!`);
        return;
      }

      if(!ID){
        console.log("Usage: mark-done <id>");
      } 
      mark_done(db, ID);
      dirty = true;
      break;
    
    case "list":
      if(!input[1]){
        utils.list_tasks(db);
      }
      else{
        if((input[1] != "todo") || (input[1] != "in-progress") || (input[1] != "done")){
          console.log("Usage: list <status>");
        }
        utils.list_by_status(db, status);
      }
      break;

    default:
      console.log("Unknown command");
      break;

  }
  if(dirty){
    utils.saveDB(db);
  }
});
