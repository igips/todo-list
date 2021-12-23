import { addEventListenerToProjectButton, addProjectEvent, addEventListenerToDeleteProjectButton } from "./eventlis";
import { projects } from "./projectsandtasks";


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
            const button = createProjectButton(project.title, project.id);
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
    ele.parentNode.removeChild(ele);


    for(let i = 0; i < projects.length; i++) {
        if(projects[i].id == id) {
            projects.splice(i, 1);
            break;
        }
    }

    



}





export {getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, createAddProjectButton, getAddButton,
    getProjectNameInput, hideProjectInput, getCancelButton, createProjectButton, displayProjects, removeProject
};