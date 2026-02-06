const addTaskBtn = document.getElementById("add-task-button");
const taskList = document.getElementById("task-items-container"); //list-container

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

function addTask() {

}

function editTask(){

}

