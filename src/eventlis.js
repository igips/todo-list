import { getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, getAddButton, getProjectNameInput, hideProjectInput, createAddProjectButton, getCancelButton, displayProjects, removeProject, getElementById, createTaskEditor, getDataFromTaskFormAndCreateTask, validateForm, removeTask, editTask, displayTasksInProject, removeAllTasks} from "./domMani";
import { Project, projects, tasks } from "./projectsandtasks";

function tabSwitchEvent() {
    const buttons = getNavButtons();

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            changeListName(button.textContent);
        });
    });

}


function addProjectEvent() {
    const button = getAddProjectButton();

    button.addEventListener("click", () => {
        removeAddProjectButton();
        showProjectInput();
    });

}

function addProjectToList() {
    const button = getAddButton();

    button.addEventListener("click", () => {
        const input = getProjectNameInput();
        const project = Project(input.value, setIdForProject());

        projects.push(project);

        input.value = "";

        hideProjectInput();
        displayProjects();
        createAddProjectButton();
    });
}



function cancelAddingProject() {
    const button = getCancelButton();

    button.addEventListener("click", () => {
        const input = getProjectNameInput();

        input.value = "";

        hideProjectInput();
        createAddProjectButton();
    });
}

function setIdForProject() {
    let number = randomNumber();
    if(projects.length < 1) {
        return number;
    } else {
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].id == number) {
                setIdForProject();
            } else {
                return number;
            }
        }
    }

}

function setIdForTask() {
    let number = randomNumber();
    if(tasks.length < 1) {
        return number + "t";
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].id == number + "t") {
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
        changeListName(button.textContent);
        removeAllTasks();
        
        displayTasksInProject(button.textContent.replace(/\s+/g, ''));

    });
}

function addEventListenerToDeleteProjectButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        removeProject(id);

    });
}

function addEventListenerToEditTaskButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        editTask(id);
    });
}

function addEventListenerToRemoveTaskButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        removeTask(id);
    });
}

function addTaskButton() {
    const button = getElementById("add-task");


    button.addEventListener("click", () => {
        const divTaskEditor = createTaskEditor();
        document.getElementById("tasks").appendChild(divTaskEditor);
        document.getElementById("add-task").style.visibility = "hidden";
        cancelAddTaskButton();
        createTaskEvent();
        

    });
}

function cancelAddTaskButton() {
    const button = getElementById("cancelAddTaskButton"); 

    button.addEventListener("click", () => {
        event.stopPropagation();
        const div = getElementById("divForAddTaskForm");
        div.parentNode.removeChild(div);
        document.getElementById("add-task").style.visibility = "visible";
    });
}

function createTaskEvent() {
    const button = getElementById("acceptButton");

    button.addEventListener("click", () => {
        event.stopPropagation();
        if(validateForm() == true) {
            getDataFromTaskFormAndCreateTask();
        }
        
        
    });

}


export {tabSwitchEvent, addProjectEvent, addProjectToList, cancelAddingProject, addEventListenerToProjectButton, addEventListenerToDeleteProjectButton, addTaskButton, cancelAddTaskButton, randomNumber, setIdForProject, setIdForTask, addEventListenerToEditTaskButton,
addEventListenerToRemoveTaskButton};