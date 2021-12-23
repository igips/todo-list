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
/* harmony export */   "removeProject": () => (/* binding */ removeProject)
/* harmony export */ });
/* harmony import */ var _eventlis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);




function getNavButtons() {
    const buttons = document.querySelectorAll("button.nav-buttons");

    return buttons;
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
    ele.parentNode.removeChild(ele);


    for(let i = 0; i < _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.length; i++) {
        if(_projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects[i].id == id) {
            _projectsandtasks__WEBPACK_IMPORTED_MODULE_1__.projects.splice(i, 1);
            break;
        }
    }

    



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
/* harmony export */   "addEventListenerToDeleteProjectButton": () => (/* binding */ addEventListenerToDeleteProjectButton)
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
    

function randomNumber() {
    const number = Math.floor(Math.random() * 1000);
    return number;
}

function addEventListenerToProjectButton(button) {
    button.addEventListener("click", () => {
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.changeListName)(button.textContent);
    });
}

function addEventListenerToDeleteProjectButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        (0,_domMani__WEBPACK_IMPORTED_MODULE_0__.removeProject)(id);

        
    });
}




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
const projects = [];




const Project = (name, text) => {
    const title = name;
    const tasks = [];
    let id = text;
    return {tasks, title, id};
};







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

})();

/******/ })()
;