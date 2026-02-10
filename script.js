const addTaskBtn = document.getElementById("add-task-button");
const closeBtn = document.getElementById("close-btn");
const taskList = document.getElementById("task-items-container"); //list-container
const filterList= document.getElementById("task-filter-options");
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

addTaskBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", () => {
    overlay.classList.remove('active');
});

function createUniqueId(){
    let taskId = Date.now();

    if (taskId <= lastTaskId) {
        lastTaskId++;
        return 'task-' + lastTaskId;
    }

    lastTaskId = taskId;
    return 'task-' + taskId;
}

let isEditingMode = false;
const title= document.getElementById("modal-title");
const taskTitle = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const dueDateInput = document.getElementById("task-due-date");
const overlay = document.getElementById("modal-overlay");

//Modal Functions
//Modal for adding tasks (not displaying, however)
function openModal(){
    isEditingMode = false;

    console.log('Modal is opened');
    title.textContent = 'Add New Task';
    taskTitle.value = '';
    taskTitle.placeholder = 'New Task!';
    priorityInput.value = 'low'; //Default priority
    dueDateInput.value = '';

    overlay.classList.add('active');
}

function openEditModal(taskId){
    isEditingMode = true; 

    
    title.textContent = 'Edit Task';
    taskTitle.value = taskId.title;
    priorityInput.value = taskId.priority;
    dueDateInput.value =  taskId.dueDate;
}


class TaskManager {
    constructor() {
        this.tasks = [];

    }

    addTask() {
        let newTask = new TodoTask(createUniqueId(), taskTitle.value, priorityInput.value, false, dueDateInput.value);
        this.tasks.push(newTask);
        
        overlay.classList.remove('active');
        renderTasks();
    }

    editTask(taskId, newTitle, newPriority, newDueDate) {
        for(let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id === taskId) {
                this.tasks[i].title = newTitle;
                this.tasks[i].priority = newPriority;
                this.tasks[i].dueDate = newDueDate;
                break;
            }
        }
    }

    deleteTask(taskId) {
        let newTaskList = [];
        for(let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id !== taskId) {
                newTaskList.push(this.tasks[i]);
            }
        }
        this.tasks = newTaskList;  
    }

    toggleTaskCompletion(taskId) {
        
    }

}

function renderTasks() {
    
}