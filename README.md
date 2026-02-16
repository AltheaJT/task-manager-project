**Task Manager / To-Do App**

A simple yet powerful task manager application built with HTML, CSS, and JavaScript.  
1.Add, edit, delete, and filter tasks
2.Responsive design  
3. Filter tasks based on 'all', 'complete' or 'pending'

**Features**  

1. Add New Tasks – Enter a title, priority, and due date.  
2. Edit & Delete Tasks– Modify existing tasks or remove them.   
3. Responsive UI– Works on desktop, tablet, and mobile.  
4. Form Validation – Ensures task titles are required.  


**Setup & Installation**  

1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager

2. Open in Browser 
- Simply open `index.html` in any modern browser (Chrome, Firefox, Edge).  

3. Run Locally (Optional with Live Server)
- If using VS Code, install the **Live Server** extension.  
- Right-click `index.html` → **Open with Live Server**.  


**Project Structure**  

task-manager/
├── index.html          # Main HTML file
├── style.css           # Styling for the app
├── script.js           # Core JavaScript logic
├── README.md           # Documentation (you're here!)


**How to Use**
1. Add a Task 
   - Click "Add Task".  
   - Fill in the title, priority (High/Medium/Low), and due date.  
   - Click "Submit".  

2. Edit a Task  
   - Click the "Edit" button on a task.  
   - Modify the details and click "Submit".  

3. Delete a Task  
   - Click the "Delete" button on a task.  


**Code Highlights**

1. Form Validation
javascript
if (!taskTitle.value.trim()) {
    alert("Task title is required!");
    return;
}
 

Author 
GitHub: [@AltheaJT](https://github.com/AltheaJT)  

Enjoy!
Feel free to modify, or contribute to this project!  


