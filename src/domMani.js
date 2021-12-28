import { differenceInCalendarDays, format, formatDistance, parseISO } from "date-fns";
import { addEventListenerToProjectButton, addProjectEvent, addEventListenerToDeleteProjectButton, cancelAddTaskButton, setIdForTask, addEventListenerToEditTaskButton, addEventListenerToRemoveTaskButton, checkBoxEvent, sortDown, sortUP } from "./eventlis";
import { projects, Task, tasks, updateMyTasksLocal } from "./projectsandtasks";



function getNavButtons() {
    const buttons = document.querySelectorAll("button.nav-buttons");

    return buttons;
}

function getElementById(id) {
    const ele = document.getElementById(id);

    return ele;
}

function createAddProjectButtona() {
    const addProject = document.createElement("button");
    addProject.setAttribute("id", "add-project");
    addProject.innerHTML = '<img src="img/add.png" alt="">Add Project';
    const proje = document.getElementById("projects");
    proje.appendChild(addProject);
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
    if(ele.textContent.replace(/\s+/g, '') == document.getElementById("list-name").textContent.replace(/\s+/g, '')) {
        document.getElementById("home").click();
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
    let task = returnTaskById(id);
    let a = '<div class="task-left" data-id="' + id +'Left"><input type="checkbox" data-id="' + id +'Ch"><span>'+ title +'</span><div class="delete-edit-task"><img src="img/edit.png" data-id="'+id+'"><img src="img/x.png" data-id="'+id+'D"></div></div><div class="task-right" data-id="' + id +'Right"><span>'+date+'</span></div>';
    if(task.checked == true) {
        a = '<div class="task-left" data-id="' + id +'Left" style="text-decoration: line-through; opacity: 0.3"><input type="checkbox" data-id="' + id +'Ch" checked="true"><span>'+ title +'</span><div class="delete-edit-task"><img src="img/edit.png" data-id="'+id+'"><img src="img/x.png" data-id="'+id+'D"></div></div><div class="task-right" data-id="' + id +'Right" style="text-decoration: line-through; opacity: 0.3"><span>'+date+'</span></div>';
    }
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
    textareaTitle.setAttribute("placeholder", "...");
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
    if(taskFromList.dateObj != "") {
        inputDate.value = format(taskFromList.dateObj, "yyyy-MM-dd");
    }
    
    
    
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
        event.stopPropagation();
        taskFromList.name = textareaTitle.value;
        taskFromList.description = textAreaDescription.value;
        if(inputDate.valueAsDate != null) {
            taskFromList.dateObj = inputDate.valueAsDate;
            taskFromList.date = format(inputDate.valueAsDate,"dd/MM/yyyy");
        } else {
            taskFromList.dateObj = "";
            taskFromList.date = "";
        }
       
        taskFromList.project = inputProjectName.value;
        if(validateForm() == true) {
            completeEditingTask(id, taskFromList.name, taskFromList.date, ele); 
            displayTaskManager();
            
        }

        updateMyTasksLocal();
        
        
        
    });

    imgCancel.addEventListener("click", () => {
        event.stopPropagation();
        completeEditingTask(id, taskFromList.name, taskFromList.date, ele);
        displayTaskManager();
    });
    
   
}

function displayTaskManager() {
    if(document.getElementById("arrow-sort").getAttribute("data-way") == "DOWN") {
        sortDown();
    } else {
        sortUP();
    }
    removeAllTasks();
    if(document.getElementById("list-name").textContent == "Home") {
        displayTasks();
    } else if(document.getElementById("list-name").textContent == "This Week") {
        displayThisWeekTasks();
        document.getElementById("add-task").style.visibility = "hidden";
    } else if (document.getElementById("list-name").textContent == "Today") {
        displayTodayTasks();
        document.getElementById("add-task").style.visibility = "hidden";
    } else {
        displayTasksInProject(document.getElementById("list-name").textContent.replace(/\s+/g, ''));
    }
    updateMyTasksLocal();
}

function completeEditingTask(id, name, date, ele) {
    ele.innerHTML = createInnerHtmlForTask(id, name, date);
    addEventListenerToEditTaskButton(document.querySelector("[data-id='"+id+"']"), id);
    addEventListenerToEditTaskButton(document.getElementById(id), id);
    addEventListenerToRemoveTaskButton(document.querySelector("[data-id='"+id+"D']"), id);
    document.getElementById("add-task").style.visibility = "visible";
    checkBoxEvent(document.querySelector("[data-id='"+id+"Ch']"), document.querySelector("[data-id='"+id+"Left']"), document.querySelector("[data-id='"+id+"Right']"), id);
    
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
    secondContainer.appendChild(inputDate);


    if(document.getElementById("list-name").textContent == "Home") {
        const inputProjectName = document.createElement("input");
        inputProjectName.setAttribute("placeholder", "Project Name");
        inputProjectName.setAttribute("type", "text");
        inputProjectName.setAttribute("id", "projectNameValue");
        inputProjectName.setAttribute("class", "set-project-name");
        secondContainer.appendChild(inputProjectName);
    }
    

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
    let a = returnTaskById(id);
    
    const divTask = document.createElement("div");
    addEventListenerToEditTaskButton(divTask, id);
    divTask.setAttribute("class", "task");
    divTask.setAttribute("id", id);

    const divLeft = document.createElement("div");
    divLeft.setAttribute("class", "task-left");
    divLeft.setAttribute("data-id", id+"Left");

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
    imgEdit.setAttribute("title", "Details");
    addEventListenerToEditTaskButton(imgEdit, id);
    deleteEdit.appendChild(imgEdit);

    const imgDel = document.createElement("img");
    imgDel.setAttribute("src", "img/x.png");
    imgDel.setAttribute("data-id", id+"D");
    imgDel.setAttribute("title", "Delete");
    addEventListenerToRemoveTaskButton(imgDel, id);
    deleteEdit.appendChild(imgDel);
    divLeft.appendChild(deleteEdit);

    divTask.appendChild(divLeft);

    const divRight = document.createElement("div");
    divRight.setAttribute("class", "task-right")
    divRight.setAttribute("data-id", id+"Right");
    const dateText = document.createElement("span");
    dateText.textContent = date;

    divRight.appendChild(dateText);
    divTask.appendChild(divRight);
    checkBoxEvent(checkBox, divLeft, divRight, id);
    if(a.checked == true) {
        checkBox.checked = true;
        divLeft.style.setProperty("text-decoration", "line-through");
        divLeft.style.setProperty("opacity", 0.3);
        divRight.style.setProperty("text-decoration", "line-through");
        divRight.style.setProperty("opacity", 0.3);
    }

    

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
    if(document.getElementById("projectNameValue") != null) {
        document.getElementById("projectNameValue").value = "";
    }
    
}


function getDataFromTaskFormAndCreateTask() {
    const title = document.getElementById("titleOfTask").value;
    const details = document.getElementById("detailsOfTask").value;
    let date = "";
    let dateO = "";
    if(document.getElementById("datePicker").valueAsDate != null) {
        date = format(document.getElementById("datePicker").valueAsDate,"dd/MM/yyyy");
        dateO = document.getElementById("datePicker").valueAsDate;
    }
    
    
    
    let project = "";
    if(document.getElementById("list-name").textContent == "Home") {
        project = document.getElementById("projectNameValue").value;
    } else if (document.getElementById("list-name").textContent != "Home") {
        project = document.getElementById("list-name").textContent.replace(/\s+/g, '');
    }
    
    const task = Task(title, details, date, project, false, setIdForTask(), dateO);
    tasks.push(task);
    clearForm();
    removeAllTasks();
    if(document.getElementById("arrow-sort").getAttribute("data-way") == "DOWN") {
        sortDown();
    } else {
        sortUP();
    }
    if(document.getElementById("list-name").textContent == "Home") {
        displayTasks();
    } else {
        displayTasksInProject(document.getElementById("list-name").textContent.replace(/\s+/g, ''));
    }

    
   

    

}

function displayThisWeekTasks() {
    tasks.forEach((task) => {
        const children = document.querySelectorAll("div.task");
        let check = false;
       
        
        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == task.id) {
                check = true;
            }
        }
        

        
        if(check == false && differenceInCalendarDays(task.dateObj, new Date()) >= 0 && differenceInCalendarDays(task.dateObj, new Date()) <= 7) {
            createTaskVisual(task.name, task.date, task.id);
        } else {
            if(document.getElementById("divForAddTaskForm") != null) {
                document.getElementById("divForAddTaskForm").parentNode.removeChild(document.getElementById("divForAddTaskForm"));
            }
            document.getElementById("add-task").style.visibility = "visible";

        }
        
    });
}

function displayTodayTasks() {
    tasks.forEach((task) => {
        const children = document.querySelectorAll("div.task");
        let check = false;
       
        
        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == task.id) {
                check = true;
            }
        }
        
        //differenceInCalendarDays(task.dateObj, new Date());
        
        if(check == false && task.date == format(new Date(),"dd/MM/yyyy")) {
            createTaskVisual(task.name, task.date, task.id);
        } else {
            if(document.getElementById("divForAddTaskForm") != null) {
                document.getElementById("divForAddTaskForm").parentNode.removeChild(document.getElementById("divForAddTaskForm"));
            }
            document.getElementById("add-task").style.visibility = "visible";

        }
        
    });
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

    if(title != "") {
        return true;
    }

    return false;
}







export {getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, createAddProjectButton, getAddButton,
    getProjectNameInput, hideProjectInput, getCancelButton, createProjectButton, displayProjects, removeProject, getElementById,createTaskEditor,getDataFromTaskFormAndCreateTask,validateForm, removeTask,
    editTask, displayTasksInProject, removeAllTasks, displayTasks,returnTaskById, displayTodayTasks,displayThisWeekTasks, displayTaskManager,createAddProjectButtona
};