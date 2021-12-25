import { addEventListenerToProjectButton, addProjectEvent, addEventListenerToDeleteProjectButton, cancelAddTaskButton, setIdForTask, addEventListenerToEditTaskButton, addEventListenerToRemoveTaskButton } from "./eventlis";
import { projects, Task, tasks } from "./projectsandtasks";


function getNavButtons() {
    const buttons = document.querySelectorAll("button.nav-buttons");

    return buttons;
}

function getElementById(id) {
    const ele = document.getElementById(id);

    return ele;
}



function changeListName(name) {
    const listName = document.getElementById("list-name");

    listName.textContent = name;

}

function getAddProjectButton() {
    const addProject = document.getElementById("add-project");
    return addProject;
}

function removeAddProjectButton() {
    const elem = getAddProjectButton();
    elem.parentNode.removeChild(elem);
}

function showProjectInput() {
    const elem = document.getElementById("project-input");
    elem.style.visibility = "visible";
}

function hideProjectInput() {
    const elem = document.getElementById("project-input");
    elem.style.visibility = "hidden";
}

function createAddProjectButton() {
    const button = document.createElement("button");
    button.setAttribute("id", "add-project");
    button.innerHTML = '<img src="img/add.png" alt=""> Add Project';
    const div = document.getElementById("projects");
    div.appendChild(button);
    addProjectEvent();
}

function getAddButton() {
    const button = document.getElementById("add-button");
    return button;
}

function getProjectNameInput() {
    const input = document.getElementById("project-name-input");
    return input;
}

function getCancelButton() {
    const button = document.getElementById("cancel-button");
    return button;
}

function displayProjects() {
    const projectList = document.getElementById("projects");
    

    projects.forEach((project) => {
        const children = document.querySelectorAll("button.button-project");
        let check = false;
       

        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == project.id) {
                check = true;
            }
        }

        if(check == false) {
            const button = createProjectButton(project.title.replace(/\s+/g, ''), project.id);
            addEventListenerToProjectButton(button);
            projectList.appendChild(button);
            addEventListenerToDeleteProjectButton(getRemoveProjectButton(project.id), project.id);
            
        }
        
    });
}

function createProjectButton(name, id) {
    const button = document.createElement("button");
    button.setAttribute("class", "button-project nav-buttons");
    button.setAttribute("id", id);
    button.innerHTML = '<img src="img/project.png" alt=""> ' + name + ' <img data-id="'+ id +'"' + 'title="Delete" class="del-project" src="img/x.png" alt="">';
    return button;
}

function getRemoveProjectButton(id) {
    const ele = document.querySelector("[data-id='"+ id +"']");
    

    return ele;
}

function removeProject(id) {
    let ele = document.getElementById(id);
    if(ele.textContent.replace(/\s+/g, '') == document.getElementById("list-name").textContent) {
        changeListName("Home");
        document.getElementById("tasks").textContent = "";
        displayTasks();
    } else if (document.getElementById("list-name").textContent == "Home") {
        document.getElementById("tasks").textContent = "";
        displayTasks();
    }
    ele.parentNode.removeChild(ele);


    for(let i = 0; i < projects.length; i++) {
        if(projects[i].id == id) {
            projects.splice(i, 1);
            break;
        }
    }

}

function removeAllTasks() {
    let task = document.getElementsByClassName("task");
    while(task[0]) {
        task[0].parentNode.removeChild(task[0]);
    }
}

function removeTask(id) {
    let ele = document.getElementById(id);
    ele.parentNode.removeChild(ele);

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id == id) {
            tasks.splice(i, 1);
            break;
        }
    }
}

function returnTaskById(id) {
   
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id == id) {
                return tasks[i];
            }
        }
    
}

function createInnerHtmlForTask(id, title,date) {
    let a = '<div class="task-left"><input type="checkbox" data-id="' + id +'Ch"><span>'+ title +'</span><div class="delete-edit-task"><img src="img/edit.png" data-id="'+id+'"><img src="img/x.png" data-id="'+id+'D"></div></div><div><span>'+date+'</span></div>';
    return a;
}

function editTask(id) {
    let ele = document.getElementById(id);
    let taskFromList = returnTaskById(id);
    document.getElementById("add-task").style.visibility = "hidden";
    ele.textContent = "";

    const container = document.createElement("div");
    container.setAttribute("id", "divForAddTaskForm");
    const form = document.createElement("form");
    form.style.borderBottom = "none";
    form.setAttribute("class", "edit-task");
    form.setAttribute("onsubmit", "return false");
    
    const textareaTitle = document.createElement("textarea");
    textareaTitle.setAttribute("class", "task-title-textarea");
    textareaTitle.setAttribute("id", "titleOfTask");
    textareaTitle.setAttribute("required", true);
    textareaTitle.value = taskFromList.name;
    const labelForTitle = document.createElement("label");
    labelForTitle.textContent = "Title:";
    labelForTitle.style.marginTop = "0px";
    form.appendChild(labelForTitle);
    form.appendChild(textareaTitle);

    const textAreaDescription = document.createElement("textarea");
    textAreaDescription.setAttribute("class", "task-description");
    textAreaDescription.setAttribute("id", "detailsOfTask");
    textAreaDescription.setAttribute("required", true);
    textAreaDescription.value = taskFromList.description;
    const labelForDes = document.createElement("label");
    labelForDes.textContent = "Description:";
    labelForDes.style.marginTop = "0px";
    form.appendChild(labelForDes);
    form.appendChild(textAreaDescription);

    const label = document.createElement("label");
    label.style.marginTop = "0px";
    label.textContent = "Due Date:";
    form.appendChild(label);

    const secondContainer = document.createElement("div");
    secondContainer.setAttribute("class", "date-and-project");

    const inputDate = document.createElement("input");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("id", "datePicker");
    inputDate.setAttribute("class", "date-set");
    inputDate.setAttribute("required", true);
    inputDate.value = taskFromList.date;
    secondContainer.appendChild(inputDate);

    const inputProjectName = document.createElement("input");
    inputProjectName.setAttribute("placeholder", "Project Name");
    inputProjectName.setAttribute("type", "text");
    inputProjectName.setAttribute("id", "projectNameValue");
    inputProjectName.setAttribute("class", "set-project-name");
    inputProjectName.value = taskFromList.project;
    secondContainer.appendChild(inputProjectName);

    const imgAccept = document.createElement("button");
    imgAccept.setAttribute("id", "acceptButton");
    imgAccept.innerHTML = '<img src="img/accept.png" title="Accept"></img>';
   
    secondContainer.appendChild(imgAccept);


    const imgCancel = document.createElement("img");
    imgCancel.setAttribute("id", "cancelAddTaskButton");
    imgCancel.setAttribute("src", "img/cancel.png");
    imgCancel.setAttribute("title", "Cancel");
    secondContainer.appendChild(imgCancel);

    form.appendChild(secondContainer);
    container.appendChild(form);

    ele.appendChild(container);

    imgAccept.addEventListener("click",() => {
        taskFromList.name = textareaTitle.value;
        taskFromList.description = textAreaDescription.value;
        taskFromList.date = inputDate.value;
        taskFromList.project = inputProjectName.value;
        completeEditingTask(id, taskFromList.name, taskFromList.date, ele); 
    });

    imgCancel.addEventListener("click", () => {
        completeEditingTask(id, taskFromList.name, taskFromList.date, ele);
    });
    
   
}

function completeEditingTask(id, name, date, ele) {
    ele.innerHTML = createInnerHtmlForTask(id, name, date);
    addEventListenerToEditTaskButton(document.querySelector("[data-id='"+id+"']"), id);
    addEventListenerToRemoveTaskButton(document.querySelector("[data-id='"+id+"D']"), id);
    document.getElementById("add-task").style.visibility = "visible";
}

function createTaskEditor() {
    const container = document.createElement("div");
    container.setAttribute("id", "divForAddTaskForm");
    const form = document.createElement("form");
    form.setAttribute("class", "edit-task");
    form.setAttribute("onsubmit", "return false");


    const textareaTitle = document.createElement("textarea");
    textareaTitle.setAttribute("class", "task-title-textarea");
    textareaTitle.setAttribute("id", "titleOfTask");
    textareaTitle.setAttribute("placeholder", "Title:");
    textareaTitle.setAttribute("required", true);
    form.appendChild(textareaTitle);

    const textAreaDescription = document.createElement("textarea");
    textAreaDescription.setAttribute("class", "task-description");
    textAreaDescription.setAttribute("placeholder", "Details:");
    textAreaDescription.setAttribute("id", "detailsOfTask");
    textAreaDescription.setAttribute("required", true);
    form.appendChild(textAreaDescription);

    const label = document.createElement("label");
    label.textContent = "Due Date:";
    form.appendChild(label);

    const secondContainer = document.createElement("div");
    secondContainer.setAttribute("class", "date-and-project");

    const inputDate = document.createElement("input");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("id", "datePicker");
    inputDate.setAttribute("class", "date-set");
    inputDate.setAttribute("required", true);
    secondContainer.appendChild(inputDate);

    const inputProjectName = document.createElement("input");
    inputProjectName.setAttribute("placeholder", "Project Name");
    inputProjectName.setAttribute("type", "text");
    inputProjectName.setAttribute("id", "projectNameValue");
    inputProjectName.setAttribute("class", "set-project-name");
    secondContainer.appendChild(inputProjectName);

    const imgAccept = document.createElement("button");
    imgAccept.setAttribute("id", "acceptButton");
    imgAccept.innerHTML = '<img src="img/accept.png" title="Accept"></img>';
    secondContainer.appendChild(imgAccept);

    
    const imgCancel = document.createElement("img");
    imgCancel.setAttribute("id", "cancelAddTaskButton");
    imgCancel.setAttribute("src", "img/cancel.png");
    imgCancel.setAttribute("title", "Cancel");
    secondContainer.appendChild(imgCancel);

    form.appendChild(secondContainer);
    container.appendChild(form);
    

    return container;
    
}

function createTaskVisual(title, date, id) {
    const divTask = document.createElement("div");
    divTask.setAttribute("class", "task");
    divTask.setAttribute("id", id);

    const divLeft = document.createElement("div");
    divLeft.setAttribute("class", "task-left");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-id", id+"Ch");
    divLeft.appendChild(checkBox);

    const text = document.createElement("span");
    text.textContent = title;
    divLeft.appendChild(text);

    const deleteEdit = document.createElement("div");
    deleteEdit.setAttribute("class", "delete-edit-task");

    const imgEdit = document.createElement("img");
    imgEdit.setAttribute("src", "img/edit.png");
    imgEdit.setAttribute("data-id", id);
    addEventListenerToEditTaskButton(imgEdit, id);
    deleteEdit.appendChild(imgEdit);

    const imgDel = document.createElement("img");
    imgDel.setAttribute("src", "img/x.png");
    imgDel.setAttribute("data-id", id+"D");
    addEventListenerToRemoveTaskButton(imgDel, id);
    deleteEdit.appendChild(imgDel);
    divLeft.appendChild(deleteEdit);

    divTask.appendChild(divLeft);

    const divRight = document.createElement("div");

    const dateText = document.createElement("span");
    dateText.textContent = date;

    divRight.appendChild(dateText);
    divTask.appendChild(divRight);

    if(document.getElementById("divForAddTaskForm") != null) {
        document.getElementById("divForAddTaskForm").parentNode.removeChild(document.getElementById("divForAddTaskForm"));
    }

    
    document.getElementById("tasks").appendChild(divTask);
    document.getElementById("add-task").style.visibility = "visible";
}

function clearForm() {
    document.getElementById("titleOfTask").value = "";
    document.getElementById("detailsOfTask").value = "";
    document.getElementById("datePicker").value = "";
    document.getElementById("projectNameValue").value = "";
}

function getDataFromTaskFormAndCreateTask() {
    const title = document.getElementById("titleOfTask").value;
    const details = document.getElementById("detailsOfTask").value;
    const date = document.getElementById("datePicker").value;
    const project = document.getElementById("projectNameValue").value;
    

    const task = Task(title, details, date, project, false, setIdForTask());
    tasks.push(task);
    clearForm();
    if(document.getElementById("list-name").textContent == "Home") {
        displayTasks();
    } else {
        displayTasksInProject(document.getElementById("list-name").textContent.replace(/\s+/g, ''));
    }

    
   

    

}

function displayTasks() {
    
    
    tasks.forEach((task) => {
        const children = document.querySelectorAll("div.task");
        let check = false;
       

        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == task.id) {
                check = true;
            }
        }


        if(check == false) {
            createTaskVisual(task.name, task.date, task.id);
            
        } 
        
    });
}

function displayTasksInProject(projectName) {
    
    tasks.forEach((task) => {
        const children = document.querySelectorAll("div.task");
        let check = false;
       
        
        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == task.id) {
                check = true;
            }
        }
        
        
        if(check == false && projectName.toLowerCase() == task.project.toLowerCase()) {
            createTaskVisual(task.name, task.date, task.id);
        } else {
            if(document.getElementById("divForAddTaskForm") != null) {
                document.getElementById("divForAddTaskForm").parentNode.removeChild(document.getElementById("divForAddTaskForm"));
            }
            document.getElementById("add-task").style.visibility = "visible";

        }
        
    });
}


function validateForm() {
    const title = document.getElementById("titleOfTask").value;
    const details = document.getElementById("detailsOfTask").value;
    const data = document.getElementById("datePicker").value;

    if(title != "" && details != "" && data != "") {
        return true;
    }

    return false;
}







export {getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, createAddProjectButton, getAddButton,
    getProjectNameInput, hideProjectInput, getCancelButton, createProjectButton, displayProjects, removeProject, getElementById,createTaskEditor,getDataFromTaskFormAndCreateTask,validateForm, removeTask,
    editTask, displayTasksInProject, removeAllTasks, displayTasks
};