import { CrudTasks } from "./methods.js";

//CONST FIELDS
const CrudTaskMethods = new CrudTasks();
const task = document.querySelector('#task');
const addBtn = document.querySelector('#add');
const clearBtn = document.querySelector('#clear');
const taskList = document.querySelector('.collection');
const updateBtn = document.querySelector('#update');
const filter = document.querySelector('#filter');


//EVENT LISTENERS
//load local storage tasks
document.addEventListener('DOMContentLoaded', e => {CrudTaskMethods.initialLoad()});

//add task
addBtn.addEventListener('click', e => {CrudTaskMethods.addtask(e, task.value)});

//update task
updateBtn.addEventListener('click', e => {CrudTaskMethods.updateTask(e)});

//clear all tasks
clearBtn.addEventListener('click', e => {CrudTaskMethods.clearTasks()});

//remove or load for(update) task
taskList.addEventListener('click', e => {CrudTaskMethods.taskAction(e)});

//filter task
filter.addEventListener('keyup', e=>{CrudTaskMethods.filterTask(e)})

