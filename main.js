/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNavButtons": () => (/* binding */ getNavButtons),
/* harmony export */   "changeListName": () => (/* binding */ changeListName),
/* harmony export */   "getAddProjectButton": () => (/* binding */ getAddProjectButton),
/* harmony export */   "removeAddProjectButton": () => (/* binding */ removeAddProjectButton),
/* harmony export */   "showProjectInput": () => (/* binding */ showProjectInput),
/* harmony export */   "createAddProjectButton": () => (/* binding */ createAddProjectButton),
/* harmony export */   "getAddButton": () => (/* binding */ getAddButton),
/* harmony export */   "getProjectNameInput": () => (/* binding */ getProjectNameInput),
/* harmony export */   "hideProjectInput": () => (/* binding */ hideProjectInput),
/* harmony export */   "getCancelButton": () => (/* binding */ getCancelButton),
/* harmony export */   "createProjectButton": () => (/* binding */ createProjectButton),
/* harmony export */   "displayProjects": () => (/* binding */ displayProjects),
/* harmony export */   "removeProject": () => (/* binding */ removeProject),
/* harmony export */   "getElementById": () => (/* binding */ getElementById),
/* harmony export */   "createTaskEditor": () => (/* binding */ createTaskEditor),
/* harmony export */   "getDataFromTaskFormAndCreateTask": () => (/* binding */ getDataFromTaskFormAndCreateTask),
/* harmony export */   "validateForm": () => (/* binding */ validateForm),
/* harmony export */   "removeTask": () => (/* binding */ removeTask),
/* harmony export */   "editTask": () => (/* binding */ editTask),
/* harmony export */   "displayTasksInProject": () => (/* binding */ displayTasksInProject),
/* harmony export */   "removeAllTasks": () => (/* binding */ removeAllTasks)
/* harmony export */ });
/* harmony import */ var _eventlis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);




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
    (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addProjectEvent)();
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
    

    _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.forEach((project) => {
        const children = document.querySelectorAll("button.button-project");
        let check = false;
       

        for(let i = 0; i < children.length; i++) {
            let aa = children[i].getAttribute("id");
            if(aa == project.id) {
                check = true;
            }
        }

        if(check == false) {
            const button = createProjectButton(project.title, project.id);
            (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addEventListenerToProjectButton)(button);
            projectList.appendChild(button);
            (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addEventListenerToDeleteProjectButton)(getRemoveProjectButton(project.id), project.id);
            
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
    if(ele.textContent == document.getElementById("list-name").textContent) {
        changeListName("Home");
    }
    ele.parentNode.removeChild(ele);


    for(let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++) {
        if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects[i].id == id) {
            _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.splice(i, 1);
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

    for(let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.length; i++) {
        if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks[i].id == id) {
            _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.splice(i, 1);
            break;
        }
    }
}

function returnTaskById(id) {
   
        for(let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.length; i++) {
            if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks[i].id == id) {
                return _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks[i];
            }
        }
    
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
        ele.parentNode.removeChild(ele);
        displayTasks();
        

    });

    imgCancel.addEventListener("click", () => {
        ele.parentNode.removeChild(ele);
        displayTasks();
    });
    

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
    (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addEventListenerToEditTaskButton)(imgEdit, id);
    deleteEdit.appendChild(imgEdit);

    const imgDel = document.createElement("img");
    imgDel.setAttribute("src", "img/x.png");
    imgDel.setAttribute("data-id", id+"D");
    (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addEventListenerToRemoveTaskButton)(imgDel, id);
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
    

    const task = (0,_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.Task)(title, details, date, project, false, (0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.setIdForTask)());
    _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.push(task);
    clearForm();
    displayTasks();
   

    

}

function displayTasks() {
    
    
    _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.forEach((task) => {
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
    
    _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.forEach((task) => {
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









/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabSwitchEvent": () => (/* binding */ tabSwitchEvent),
/* harmony export */   "addProjectEvent": () => (/* binding */ addProjectEvent),
/* harmony export */   "addProjectToList": () => (/* binding */ addProjectToList),
/* harmony export */   "cancelAddingProject": () => (/* binding */ cancelAddingProject),
/* harmony export */   "addEventListenerToProjectButton": () => (/* binding */ addEventListenerToProjectButton),
/* harmony export */   "addEventListenerToDeleteProjectButton": () => (/* binding */ addEventListenerToDeleteProjectButton),
/* harmony export */   "addTaskButton": () => (/* binding */ addTaskButton),
/* harmony export */   "cancelAddTaskButton": () => (/* binding */ cancelAddTaskButton),
/* harmony export */   "randomNumber": () => (/* binding */ randomNumber),
/* harmony export */   "setIdForProject": () => (/* binding */ setIdForProject),
/* harmony export */   "setIdForTask": () => (/* binding */ setIdForTask),
/* harmony export */   "addEventListenerToEditTaskButton": () => (/* binding */ addEventListenerToEditTaskButton),
/* harmony export */   "addEventListenerToRemoveTaskButton": () => (/* binding */ addEventListenerToRemoveTaskButton)
/* harmony export */ });
/* harmony import */ var _domMani__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



function tabSwitchEvent() {
    const buttons = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getNavButtons)();

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.changeListName)(button.textContent);
        });
    });

}


function addProjectEvent() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getAddProjectButton)();

    button.addEventListener("click", () => {
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.removeAddProjectButton)();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.showProjectInput)();
    });

}

function addProjectToList() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getAddButton)();

    button.addEventListener("click", () => {
        const input = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getProjectNameInput)();
        const project = (0,_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.Project)(input.value, setIdForProject());

        _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.push(project);

        input.value = "";

        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.hideProjectInput)();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.createAddProjectButton)();
    });
}



function cancelAddingProject() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getCancelButton)();

    button.addEventListener("click", () => {
        const input = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getProjectNameInput)();

        input.value = "";

        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.hideProjectInput)();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.createAddProjectButton)();
    });
}

function setIdForProject() {
    let number = randomNumber();
    if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.length < 1) {
        return number;
    } else {
        for(let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++) {
            if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects[i].id == number) {
                setIdForProject();
            } else {
                return number;
            }
        }
    }

}

function setIdForTask() {
    let number = randomNumber();
    if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.length < 1) {
        return number + "t";
    } else {
        for (let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks.length; i++) {
            if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.tasks[i].id == number + "t") {
                setIdForTask();
            } else {
                return number + "t";
            }
        }
    }
}
    

function randomNumber() {
    const number = Math.floor(Math.random() * 1000);
    return number;
}

function addEventListenerToProjectButton(button) {
    button.addEventListener("click", () => {
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.changeListName)(button.textContent);
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.removeAllTasks)();
        
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.displayTasksInProject)(button.textContent.replace(/\s+/g, ''));

    });
}

function addEventListenerToDeleteProjectButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.removeProject)(id);

    });
}

function addEventListenerToEditTaskButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.editTask)(id);
    });
}

function addEventListenerToRemoveTaskButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.removeTask)(id);
    });
}

function addTaskButton() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getElementById)("add-task");


    button.addEventListener("click", () => {
        const divTaskEditor = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.createTaskEditor)();
        document.getElementById("tasks").appendChild(divTaskEditor);
        document.getElementById("add-task").style.visibility = "hidden";
        cancelAddTaskButton();
        createTaskEvent();
        

    });
}

function cancelAddTaskButton() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getElementById)("cancelAddTaskButton"); 

    button.addEventListener("click", () => {
        event.stopPropagation();
        const div = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getElementById)("divForAddTaskForm");
        div.parentNode.removeChild(div);
        document.getElementById("add-task").style.visibility = "visible";
    });
}

function createTaskEvent() {
    const button = (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getElementById)("acceptButton");

    button.addEventListener("click", () => {
        event.stopPropagation();
        if((0,_domMani__WEBPACK_IMPORTED_MODULE_0__.validateForm)() == true) {
            (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.getDataFromTaskFormAndCreateTask)();
        }
        
        
    });

}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "projects": () => (/* binding */ projects),
/* harmony export */   "tasks": () => (/* binding */ tasks),
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
const projects = [];
const tasks = [];




const Project = (name, text) => {
    const title = name;
    let id = text;
    return {title, id};
};

const Task = (n, d, da, p, f, i) => {
    let name = n;
    let description = d;
    let date = da;
    let project = p;
    let finished = f;
    let id = i;

    return {name, description, date, project, finished, id};
}







/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventlis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


(0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.tabSwitchEvent)();
(0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addProjectEvent)();
(0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addProjectToList)();
(0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.cancelAddingProject)();
(0,_eventlis__WEBPACK_IMPORTED_MODULE_0__.addTaskButton)();

})();

/******/ })()
;