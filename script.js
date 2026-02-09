const addTaskBtn = document.getElementById("add-task-button");
const taskList = document.getElementById("task-items-container"); //list-container
const filterBtn = document.getElementById("filter-button");
let allTasks = [];
let lastTaskId = 0;

class TodoTask {
    constructor(id,title,priority,completed=false,dueDate) {
        this.id = id;
        this.title = title;
        this.completed= completed; //status: pending, complete
        this.priority = priority; //high, medium or low
        this.dueDate = dueDate;
        this.createdAt = new Date();
    }
}

addTaskBtn.addEventListener('click', function() {
    openModal();
});
/*filterBtn.addEventListener('click', function(event) {
   event.stopPropagation;
    toggleFilterDropdown();
} )*/

function createUniqueId(){
    let timeNow = Date.now();

    if (timeNow <= lastTaskId) {
        lastTaskId++;
        return 'task-' + lastTaskId;
    }

    lastTaskId = timeNow;
    return 'task-' + timeNow;
}

let isEditingMode = false;
let title= document.getElementById("modal-title");
let taskTitle = document.getElementById("task-title");
let priorityInput = document.getElementById("task-priority");
let dueDateInput = document.getElementById("task-due-date");

//Modal Functions
//Modal for adding tasks (not displaying, however)
function openModal(){
    isEditingMode = false;

    title.textContent = 'Add New Task';
    taskTitle.value = '';
    taskTitle.placeholder = 'New Task!';
    priorityInput.value = '';
    dueDateInput.value = '';

    let overlay = document.getElementById('modal-overlay');
    overlay.classList.add('active');
    taskTitle.focus();
}

function openEditModal(taskId){
    isEditingMode = true;
}

function addTask() {
    let newTask = new TodoTask(createUniqueId(), taskTitle.value, priorityInput.value, false, dueDateInput.value);
    allTasks.push(newTask);
    
    let overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');

    renderTasks();
}

function editTask(){

}

function deleteTask(){

}

function renderTasks() {
    
}