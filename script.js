const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.querySelector(".taskList");
const totalTasks = document.getElementById("totalTasks");
const taskCompleted = document.getElementById("taskCompleted");
const progress = document.getElementById("progress");
const message = document.getElementById("message");
let editMode = null;
let editIndex = null;
var completedTask = 0;

function saveLocalStorage(task) {
    let myTasks = [];
    if(localStorage.getItem("myTasks")===null){
        myTasks = [];
    }
    else{
        myTasks = JSON.parse(localStorage.getItem("myTasks"));
    }
    myTasks.push(task);
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
}

function getLocalStorage(){
    let myTasks = [];
    if(localStorage.getItem("myTasks")===null){
        myTasks = [];
    }
    else{
        myTasks = JSON.parse(localStorage.getItem("myTasks"));
        let checkedStates = JSON.parse(localStorage.getItem("checkedStates") || "{}");

        myTasks.forEach(todo => {
            const newTask = document.createElement("li");
            newTask.classList.add("tasks");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("checkbox");
            newTask.appendChild(checkbox);

            if(checkedStates[todo]){
                checkbox.checked = true;
                completedTask = completedTask + 1;
            }

            checkbox.addEventListener("change", function(){
                if(this.checked){
                    completedTask = completedTask + 1;
                } else {
                    completedTask = completedTask - 1;
                }
                taskCompleted.textContent = completedTask
                let states = JSON.parse(localStorage.getItem("checkedStates") || "{}");
                if(this.checked){
                    states[todo] = true;
                } else {
                    delete states[todo];
                }
                localStorage.setItem("checkedStates", JSON.stringify(states));
                updateProgress(completedTask, parseInt(totalTasks.textContent));
                console.log(completedTask);
            });

            const taskTextElement = document.createElement("span");
            taskTextElement.classList.add("taskText");
            taskTextElement.textContent = todo;
            newTask.appendChild(taskTextElement); 

            const editButton = document.createElement("button");
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            editButton.classList.add("button", "editBtn");
            newTask.appendChild(editButton);
            editButton.addEventListener("click", function () {
            taskInput.value = taskTextElement.textContent;
            taskInput.focus();
            editMode = taskTextElement;
            editIndex = editLocalStorage(taskTextElement.textContent);
        });

            const deleteButton = document.createElement("button");    
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.classList.add("button", "deleteBtn");
            deleteButton.style.color = "red";
            newTask.appendChild(deleteButton);
            deleteButton.addEventListener("click", function () {
            newTask.remove();
            taskInput.value = "";
            deleteLocalStorage(taskTextElement.textContent);

            let states = JSON.parse(localStorage.getItem("checkedStates") || "{}");
            delete states[taskTextElement.textContent];
            localStorage.setItem("checkedStates", JSON.stringify(states));

            totalTasks.textContent = parseInt(totalTasks.textContent) - 1;
            if(checkbox.checked){
                taskCompleted.textContent = parseInt(taskCompleted.textContent) - 1;
            }
            updateProgress(parseInt(taskCompleted.textContent), parseInt(totalTasks.textContent));
        });
            taskList.appendChild(newTask);        
            totalTasks.textContent = parseInt(totalTasks.textContent) + 1;  
        })
        taskCompleted.textContent = completedTask;
        updateProgress(completedTask, parseInt(totalTasks.textContent));
    }
}


function deleteLocalStorage(task){
    let myTasks = [];
    if(localStorage.getItem("myTasks")===null){
        myTasks = [];
    }
    else{
        myTasks = JSON.parse(localStorage.getItem("myTasks"));
    }
    const index = myTasks.indexOf(task);
    if(index > -1){
        myTasks.splice(index, 1);
    }
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
}

function editLocalStorage(oldTask){
    let myTasks = [];
    if(localStorage.getItem("myTasks")===null){
        myTasks = [];
    }
    else{
        myTasks = JSON.parse(localStorage.getItem("myTasks"));
    }
    const index = myTasks.indexOf(oldTask);
    return index;
}

function updateProgress(x, y){
    let percent = 0;
    if(x===0 || y===0){
        progress.style.width = percent + "%";
    }
    else{
        percent = (x/y)*100;
        progress.style.width = percent +"%";
        if(percent==100){
        message.innerHTML = 'Congratulations🎉,You had completed all tasks🎯';
    }
    else{
        message.innerHTML = 'You can do it👍';
    }
    }
}


function task() {
    const taskText = taskInput.value.trim();
    if (taskText) {      

        if (editMode) {
            editMode.textContent = taskText;
            let myTasks = [];
            if(localStorage.getItem("myTasks")===null){
                myTasks = [];
            }
            else{
                myTasks = JSON.parse(localStorage.getItem("myTasks"));
            }
            myTasks[editIndex] = taskText;
            localStorage.setItem("myTasks", JSON.stringify(myTasks));
            editMode = null;
            editIndex = null;
            taskInput.value = "";
            return;
        }

        const newTask = document.createElement("li");
        newTask.classList.add("tasks");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        newTask.appendChild(checkbox);
        checkbox.addEventListener("change", function(){
            if(this.checked){
                completedTask = completedTask + 1;
                taskCompleted.textContent = completedTask
            } else {
                completedTask = completedTask - 1;
                taskCompleted.textContent = completedTask
            }

            let states = JSON.parse(localStorage.getItem("checkedStates") || "{}");
            if(this.checked){
                states[taskTextElement.textContent] = true;
            } else {
                delete states[taskTextElement.textContent];
            }
            localStorage.setItem("checkedStates", JSON.stringify(states));

            updateProgress(parseInt(taskCompleted.textContent), parseInt(totalTasks.textContent));
            console.log(completedTask);

        })

        const taskTextElement = document.createElement("span");
        taskTextElement.classList.add("taskText");
        taskTextElement.textContent = taskText;
        newTask.appendChild(taskTextElement);
        
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editButton.classList.add("button", "editBtn");
        newTask.appendChild(editButton);
        editButton.addEventListener("click", function () {
            taskInput.value = taskTextElement.textContent;
            taskInput.focus();
            editMode = taskTextElement;
            editIndex = editLocalStorage(taskTextElement.textContent);
        });

        const deleteButton = document.createElement("button");    
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("button", "deleteBtn");
        deleteButton.style.color = "red";
        newTask.appendChild(deleteButton);
        deleteButton.addEventListener("click", function () {
            newTask.remove();
            taskInput.value = "";
            deleteLocalStorage(taskTextElement.textContent);

            let states = JSON.parse(localStorage.getItem("checkedStates") || "{}");
            delete states[taskTextElement.textContent];
            localStorage.setItem("checkedStates", JSON.stringify(states));
            
            totalTasks.textContent = parseInt(totalTasks.textContent) - 1;
            if(checkbox.checked){
                taskCompleted.textContent = parseInt(taskCompleted.textContent) - 1;
            }
            updateProgress(parseInt(taskCompleted.textContent), parseInt(totalTasks.textContent));
        });
        
        taskList.appendChild(newTask);
        taskInput.value = "";
        taskInput.focus();
        totalTasks.textContent = parseInt(totalTasks.textContent) + 1;
        saveLocalStorage(taskTextElement.textContent);

    }else{
        alert("Please enter a task.");
        taskInput.value = "";
    }
    console.log(completedTask);
}

addButton.addEventListener("click", function(e){
    e.preventDefault();
    task();
});
document.addEventListener("DOMContentLoaded", getLocalStorage);
