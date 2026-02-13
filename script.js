const addTaskBtn = document.getElementById("add-task-button");
const closeBtn = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-task-btn");
const taskList = document.getElementById("list-container"); 
const filterList= document.getElementById("task-filter-options");
let lastTaskId = 0;

console.log("Add Task Button:", addTaskBtn);
console.log("Submit Button:", submitBtn);

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
let editingTaskId = null;

const title= document.getElementById("modal-title");
const taskTitle = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const dueDateInput = document.getElementById("task-due-date");
const overlay = document.getElementById("modal-overlay");

//Modal Functions
function openModal(){
    isEditingMode = false;
    editingTaskId = null;

    console.log('Modal is opened');
    title.textContent = 'Add New Task';
    taskTitle.value = '';
    taskTitle.placeholder = 'New Task!';
    priorityInput.value = 'low'; //Default priority
    dueDateInput.value = '';

    overlay.classList.add('active');
}

function openEditModal(task){
    openModal();
    isEditingMode = true; 
    editingTaskId = task.id;

    title.textContent = 'Edit Task';
    taskTitle.value = task.title;
    priorityInput.value = task.priority;
    dueDateInput.value =  task.dueDate;

    overlay.classList.add('active');
}

const filterConditions = {
    All: () => true,
    Complete: task => task.completed, 
    Pending: task => !task.completed 
};

class TaskManager {
    constructor() {
        this.tasks = [];

    }

    addTask() {
        let newTask = new TodoTask(
            createUniqueId(), 
            taskTitle.value, 
            priorityInput.value, 
            false, 
            dueDateInput.value);
        this.tasks.push(newTask);
        
        overlay.classList.remove('active');
        renderTasks();
    }

    editTask(taskId, newTitle, newPriority, newDueDate) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            task.priority = newPriority;
            task.dueDate = newDueDate;
        }
        renderTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);  
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }  
    }

    getFilteredTasks(filter) {
        const condition = filterConditions[filter];
        return this.tasks.filter(condition);  
    }

    sortTasksByPriority() {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        this.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
}

const taskManager = new TaskManager();

function deleteTask(taskId) {
    taskManager.deleteTask(taskId);
    renderTasks();
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    //to handle required field
    const taskTitleError = document.getElementById('task-title-error');
    if (!taskTitle.value.trim()) {
        taskTitleError.style.display = 'block'; 
        taskTitle.focus(); 
        return; 
    }

    if (isEditingMode) {
        taskManager.editTask(editingTaskId, taskTitle.value, priorityInput.value, dueDateInput.value);
    } else {
    taskManager.addTask();
    }

    isEditingMode = false;
    editingTaskId = null;
    overlay.classList.remove('active');
});

function renderTasks(tasks = taskManager.tasks) {
    taskList.innerHTML = '';
    console.log("Rendering tasks:", tasks);

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
        taskItem.textContent = task.title;
        taskItem.dataset.id = task.id;

        // Priority label (below title)
        const priorityLabel = document.createElement("div");
        priorityLabel.className = `priority-label priority-${task.priority.toLowerCase()}`;
        priorityLabel.textContent = task.priority;
        taskItem.appendChild(priorityLabel);

        if (task.dueDate){
            const dueDate = document.createElement("span");
            dueDate.className = "due-date";
            dueDate.textContent = `${task.dueDate}`;
            taskItem.appendChild(dueDate);
        }

        //Checkbox for task completion
        const checkbox = document.createElement ("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            taskManager.toggleTaskCompletion(task.id);
            renderTasks();
        });

        //Action buttons for edit and delete
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "actions-container";

        //Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "edit-button";
        editBtn.innerHTML = `<i class="fa-solid fa-pen edit-color"></i>`;
        editBtn.addEventListener("click", () => openEditModal(task));

        //Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button";
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can delete-color"></i>`;
        deleteBtn.addEventListener("click", () => {
            taskManager.deleteTask(task.id);
            renderTasks();
        });

        //<button class="delete-button"><i class="fa-solid fa-trash"></i></button>

        actionsContainer.append(editBtn, deleteBtn);
        taskItem.append(checkbox, actionsContainer);
        taskList.appendChild(taskItem);

    });
}

filterList.addEventListener("change", () => {
    const filterValue = filterList.value;
    const filteredTasks = taskManager.getFilteredTasks(filterValue);

    renderTasks(filteredTasks);
});    

//delete if it doesn't work
const sortByPriorityBtn = document.getElementById('sort-by-priority');
sortByPriorityBtn.addEventListener('click', () => {
    taskManager.sortTasksByPriority();
    renderTasks();
});
