const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');

app.use(cors());

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

function addTasks(tasks, newTaskId, newText, newPriority){
  let newTask = {taskId: newTaskId, text: newText, priority: newPriority};
  tasks.push(newTask);
  return tasks;
}

app.get("/tasks/add", (req, res)=>{
  let taskId= parseInt(req.query.taskId);
  let text= req.query.text;
  let priority= parseInt(req.query.priority);

  let results = addTasks(tasks, taskId, text, priority)
  res.json({tasks:results});
});

app.get("/tasks", (req, res)=>{
  res.json({tasks:tasks});
});

function sortTasksAsc(taskObj1, taskObj2){
  return taskObj1.priority-taskObj2.priority
}

app.get("/tasks/sort-by-priority", (req, res)=>{
  let results = tasks.sort(sortTasksAsc)
  res.json({tasks:results});
});

function updateTaskPriority(tasks, taskId, priority){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority=priority
    }
  }
  return tasks;
}

app.get("/tasks/edit-priority", (req, res)=>{
  let taskId= parseInt(req.query.taskId);
  let priority= parseInt(req.query.priority);
  tasksCopy= tasks.slice();
  let results = updateTaskPriority(tasksCopy, taskId, priority)
  res.json({tasks:results});
});

function updateTaskText(tasks, taskId, text){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].text=text
    }
  }
  return tasks;
}

app.get("/tasks/edit-text", (req, res)=>{
  let taskId= parseInt(req.query.taskId);
  let text= req.query.text;
  tasksCopy= tasks.slice();
  let results = updateTaskText(tasksCopy, taskId, text)
  res.json({tasks:results});
});

function deleteTaskById(task, taskId){
  return task.taskId!=taskId
}

app.get("/tasks/delete", (req, res)=>{
  let taskId= parseInt(req.query.taskId);
  let results = tasks.filter(task => deleteTaskById(task, taskId))
  res.json({tasks:results});
});

function filterTasksByPriority(task, priority){
  return task.priority===priority
}

app.get("/tasks/filter-by-priority", (req, res)=>{
  let priority= parseInt(req.query.priority);
  let results = tasks.filter(task => filterTasksByPriority(task, priority))
  res.json({tasks:results});
});

app.get('/greet', (req, res) => {
  res.send('Hello, World!');
});

app.get("/rectangle-area", (req, res)=>{
  let length= parseFloat(req.query.length);
  let width= parseFloat(req.query.width);
  let area = parseFloat(length*width);
  res.send("The area of the rectangle is "+area);
});
