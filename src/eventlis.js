import { getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, getAddButton, getProjectNameInput, hideProjectInput, createAddProjectButton, getCancelButton, displayProjects, removeProject} from "./domMani";
import { Project, projects } from "./projectsandtasks";

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
    

function randomNumber() {
    const number = Math.floor(Math.random() * 1000);
    return number;
}

function addEventListenerToProjectButton(button) {
    button.addEventListener("click", () => {
        changeListName(button.textContent);
    });
}

function addEventListenerToDeleteProjectButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        removeProject(id);

        
    });
}


export {tabSwitchEvent, addProjectEvent, addProjectToList, cancelAddingProject, addEventListenerToProjectButton, addEventListenerToDeleteProjectButton};