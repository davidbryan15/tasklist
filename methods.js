class CrudTasks {

  constructor(){

  }

//inital load when starting app
  initialLoad(){
  const taskList = this.loadTasks();
  taskList.forEach(task => this.createTaskElement(task));
  sessionStorage.clear();
}

//*********************************INTERNAL SERVICE METHODS*********************************************


//method to create new list item to seperate the element creation versus adding a new item to local storage array. 

//if I kept this code in the addTasks method, it would create a duplicate of every task in the local storage array only while populating the items in the list
  createTaskElement(value){
    //grab collection list
    const collection = document.querySelector('.collection');

    //create new list element
    const list = document.createElement('li');

    //add class to list item
    list.className = 'collection-item';

    //add value into list
    list.innerText = value;

    //create removeLink and updateLink element
    const removelink = document.createElement('a');
    const updateLink = document.createElement('a');

    //add class to link element
    removelink.className = 'delete-item secondary-content';
    updateLink.className = 'update-item secondary-content';

    //add innerHTML icon to link
    removelink.innerHTML = '</i><i class="fa fa-remove"></i>';
    updateLink.innerHTML = '</i><i class="fa fa-edit"></i>';

    //append link to list element
    list.appendChild(removelink);
    list.appendChild(updateLink);

    //append list to collection
    collection.appendChild(list);
    }



  //load tasks from local storage tasks
  loadTasks(){

      let taskList = localStorage.getItem("taskList");

      //get tasklist from local storage -> if null create new, else bring in array object
      if(taskList === null || taskList === ''){
        taskList = new Array();
        
      }
      else {
        //need JSON parse to convert string into array object in JS
        taskList = JSON.parse(localStorage.getItem("taskList"));
      }

      console.log("tasks-loaded");

      return taskList;
    }




//save task into local storage
  saveTaskList(tasklist){
    localStorage.setItem("taskList", JSON.stringify(tasklist));
    console.log("task list saved!!!")
  }


//differentiate betwen removal of item or update icon to allow using remove item or load update field
  taskAction(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      console.log("removeTask activated");
      this.removeTask(e);
    }
    else if(e.target.parentElement.classList.contains('update-item')){
      console.log("loadInputfield activated");
      this.loadInputField(e);
    }
  }


//load input field with task looking to be updated
  loadInputField(e){

    //get add and update button constants
    const addBtn = document.querySelector('#add');
    const updateBtn = document.querySelector('#update');

    //hide and show btns
    addBtn.setAttribute("type", "hidden");
    updateBtn.setAttribute("type", "submit");

    //grab parent element for selected item
    const li = e.target.parentElement.parentElement;

    //grab innerText value from li selected
    const taskValue = li.innerText;

    //Load LocalStorage tasks and find value in array and return index
    const taskList = this.loadTasks();
    const indexVal = taskList.indexOf(taskValue);

    //grab input field
    const taskInputField = document.getElementById('task');

    //fill input field with text looking to be updated
    taskInputField.focus();
    taskInputField.value = taskValue;

    //add index to session and old value
    sessionStorage.setItem('currentUpdateIndex', indexVal);

  }
  


//*********************************END INTERNAL SERVICE METHODS*********************************************


//add task to list and session storage
addtask(e, value){
  this.createTaskElement(value);

  //Load task list
  const taskList = this.loadTasks();

  //add new item to task list
  taskList.push(value);

  //save new taskList
  this.saveTaskList(taskList);

  document.getElementById('task').value = '';

  e.preventDefault();

}
  
//clear all tasks
clearTasks(){
  //if removal request is true, clear local storage
  if(confirm("Are you sure you want to clear all tasks?")){
    localStorage.clear();
    location.reload();
  }
}




//update task
updateTask(e){
  //get old index val from sessionObject
  const indexVal = JSON.parse(sessionStorage.getItem('currentUpdateIndex'));
  console.log("indexVal: " + indexVal);

  //get task input field to grab new value
  const taskInputField = document.querySelector('#task');

  //get input field value at time of update event
  const newTaskVal = taskInputField.value;
  console.log("newTaskVal: " + newTaskVal);

  //replace old val with new val in array
  const taskList = this.loadTasks();
  taskList[indexVal] = newTaskVal;

  //save tasklist
  this.saveTaskList(taskList);

  console.log(taskList)

  console.log("update finished");
    
}


//remove task
removeTask(e){
    
    if(confirm("Are you sure")){
    console.log("Removing task....");

    //grab parent element for selected item
    const li = e.target.parentElement.parentElement;

    //grab innerText value from li selected
    const taskValue = li.innerText;

    //Load LocalStorage tasks and find value in array and return index
    const taskList = this.loadTasks();
    const indexVal = taskList.indexOf(taskValue);

      if(taskList.length === 1){
        localStorage.clear();
      }
      else{
        //remove index from arra
        taskList.pop(indexVal);

        //re-save tasklist
        this.saveTaskList(taskList);

        //remove task from list
        li.remove();
      }

    //confirm completion with console msg
    console.log("Task Deleted.");
    }
  
 }


  //filter Tasks
  filterTask(e){
    console.log("filtering......");

    //set constants
    const text = e.target.value.toLowerCase();
    const collectionList = document.querySelectorAll('.collection-item');

    collectionList.forEach(
      task => {
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
        }
        else {
          task.style.display = 'none';
        }
      }
    )

  }
}




//export to use in made module
export {CrudTasks};